/*jshint esversion: 6 */
const express = require('express');

const sleep = require('../services/sleep');

const router = express.Router();

const redis = require('redis');

const client = redis.createClient();

client.on('error', function (err) {
  console.log('error ' + err);
});

client.on('connect', sanityCheck);

function sanityCheck(){
  client.set('string key', 'hello world', function(err, reply){
    console.log(reply.toString());
  });
  client.get('string key', function(err, reply){
    console.log(reply.toString());
  });
}

router.route('/')
  .get((req, res, next) => {
    return sleep(5000)
      .then(_ => res.render('api/index', (err, html) => {
        res.send(html);
      }));
  });

module.exports = router;
