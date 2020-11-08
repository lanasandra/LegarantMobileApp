const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();

app.set('port', process.env.PORT || 5432);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))

// Creation de ta connexion postgres
const { Client } = require('pg');
const { parse } = require('path');
const { REFUSED } = require('dns');
const client = new Client({
  host: 'ec2-54-217-224-85.eu-west-1.compute.amazonaws.com',
  port: 5432,
  user: 'zxfnomexlvhdqe',
  password: '1b77e7564cb41f35805ab0bb52f7b6afce58348bcb8ed794af456bf986f2bf40',
  database: 'd31rv5qg5uqjs1',
  ssl: {
    rejectUnauthorized: false
  }
})

// connexion to postgres
client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })


