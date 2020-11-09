console.log('Client-side code running');

// Variables declaration
var emailInput          = document.getElementById('inputEmail');
var passwordInput       = document.getElementById('inputPassword');
const registerButton    = document.getElementById('registerButton');
const loginButton       = document.getElementById("loginButton");
var firstNameInput      = document.getElementById("inputFirstName");
var lastNameInput       = document.getElementById("inputLastName");
var footerLogin         = document.getElementById("footerLogin");
var footerRegister      = document.getElementById("footerRegister");
var createAccountTitle  = document.getElementById("createAccountLogin");
var loginTitle          = document.getElementById("loginTitle");
var loginLink           = document.getElementById("loginLink");
var registerLink        = document.getElementById("signInLink");
var blocRegister        = document.getElementById("blocRegister");
var blocLogin           = document.getElementById("blocLogin");
const updateButton      = document.getElementById("updateButton");
var blocProductDetails  = document.getElementById("blocProductDetails");
var welcomePage         = document.getElementById("welcomePage");
var informationsPage    = document.getElementById("informationsPage");
var contactFirstName    = document.getElementById("salesFirstName");
var contactLastName     = document.getElementById("salesLastName");
var contactEmail        = document.getElementById("salesEmail");
var contactPhone        = document.getElementById("salesPhoneNumber");
var contactStreet       = document.getElementById("salesStreet");
var contactCity         = document.getElementById("salesCity");
var contactCountry      = document.getElementById("salesCountry");
var contactSalesforceId = document.getElementById("salesSalesforceId");

/*-----------------------------------------------------------------------*/


// Display resister page Fields
registerLink.addEventListener('click', displayRegisterPage);

// Back to login page
loginLink.addEventListener('click', displayLoginPage);

// display register page
function displayRegisterPage() {
  blocRegister.style.display = "block";
  createAccountTitle.style.display= "block";
  footerLogin.style.display = "block";
  registerButton.style.display="block";
  registerButton.style.margin="auto";
  loginTitle.style.display= "none";
  footerRegister.style.display= "none";
  loginButton.style.display= "none";
}
// display login page
function displayLoginPage() {
  blocRegister.style.display = "none";
  createAccountTitle.style.display= "none";
  footerLogin.style.display = "none";
  registerButton.style.display="none";
  loginTitle.style.display= "block";
  footerRegister.style.display= "block";
  loginButton.style.display= "block";
  loginButton.style.margin="auto";
}

/*-----------------------------------------------------------------------*/

// REQUESTS TO SERVER

// Log a contact already registered
loginButton.addEventListener('click', function(e) {
  e.preventDefault();
 
  console.log('button was clicked');
  console.log(passwordInput.value);
  //console.log("'"+passwordInput.value+"'");
  //On appelle notre route créée sur le serveur
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/getContact', true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onload = function () {
      // do something to response
      //console.log("xhr.response", xhr.response);
      response = JSON.parse(xhr.response);
      console.log("response", response.firstname);

      // Call function to display contact details
        displayContactDetails(response);

      // Call function to display contract details
        displayContractDetails(response.sfid);

      // Call function to display Legarant products
        displayLegarantProduct();
      
      // display contact informations 
        displayContactInformations(response.firstName);  
  

    };
  xhr.send(JSON.stringify({
    password: passwordInput.value,
    email: emailInput.value
  }));
});

// Register a new contact
registerButton.addEventListener('click', function(e){
  e.preventDefault();
 
  console.log('button was clicked');
  

  //On appelle notre route créée sur le serveur
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/register', true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onload = function () {
      // do something to response
      //console.log("xhr.response", xhr.response);
      response = JSON.parse(xhr.response);
      console.log("response", response.sfid);

      alert("Votre mot de passe a bien été enregistré !");

      // Call function to display contact details
        displayContactDetails(response);

      // Call function to display contract details
        displayContractDetails(response.sfid);

      // Call function to display Legarant products
        displayLegarantProduct();
      
      // display contact informations 
        displayContactInformations(response.firstName);        

    };
  xhr.send(JSON.stringify({
    password: passwordInput.value,
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value
    }));
});

