/**
 * GET     /api/apps              ->  index
 * POST    /api/apps              ->  create
 * GET     /api/apps/:id          ->  show
 * PUT     /api/apps/:id          ->  update
 * DELETE  /api/apps/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var App = require('./app.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Apps
const index = function(req, res) {
  //only show user's client
  var owner = req.user._id;
  // TODO, for admin
  App.findAsync({_owner:owner})
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single App from the DB
// Using short id (always hide _id to client)
const show = function(req, res) {
  App.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new App in the DB
const create = function(req, res) {
  var newUser=req.body;
  App.createAsync(newUser)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing App in the DB
const update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  App.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a App from the DB
const destroy = function(req, res) {
  App.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

export default {index, show, create, update, destroy}