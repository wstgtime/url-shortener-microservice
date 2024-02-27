require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('node:dns');

// Basic Configuration
const port = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  const host = url.split('//')[1]; // http(s) prefix must be removed
  dns.lookup(host, function(err, address, family) {
    if (err) {
      console.log(err);
      res.json({ error: 'invalid url' });
    }
    else {
      res.json({ original_url: host });
    }
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
