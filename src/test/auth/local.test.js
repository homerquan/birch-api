import config from '../../config/environment';
import chai from 'chai';
import supertest from 'supertest';

let ZSchema = require('z-schema');
let validator = new ZSchema({});

let api = supertest(`http://localhost:${config.port}`); // supertest init;
let expect = chai.expect;

describe('/auth/local', function() {
  describe('get', function() {
    it('should respond with 200 Success', function(done) {
      /*eslint-disable*/
      let schema = {
        
      };

      let sampleCred = {email: "test@foo.com", password: "test"};

      /*eslint-enable*/
      api.post('/auth/local')
      .set('Accept', 'application/json')
      .send(sampleCred)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.ok;
        //expect(validator.validate(res.body.data, schema)).to.be.true;
        done();
      });
    });

    

    it('should respond with Error', function(done) {
      api.post('/auth/local')
      .set('Accept', 'application/json')
      .send({})
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

  });

});
