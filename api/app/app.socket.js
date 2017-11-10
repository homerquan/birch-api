/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var AppEvents = require('./app.events');

// Model events to emit
var events = ['save', 'remove'];

exports.register = function(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('app:' + event, socket);

    AppEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
};


function createListener(event, socket) { //add room here
  return function(doc) {
    socket.emit(event, doc); //socket.to('some room')
  };
}

function removeListener(event, listener) {
  return function() {
    AppEvents.removeListener(event, listener);
  };
}
