//All images taken from PEXELS.COM - free stock images
"use strict";

window.onload = function() {


//Navigation bar buttons
var about = document.querySelector("#navAbout");
var services = document.querySelector("#navServices");
var contact = document.querySelector("#navContact");

about.onclick = function() {
  document.querySelector("#aboutRow").scrollIntoView();
  window.scrollBy(0, -50);
}

services.onclick = function() {
  document.querySelector("#servicesRow").scrollIntoView();
  window.scrollBy(0, -50);
}


contact.onclick = function() {
  document.querySelector("#phoneContact").scrollIntoView();
  window.scrollBy(0, -50);
}

//Learn more jumbotron button jump to about div
var bannerBtn = document.querySelector("#bannerBtn");
bannerBtn.onclick = function() {
  document.querySelector("#aboutRow").scrollIntoView();
  window.scrollBy(0, -50);
}

//Clear input on click in the form
var formName = document.querySelector("#formName");
formName.onclick = function() {
  formName.value = "";
}

var formEmail = document.querySelector("#formEmail");
formEmail.onclick = function() {
  formEmail.value = "";
}

var formMessage = document.querySelector("#formMessage");
formMessage.onclick = function() {
  formMessage.value = "";
}

}