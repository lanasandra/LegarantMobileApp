var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());



var inputEmail = document.getElementById("inputUserName");
var inputPassword = document.getElementById("inputPassword");
var loginButton = document.getElementById("validateButton");
var contactDetailsDiv = document.getElementById('contactDetails');

loginButton.addEventListener('click', () => {
          
    inputEmail                  = inputEmail.value;
    inputPassword               = inputPassword.value;
    searchContactInSalesforce(inputEmail.value);
    //resultSection.style.display = "block";
  }
);

function searchContactInSalesforce (inputEmail) {
    var query = 'SELECT Id, LastName, FirstName, Phone, Email from Contact WHERE Email='+inputEmail;
    var url = 'https://legarant-dev-ed.my.salesforce.com/services/data/v49.0/query/?q=' + encodeURIComponent(query);

    let request = new XMLHttpRequest(); // We create an object that will allow us to make requests
    
    request.get(url, { 'auth': { 'bearer': 'bearerToken' } }); 
    request.open('GET', url); // We are just recovering data
      
    request.responseType = 'json'; // We are waiting for Json format
    
    request.send(); // We send our request
    
        
    // Once we get a response, this function will be executed
    request.onload = function() {
      
      if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
  
        let response = request.response;
  
                // Check if results are found 
                if(response.totalSize!= 0) {
                
                contactDetailsDiv.style.display = "block";
                //messageNoFoundBook.style.display ="none";
                
                fetch(url)
                .then(response => response.json())
                .then(contactDetails => detail(contactDetails.results));
           
                //If not, display a message on the result section.  
                } else {
                     prompt("It seems that you aren't a customer");
                    //messageNoFoundBook.style.display ="block";
                    //resultSectionTitle.style.display = "none";
                }
      
  
      } else {
          alert('Un problème est intervenu, merci de revenir plus tard.');
        }
      }
  }
  
  contactDetails = details => {
   
    const contLastName = document.getElementById('contLastName');
    contLastName.innerText = `Last Name: ${detail.LastName}`;
    contactDetailsDiv.append(contLastName);

    const contFirstName = document.getElementById('contFirstName');
    contFirstName.innerText = `Firt Name: ${detail.FirstName}`;
    contactDetailsDiv.append(contFirstName);
    };