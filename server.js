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

// Creation of the connection to postgres
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


// Request to get contact details based on email and password
app.post('/api/getContact', (req, res) => {
  
  const query = {
    text: 'SELECT * FROM salesforce.Contact where password__c=$1 AND email=$2',
    values: [req.body.password, req.body.email]
    }
  client.query(query).then(response => {
     
    res.status(200).json(response.rows[0]);

  }).catch(err => {

    res.status(500);

  })
});

// Request to get contract details based on salesforceId
app.post('/api/getContract', (req, res) => {
  
  const query = {
    text: 'SELECT contractnumber, startdate, enddate, contractterm from salesforce.Contract where customersignedid=$1',
    values: [req.body.sfid]
    }
  client.query(query).then(response => {
     
    res.status(200).json(response.rows[0]);
    console.log(response.rows);
  }).catch(err => {
    res.status(500).json({ "message": err});
   console.log({ "message": err});
  
  })
});

// Request to get products list
app.post('/api/getProducts', (req, res) => {

  // Query to retreive the products details where pricebook is Legarant pricebook
const query = {
  text: 'SELECT productcode, name, unitprice from Salesforce.PriceBookEntry where pricebook2id=$1 order by name',
  values: ['01s09000001emDjAAI']

}
  client.query(query).then(response => {
     
    res.status(200).json(response.rows);
    console.log(response.rows);
  }).catch(err => {
    res.status(500).json({ "message": err});
   console.log({ "message": err});
  
  })
});


// Request to set the password when creating an new account
app.post('/api/register', (req, res) => {
  
  const query = {
    text: 'UPDATE salesforce.Contact SET password__c = $1 WHERE firstname = $2 AND lastname=$3 AND email=$4 RETURNING *',
    values: [req.body.password, req.body.firstName, req.body.lastName, req.body.email]
    }
  client.query(query).then(response => {
     
    res.status(200).json(response.rows[0]);
    console.log(response.rows);
  }).catch(err => {
    res.status(500).json({ "message": err});
   console.log({ "message": err});
  
  })
});

// Request to update the contact details
app.post('/api/update', (req, res) => {
    
  const query = {
    text: 'UPDATE salesforce.Contact SET firstname= $1, lastname= $2, email= $3, phone= $4, mailingstreet= $5, mailingcity= $6, mailingcountry= $7 WHERE sfid= $8',
    values: [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.mailingStreet, req.body.mailingCity, req.body.mailingCountry, req.body.sfid]
    }
  client.query(query).then(response => {
     
    res.status(200).json({ "message": " Your contact details have been updated !"})
    
  }).catch(err => {
    res.status(500).json({ "message": err});
  
  })
});
  
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
