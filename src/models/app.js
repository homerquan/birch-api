import timestamps from 'mongoose-timestamp';
import hashids from '../libs/hashids';
import $ from '../libs/dollar';
import validator from '../libs/validator';

const schema = {
    name: {
        type: String,
        min: 4,
        max: 30,
        required: true
    },
    protocol: {
        type: String,
        enum: ['http', 'https'],
        required: true
    },
    hostname: {
        type: String,
        required: true
    },
    category: Number,
    personality: Object,
    settings: Object,
    active: {
        type: Boolean,
        default: true
    },
    _owner: String
};

const Schema = new $['mg'].Schema(schema, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

Schema.plugin(timestamps);
Schema.index({_owner: 1});

Schema.virtual('token')
    .get(function() {
        return hashids.encode(parseInt(this.sid));
    });

Schema.static('findByShortIdAsync', function(sid) {
    return this.findOneAsync({
        sid: sid
    });
});

Schema.static('findByTokenAsync', function(token) {
    const sid = parseInt(hashids.decode(token));
    return this.findOneAsync({
        sid: sid
    });
});

export default $['mg'].model('App', Schema);