'use strict';

import crypto from 'crypto';
import $ from '../libs/dollar';
import util from '../libs/util';

const authTypes = ['google'];

var schema = {
    _id: {
        type: String,
        default: util.genUuid
    },
    name: String,
    firstname: String,
    lastname: String,
    email: {
        type: String,
        lowercase: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    status: {
        type: String,
        default: 'offline',
        enum: ['online', 'offline']
    },
    password: String,
    provider: String,
    salt: String,
    verified: {
        type: Boolean,
        default: false
    },
    google: {}
};

var UserSchema = new $['mg'].Schema(schema, {
    toObject: {
        virtuals: true,
        transform: function(doc, ret, options) {
          delete ret.password; //always remove sensitive info
        }
    },
    toJSON: {
        virtuals: true,
        transform: function(doc, ret, options) {
          delete ret.password;
        }
    }
});


UserSchema.static('findByEmail', function(email) {
    return this.findOneAsync({
        email: email
    });
});

UserSchema.static('setVerification', function(id) {
    return this.findByIdAndUpdateAsync(id, {
        $set: {
            verified: true
        }
    });
});

/**
 * Virtuals
 */

// Public profile information
UserSchema
    .virtual('profile')
    .get(function() {
        return {
            'name': this.name,
            'role': this.role
        };
    });

// Non-sensitive info we'll be putting in the token
UserSchema
    .virtual('token')
    .get(function() {
        return {
            '_id': this._id,
            'role': this.role
        };
    });

//TODO, one user per client, change later
UserSchema
    .virtual('_client')
    .get(function() {
        return this._id;
    });

/**
 * Validations
 */

// Validate empty email
UserSchema
    .path('email')
    .validate(function(email) {
        if (authTypes.indexOf(this.provider) !== -1) {
            return true;
        }
        return email.length;
    }, 'Email cannot be blank');

// Validate empty password
UserSchema
    .path('password')
    .validate(function(password) {
        if (authTypes.indexOf(this.provider) !== -1) {
            return true;
        }
        return password.length;
    }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
    .path('email')
    .validate(function(value) {
        var self = this;
        return this.constructor.findOneAsync({
                email: value
            })
            .then(function(user) {
                if (user) {
                    if (self.id === user.id) {
                        return true;
                    }
                    return false;
                }
                return true;
            })
            .catch(function(err) {
                throw err;
            });
    }, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
    return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
    .pre('save', function(next) {
        //preserve isNew for post
        this.wasNew = this.isNew;
        // Handle new/update passwords
        if (this.isModified('password')) {
            if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1) {
                next(new Error('Invalid password'));
            }

            // Make salt with a callback
            var _this = this;
            this.makeSalt(function(saltErr, salt) {
                if (saltErr) {
                    next(saltErr);
                }
                _this.salt = salt;
                _this.encryptPassword(_this.password, function(encryptErr, hashedPassword) {
                    if (encryptErr) {
                        next(encryptErr);
                    }
                    _this.password = hashedPassword;
                    next();
                });
            });
        } else {
            next();
        }
    });

/**
 * Post-save hook to send verify email
 */
UserSchema
    .post('save', function(doc, next) {
        if (this.wasNew) {
            //send welcome email and verify email
            // send $['var'].events.NEW_USER
        }
        next();
    });

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} password
     * @param {Function} callback
     * @return {Boolean}
     * @api public
     */
    authenticate: function(password, callback) {
        if (!callback) {
            return this.password === this.encryptPassword(password);
        }

        var _this = this;
        this.encryptPassword(password, function(err, pwdGen) {
            if (err) {
                callback(err);
            }

            if (_this.password === pwdGen) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        });
    },

    /**
     * Make salt
     *
     * @param {Number} byteSize Optional salt byte size, default to 16
     * @param {Function} callback
     * @return {String}
     * @api public
     */
    makeSalt: function(byteSize, callback) {
        var defaultByteSize = 16;

        if (typeof arguments[0] === 'function') {
            callback = arguments[0];
            byteSize = defaultByteSize;
        } else if (typeof arguments[1] === 'function') {
            callback = arguments[1];
        }

        if (!byteSize) {
            byteSize = defaultByteSize;
        }

        if (!callback) {
            return crypto.randomBytes(byteSize).toString('base64');
        }

        return crypto.randomBytes(byteSize, function(err, salt) {
            if (err) {
                callback(err);
            }
            return callback(null, salt.toString('base64'));
        });
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @param {Function} callback
     * @return {String}
     * @api public
     */
    encryptPassword: function(password, callback) {
        if (!password || !this.salt) {
            return null;
        }

        var defaultIterations = 10000;
        var defaultKeyLength = 64;
        var salt = new Buffer(this.salt, 'base64');

        if (!callback) {
            return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
                .toString('base64');
        }

        return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha512', function(err, key) {
            if (err) {
                callback(err);
            }
            return callback(null, key.toString('base64'));
        });
    }
};

export default $['mg'].model('User', UserSchema);
