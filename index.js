require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('node:dns');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const urlparser = require('url');

const client = new MongoClient(process.env.DB_URL);
const db = client.db("urlshortener");
const urls = db.collection('urls');

// Basic Configuration
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: Number
});

UrlObject = mongoose.model('UrlObject', urlSchema);

const createAndSaveUrlObject = async (done) => {
  const testUrlObj = {
    original_url: 'https://www.google.com',
    short_url: 1
  }

  let document = new UrlObject(testUrlObj);

  // document.save(function(err, data) {
  //   if (err) return console.error(err);
  //   done(null, data);
  // });

  try {
    const data = document.save();
    done(null, data);
  } catch (err) {
    console.error(err);
  }
}

// Middleware to parse JSON and urlencoded form data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
  console.log(req.body);
  const dnslookup = dns.lookup(urlparser.parse(url)).hostname,
    async (err, address) => {
      if (!address) {
        res.json({ error: "Invalid URL"});
      } else {
        // valid url
        const urlCount = await urls.countDocuments({});
      }
    };
  res.json({})
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
