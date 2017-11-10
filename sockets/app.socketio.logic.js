/**
 * Overall socketio logic
 */
'use strict';
import $ from '../libs/dollar';
import _ from 'lodash';
import User from '../api/user/user.model';

function handleEntityNotFound(socket, log = 'entity does not exist') {
    return function(entity) {
        if (!entity) {
            $('log').info(log);
            socket.disconnect();
            return
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function(entity) {
        if (entity) {
            var updated = _.merge(entity, updates);
            return updated.saveAsync()
                .spread(function(updated) {
                    return updated;
                });
        }
    };
}
/**
 * Connect logic
 */
exports.connect = function(socket) {
    var query = socket.handshake.query;
    if (query.token && query.type === "console") {
        var userId = socket.decoded_token['_id'];
        User.findByIdAsync(userId).then(handleEntityNotFound(socket)).then(saveUpdates({
            status: 'online'
        }));
    }
};
/**
 * Disconnect logic
 */
exports.disconnect = function(socket) {
    var query = socket.handshake.query;
    if (query.token && query.type === "console") {
        var userId = socket.decoded_token['_id'];
        User.findByIdAsync(userId).then(handleEntityNotFound(socket)).then(saveUpdates({
            status: 'off'
        }));
    }
}