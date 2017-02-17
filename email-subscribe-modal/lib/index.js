import {payload} from "./payload";


var pageWhitelist = [
  /^\/$/,
  /^\/home\/?$/,
  /^\/take-action\/?$/,
  /^\/open-rescue\/?$/,
  /^\/blog\/?$/,
  /^\/press\/?$/,
  /^\/theliberationist.*/,
  /^\/test-email-modal\/?$/,
];

var forgetMe = false;

var setCookie = function() {
  var days = 60;
  var date = new Date();
  date.setTime(date.getTime()+(days*24*60*60*1000));
  var expires = "expires="+date.toGMTString();

  document.cookie = "forgetMe=true; " + expires + "; path=/";
}

var readCookie = function() {
  var cookies = document.cookie.split(';')
  for(var i=0; i<cookies.length; i++) {
    if(cookies[i].includes('forgetMe')) {
      forgetMe = cookies[i].includes('true');
    }
  }
}

$(document).ready(function() {
  // Don't display on cover pages. Cover pages have an "sqs-slide" element.
  if (!$('.sqs-slide')) {
    return;
  }

  // Only display on whitelisted pages.
  let whitelisted = false;
  for (let r of pageWhitelist) {
    if (r.test(window.location.pathname)) {
      whitelisted = true;
      break;
    }
  }
  if (!whitelisted) {
    return;
  }

  readCookie();
  if(forgetMe !== true) {

    // Display the sign up modal in 60 seconds.
    setTimeout(function() {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Email Modal',
        eventAction: 'show',
      });

      $("body").append(payload);
      $('#email-signup-modal').modal();

      $('#email-signup-modal').on("hide.bs.modal", function() {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Email Modal',
          eventAction: 'hide',
        });
        setCookie();
      });

      $('.modal-submit-button').on('click', function() {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Email Modal',
          eventAction: 'signup',
        });
        setCookie();
      });
    }, 60 * 1000);
  }
});