// Update contacts details
updateButton.addEventListener('click', function(e){
  e.preventDefault();
 
  console.log(contactFirstName.value,contactLastName.value, contactEmail.value,contactPhone.value,contactStreet.value, contactCountry.value, contactSalesforceId.value)
  console.log('button was clicked');
  

  //On appelle notre route créée sur le serveur
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/update', true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onload = function () {
      // do something to response
      //console.log("xhr.response", xhr.response);
      
        document.getElementById("updateMessage").textContent = "Your contact details have been updated !"

    };
  xhr.send(JSON.stringify({
    firstName:      contactFirstName.value,
    lastName:       contactLastName.value,
    email:          contactEmail.value,
    phone:          contactPhone.value,
    mailingStreet:  contactStreet.value,
    mailingCity:    contactCity.value,
    mailingCountry: contactCountry.value,
    salesforcId:    contactSalesforceId.value
    }));
});

/*-----------------------------------------------------------------------*/

// FUNCTIONS

function displayContactInformations(contactFirstName) {
        welcomePage.style.display="none";
        informationsPage.style.display="block";

        document.getElementById("welcomePersonalSpace").textContent = "Welcome "+contactFirstName+" to your personal space";
}

function displayContactDetails(response){

  document.getElementById("salesFirstName").value             = response.firstname
  document.getElementById("salesLastName").value              = response.lastname
  document.getElementById("salesEmail").value                 = response.email
  document.getElementById("salesPhoneNumber").value           = response.phone
  document.getElementById("salesStreet").value                = response.mailingstreet
  document.getElementById("salesCity").value                  = response.mailingcity
  document.getElementById("salesCountry").value               = response.mailingcountry
  document.getElementById("salesSalesforceId").value          = response.sfid

}

function displayContractDetails(salesforceId){

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/getContract', true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onload = function () {
      // do something to response
      //console.log("xhr.response", xhr.response);
      response = JSON.parse(xhr.response);
      console.log("response", response);
      
        // display contract informations 
        
        document.getElementById("contactContractNumber").innerHTML    = "Contract Number: "+response.contractnumber;
        document.getElementById("contactContractStartDate").innerHTML = "Contract Start Date: "+response.startdate;
        document.getElementById("contactContractEndDate").innerHTML   = "Contract End Date: "+response.enddate;
        document.getElementById("contactContractTerm").innerHTML      = "Contract Term (months): "+response.contractterm;
       
  

    };
  xhr.send(JSON.stringify({
    sfid: salesforceId}));
};

 
function displayLegarantProduct() {

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/getProducts', true);
  xhr.onload = function () {
      // do something to response
      //console.log("xhr.response", xhr.response);
      response = JSON.parse(xhr.response);
      console.log("response", response);
      console.log(response[0]);
        
      // display product informations 

      for(let i = 0; i < 10; i++) {
        
        displayProducts(response[i])

      }
  }   
  xhr.send();
}

function displayProducts(response){

  var productCode                                 = response.productcode;
  var productName                                 = response.name;
  var productPrice                                = response.unitprice;

  var productItem                                 = document.createElement("div"); 
      productItem.className                       = "productItem";
      blocProductDetails.appendChild(productItem)

  var productCodeItem                             = document.createElement("p");
      productCodeItem.className                   = "productCodeItem";
      productItem.appendChild(productCodeItem);

  var productNameItem                             = document.createElement("p");
      productNameItem.className                   = "productNameItem";
      productItem.appendChild(productNameItem);

  var productPriceItem                            = document.createElement("p");
      productPriceItem.className                  = "productPriceItem";
      productItem.appendChild(productPriceItem);


      productCodeItem.innerHTML                 = "Product Code: "+productCode;
      productNameItem.innerHTML                 = "Product Name: "+productName;
      productPriceItem.innerHTML                = "Unit Price: "+euro.format(productPrice);  

}


// Formating the product price
const euro = new Intl.NumberFormat('en-EN', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
});
