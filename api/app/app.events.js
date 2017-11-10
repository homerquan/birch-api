/**
 * App model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var App = require('./app.model');
var AppEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AppEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  App.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AppEvents.emit(event + ':' + doc._id, doc);
    AppEvents.emit(event, doc);
  }
}

module.exports = AppEvents;
