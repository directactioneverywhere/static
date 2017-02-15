import {payload} from "./payload";

var forgetMe = false;

var setCookie = function() {
  forgetMe = $('#forget-me-checkbox').prop('checked');
  document.cookie = "forgetMe=" + forgetMe;
}

var readCookie = function() {
  var cookies = document.cookie.split(';')
  for(var i=0; i<cookies.length; i++) {
    if(cookies[i].includes('forgetMe')) {
      forgetMe = cookies[i].includes('true');
    }
  }
  if(forgetMe != true) {
    $('#email-signup-modal').modal().delay(500);
  }
}

$(document).ready(function() {
  $("body").append(payload);
  readCookie();

  $('#forget-me-checkbox').bind('change', function() {
    setCookie();
  });

  var alertText = '<div class="alert alert-success" role="alert">Thank you for signing up!</div>'
  $('#alert-box').html(alertText);
});
