/*jshint esversion: 6 */
const express = require('express');

const sleep = require('../services/sleep');

const router = express.Router();

const redis = require('redis');

const client = redis.createClient();

router.route('/')
  .get((req, res, next) => {
    return sleep(5000)
      .then(_ => res.render('api/index', (err, html) => {
        res.send(html);
      }));
  });

module.exports = router;