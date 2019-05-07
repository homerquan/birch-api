/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

"use strict";
import App from "../api/app/app.model";
import User from "../api/user/user.model";
import Verification from "../api/verification/verification.model";

const colors = require("colors");

console.log("start to seeding DB".green);

User.find({})
    .removeAsync()
    .then(function() {
        User.createAsync(
            {
                _id: "ddcd39c9-dcbc-4a26-bcf7-525d77c12d54",
                provider: "local",
                name: "homer",
                email: "lujooo@gmail.com",
                password: "demo"
            },{
                _id: "ddcd39c9-dcbc-4a26-bcf7-525d77c12d55",
                provider: "local",
                name: "demo",
                email: "demo@gmail.com",
                password: "demo"
            },{
                _id: "ddcd39c9-dcbc-4a26-bcf7-525d77c12d56",
                provider: "local",
                name: "jim",
                email: "jim@convospot.io",
                password: "demo"
            }
        )
            .then(function() {
                console.log("finished populating users");
            })
            .catch(function(e) {
                console.log(e.red); // "oh, no!"
            });
    });

App.find({})
    .removeAsync()
    .then(function() {
        App.createAsync(
            {
                name: "demo app",
                protocol: "http",
                hostname: "www.convospot.io",
                sid: "906384612820742",
                _id: "dc45ebba-373b-11e6-ac61-9e71128cae77",
                _owner: "f34b03c0-422d-11e6-8585-d7351c23bc39"
            },
            {
                name: "homer app",
                protocol: "http",
                hostname: "www.convospot.io",
                sid: "906384612820743",
                _id: "dc45ebba-373b-11e6-ac61-9e71128cae78",
                _owner: "f34b03c0-422d-11e6-8585-d7351c23bc39"
            }
        )
            .then(function() {
                console.log("finished populating apps");
            })
            .catch(function(e) {
                console.log(e.red); // "oh, no!"
            });
    });
