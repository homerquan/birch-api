'use strict';
var redis = require("redis");
var client = redis.createClient();

const get = function(req, res, next) {
    client.hget("demo","knowledge",function(err,val){
      res.json({text:val});
    });
    
};

const update = function(req, res, next) {
    var val = req.body.text
    console.log("TEST"+req.body.text)
    client.hset("demo","knowledge",val);
    res.send('ok');
};

export default {get,update}