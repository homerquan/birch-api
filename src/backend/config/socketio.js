/**
 * Socket.io configuration
 */

'use strict';

import config from './environment';
import Logger from '../libs/logger';
import jwt from 'jsonwebtoken';
import socketioJwt from 'socketio-jwt';

// When the user disconnects.. perform this
const onDisconnect = (socket) => {
    require('../sockets/app.socketio.logic').disconnect(socket);
}

// When the user connects.. perform this
const onConnect = (socket) => {
    // Insert sockets below
    require('../sockets/app.socketio.logic').connect(socket);    
}

const init = (socketio) => {
    // socket.io (v1.x.x) is powered by debug.
    // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
    //
    // ex: DEBUG: "http*,socket.io:socket"

    socketio.on('connection', socketioJwt.authorize({
        secret: config.secrets.session,
        timeout: 60000 // 60 seconds to send the authentication message
    })).on('authenticated', function(socket) {
        var room = socket.decoded_token['_id'];  //Each user has its own room
        socket.address = socket.request.connection.remoteAddress +
            ':' + socket.request.connection.remotePort;
        socket.connectedAt = new Date();
        socket.join(room);
        socket.log = function(...data) {
            Logger.info(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
        };
        // Call onDisconnect.
        socket.on('disconnect', function() {
            socket.leave(room);
            onDisconnect(socket);
            socket.log('DISCONNECTED');
        });
        // Call onConnect.
        onConnect(socket);
        socket.log('CONNECTED');
    });
};

export {init}