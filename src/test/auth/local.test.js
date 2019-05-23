import config from '../../config/environment';
import chai from 'chai';
import supertest from 'supertest';

let ZSchema = require('z-schema');
let validator = new ZSchema({});

let api = supertest(`http://localhost:${config.port}`); // supertest init;
let expect = chai.expect;

// adding graphql test here
