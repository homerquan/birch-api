import timestamps from 'mongoose-timestamp';
import verGen from '../libs/verification.generator';
import $ from '../libs/dollar';
import util from '../libs/util';

const User = require('./user');

const schema = {
    id: {
        type: String,
        default: util.genUuid,
    },
    token: {
        type: String,
        index: true,
        default: verGen($.config.verificationTokenSize),
    },
    type: {
        type: String,
        index: true,
    },
    email: {
        type: String,
    },
    expirationDate: {
        type: Date,
        expires: $.config.verificationExpire,
    },
    uid: String,
    used: {
        type: Boolean,
        default: false,
        index: true,
    },
};

const Schema = new $.mg.Schema(schema);
Schema.plugin(timestamps);
const Model = $['mg'].model('verification', Schema);

Schema.statics.verifyUser = function(token, cb) {
    this.findOne({
            token,
        },
        function(err, doc) {
            if (!err) User.setVerification(doc.uid, cb);
            else cb(err, null);
        }
    );
};

// send different notifications by verification type
Schema.post('save', function(doc) {
    const options = {};
    if (doc && doc.type) {
        if (doc.type === 'email') {
            // send email
        }
    }
});

export default Model;