import chai from 'chai';
import supertest from 'supertest';
import config from '../../config/environment';

const validator = new ZSchema({});

const api = supertest(`http://localhost:${config.port}`); // supertest init;
const { expect } = chai;

// adding graphql test here
