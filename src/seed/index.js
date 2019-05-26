/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

import $ from '../libs/dollar';
import App from '../models/app';
import User from '../models/user';
import Session from '../models/session';
import Verification from '../models/verification';

$.log.info('start to seeding DB');

const { ObjectId } = $.mg.Types;
const changeId = list => {
  return list.map(item => {
    const newItem = item;
    if (item._id) {
      newItem._id = new ObjectId(item._id);
    }
    return newItem;
  });
};

const populate = (model, file) => {
  model
    .find({})
    .removeAsync()
    .then(function() {
      model
        .createAsync(...changeId(require(file)))
        .then(function() {
          $.log.info(`finished populating ${file}`);
        })
        .catch(function(e) {
          $.log.error(e);
        });
    });
};

populate(User, './data/users.json');
populate(App, './data/apps.json');
populate(Session, './data/sessions.json');
