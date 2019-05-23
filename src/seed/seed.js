/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

import $ from '../libs/dollar';
import App from '../models/app';
import User from '../models/user';
import Verification from '../models/verification';

$.log.info('start to seeding DB');

const { ObjectId } = $.mg.Types;
const changeId = list => {
  return list.map(item => {
    const newItem = item;
    newItem._id = new ObjectId(item._id);
    return newItem;
  });
};

const populate = (model, file) => {
  model.find({})
    .removeAsync()
    .then(function() {
      model.createAsync(...changeId(require(file)))
        .then(function() {
          $.log.info(`finished populating ${file}`);
        })
        .catch(function(e) {
          $.log.error(e);
        });
    });
};

populate(User, './users.json');
populate(App, './apps.json');
