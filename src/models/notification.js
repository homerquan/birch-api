/*
* @Author: homer
* @Date:   2019-05-09 12:06:54
* @Last Modified by:   homer
* @Last Modified time: 2019-05-09 22:06:41
*/

import timestamps from 'mongoose-timestamp';
import verGen from '../libs/verification.generator';
import $ from '../libs/dollar';
import util from '../libs/util';

const schema = {
    text: {
        type: String,
        index: true,
    },
    action: {
        type: String,
        index: true,
    },
    archived: {
        type: Boolean,
        default: false,
        index: true,
    },
    _client: String,
    _owner: String
};

const Schema = new $['mg'].Schema(schema);
Schema.plugin(timestamps);
Schema.index({_owner: 1});

const Model = $['mg'].model('notification', Schema);

export default Model;