import timestamps from 'mongoose-timestamp';
import hashids from '../../libs/hashids';
import $ from '../../libs/dollar';
import util from '../../libs/util';
import validator from '../../libs/validator';

var schema = {
    _id: {
        type: String,
        default: util.genUuid
    },
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
        // validate: {
        //     validator: validator.isURL,
        //     message: '{VALUE} is not a valid hostname'
        // },
        required: true
    },
    category: Number,
    personality: Object,
    settings: Object,
    active: {
        type: Boolean,
        default: true
    },
    _client: String,
    _owner: String
};

var AppSchema = new $['mg'].Schema(schema, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

AppSchema.plugin(timestamps);

AppSchema.virtual('token')
    .get(function() {
        return hashids.encode(parseInt(this.sid));
    });

AppSchema.static('findByShortIdAsync', function(sid) {
    return this.findOneAsync({
        sid: sid
    });
});

AppSchema.static('findByTokenAsync', function(token) {
    var sid = parseInt(hashids.decode(token));
    return this.findOneAsync({
        sid: sid
    });
});

export default $['mg'].model('App', AppSchema);