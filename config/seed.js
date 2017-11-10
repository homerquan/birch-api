/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import App from '../api/app/app.model';
// import Message from '../api/message/message.model';
// import Conversation from '../api/conversation/conversation.model';
// import Knowledge from '../api/knowledge/knowledge.model';
// import Qna from '../api/qna/qna.model';
import User from '../api/user/user.model';
import Verification from '../api/verification/verification.model';

// Message.find({}).removeAsync();

// Qna.find({}).removeAsync();

// Verification.find({}).removeAsync();

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

// Conversation.find({}).removeAsync()

// Knowledge.find({}).removeAsync()
//     .then(function() {
//         Knowledge.createAsync({
//             raw: `
// ## What are appointments like?

// You will be welcomed warmly by the practice and your care team each time you visit. Your appointments may vary depending on what your needs are. For a first appointment, we ask that you allow for 1 hour to establish care and get to know your care team.
//       `,
//             app: 'dc45ebba-373b-11e6-ac61-9e71128cae77',
//             _owner: 'f34b03c0-422d-11e6-8585-d7351c23bc39'
//         })
//             .then(function() {
//                 console.log('finished populating apps');
//             });
//     });