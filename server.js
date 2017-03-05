/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const { slow } = require('./routes');
const app = express();
const PORT = 8080;

const counter = 0;
const redis = require('redis');
const client = redis.createClient();

app.engine('.hbs', handlebars({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');
app.use(bodyParser.json());
// server.use(creamCache.init()); /* student implements this */
app.use('/slow', slow);

client.set('hello', 'world');

client.get('hello', (error, value)=>{
  console.log(value);
});

app.get('/', (req, res) => {
  client.incr('counter');
  client.get('counter', (error, value)=>{
    console.log(value);
    res.render('index', {
      'counter': value
    });
  });
});

app.listen(PORT, () => {
  process.stdout.write(`server listening on port ${PORT}\n`);
});
