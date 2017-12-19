/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import App from '../api/app/app.model';
import User from '../api/user/user.model';
import Verification from '../api/verification/verification.model';

User.find({}).removeAsync()
    .then(function() {
        User.createAsync({
            provider: 'local',
            name: 'Test User',
            email: 'test@foo.com',
            password: 'test'
        }, {
            _id: 'f34b03c0-422d-11e6-8585-d7351c23bc39',
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'lujooo@gmail.com',
            password: 'admin'
        })
            .then(function() {
                console.log('finished populating users');
            });
    });

App.find({}).removeAsync()
    .then(function() {
        App.createAsync({
            name: 'demo_app',
            protocol: 'http',
            hostname: 'www.convospot.io',
            sid: '906384612820742',
            category: 99,
            personality: {
                responsive: 3,
                prudential: 3
            },
            settings: {
                summaryEmail: true
            },
            _id: 'dc45ebba-373b-11e6-ac61-9e71128cae77',
            _owner: 'f34b03c0-422d-11e6-8585-d7351c23bc39'
        },{
            name: 'homer_app',
            protocol: 'http',
            hostname: 'www.convospot.io',
            sid: '906384612820743',
            category: 99,
            personality: {
                responsive: 3,
                prudential: 3
            },
            settings: {
                summaryEmail: true
            },
            _id: 'dc45ebba-373b-11e6-ac61-9e71128cae78',
            _owner: 'f34b03c0-422d-11e6-8585-d7351c23bc39'
        })
            .then(function() {
                console.log('finished populating apps');
            });
    });