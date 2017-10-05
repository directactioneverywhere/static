(function () {
'use strict';

var payload = "\n<div id=\"payload\">\n  <div class=\"modal fade\" id=\"email-signup-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"email-signup-modal-label\" aria-hidden=\"true\">\n    <div class=\"vertical-alignment-helper\">\n      <div class=\"modal-dialog vertical-align-center\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span id=\"close-button\" aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n  <h4 class=\"modal-title\" id=\"myModalLabel\">Sign up to learn about our<br>next open rescue!</h4>\n          </div>\n          <div class=\"modal-body\">\n            <div class=\"form-wrapper\">\n              <div class=\"form-inner-wrapper\">\n                <form autocomplete=\"on\" action=\"\" method=\"POST\" onsubmit=\"return (function(form) { Y.use\n                                                                          ('squarespace-form-submit', 'node',\n                                                                          function (Y) { (new Y.Squarespace.FormSubmit({ formNode: Y.Node(form) })).submit('5850c5e044024318a770abf8', '', '') }); return false;})(this)\">\n                  <div class=\"field-list clear\">\n                    <fieldset id=\"name-yui_3_17_2_1_1481686238867_115413\" class=\"form-item fields name required\">\n                      <div class=\"title\">Name <span class=\"required\">*</span></div>\n                      <div class=\"field first-name\">\n                        <label class=\"caption\"><input class=\"field-element field-control\" name=\"fname\" x-autocompletetype=\"given-name\" type=\"text\" spellcheck=\"false\" maxlength=\"30\" data-title=\"First\"><span id=\"first-name-caption\">First Name</span></label>\n                      </div>\n                      <div class=\"field last-name\">\n                        <label class=\"caption\"><input class=\"field-element field-control\" name=\"lname\" x-autocompletetype=\"surname\" type=\"text\" spellcheck=\"false\" maxlength=\"30\" data-title=\"Last\"><span id=\"last-name-caption\">Last Name</span></label>\n                      </div>\n                    </fieldset>\n                    <div id=\"email-yui_3_17_2_1_1481686238867_115752\" class=\"form-item field email required\">\n                      <label class=\"title\" for=\"email-yui_3_17_2_1_1481686238867_115752-field\">Email Address <span class=\"required\">*</span></label>\n                      <input class=\"field-element\" name=\"email\" x-autocompletetype=\"email\" type=\"text\" spellcheck=\"false\" id=\"email-yui_3_17_2_1_1481686238867_115752-field\">\n                    </div><br>\n                    <div id=\"select-yui_3_17_2_1_1481686238867_118639\" class=\"form-item field select\">\n                      <label class=\"title\" for=\"select-yui_3_17_2_1_1481686238867_118639-field\">Add to a local mailing list?</label>\n                      <select name=\"select-yui_3_17_2_1_1481686238867_118639-field\">\n                        <option value=\"None\">None</option>\n                        <option value=\"Bakersfield\">Bakersfield</option>\n                        <option value=\"Berlin\">Berlin</option>\n                        <option value=\"Bloomington\">Bloomington</option>\n                        <option value=\"Chicago\">Chicago</option>\n                        <option value=\"Cleveland\">Cleveland</option>\n                        <option value=\"Colorado\">Colorado</option>\n                        <option value=\"Copenhagen\">Copenhagen</option>\n                        <option value=\"Connecticut\">Connecticut</option>\n                        <option value=\"Delhi\">Delhi</option>\n                        <option value=\"Fraser Valley\">Fraser Valley</option>\n                        <option value=\"Grand Rapids\">Grand Rapids</option>\n                        <option value=\"Halifax\">Halifax</option>\n                        <option value=\"Hamburg\">Hamburg</option>\n                        <option value=\"Indiana\">Indiana</option>\n                        <option value=\"Inland Empire\">Inland Empire</option>\n                        <option value=\"Los Angeles\">Los Angeles</option>\n                        <option value=\"Maryland/DC/Virginia\">Maryland/DC/Virginia</option>\n                        <option value=\"Massachusetts\">Massachusetts</option>\n                        <option value=\"New Orleans\">New Orleans</option>\n                        <option value=\"New York City\">New York City</option>\n                        <option value=\"Orange County\">Orange County</option>\n                        <option value=\"Philadelphia\">Philadelphia</option>\n                        <option value=\"Portland\">Portland</option>\n                        <option value=\"Riverside\">Riverside</option>\n                        <option value=\"Salt Lake City\">Salt Lake City</option>\n                        <option value=\"San Diego\">San Diego</option>\n                        <option value=\"San Francisco Bay Area\">San Francisco Bay Area</option>\n                        <option value=\"San Luis Obispo\">San Luis Obispo</option>\n                        <option value=\"Tallahassee\">Tallahassee</option>\n                        <option value=\"Tel Aviv\">Tel Aviv</option>\n                        <option value=\"Toronto\">Toronto</option>\n                        <option value=\"Vancouver\">Vancouver</option>\n                      </select>\n                    </div>\n                  </div>\n                  <div class=\"form-button-wrapper form-button-wrapper--align-center\">\n                    <input class=\"modal-submit-button button sqs-system-button sqs-editable-button\" id=\"submit-button\" type=\"submit\" value=\"Submit\">\n                  </div><br>\n                  <div class=\"hidden\" id=\"alert-box\"></div>\n                  <div class=\"hidden form-submission-text\"><p>Thank you for signing up! You'll now be notified of DxE news and global and local events!</p></div>\n                  <div class=\"hidden form-submission-html\" data-submission-html=\"<script>var e = $('#select-yui_3_17_2_1_1481686238867_118639 select'); var strChapter = e[0].options[e[0].selectedIndex].value; if (strChapter == 'San Francisco Bay Area') {window.location.assign('/subscriber-confirmed?action=email-modal?list=sfbay');} else {window.location.assign('/subscriber-confirmed?action=email-modal');}</script>\"></div>\n                </form>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";

var pageWhitelist = [/^\/$/, /^\/home\/?$/, /^\/take-action\/?$/, /^\/open-rescue\/?$/, /^\/blog\/?$/, /^\/press\/?$/, /^\/theliberationist.*/, /^\/test-email-modal\/?$/];

var forgetMe = false;

var setCookie = function setCookie() {
  var days = 60;
  var date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  var expires = "expires=" + date.toGMTString();

  document.cookie = "forgetMe=true; " + expires + "; path=/";
};

var readCookie = function readCookie() {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    if (cookies[i].includes('forgetMe')) {
      forgetMe = cookies[i].includes('true');
    }
  }
};

$(document).ready(function () {
  // Don't display on cover pages. Cover pages have an "sqs-slide" element.
  if (!$('.sqs-slide')) {
    return;
  }

  // Only display on whitelisted pages.
  var whitelisted = false;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = pageWhitelist[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var r = _step.value;

      if (r.test(window.location.pathname)) {
        whitelisted = true;
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (!whitelisted) {
    return;
  }

  readCookie();
  if (forgetMe !== true) {

    // Display the sign up modal in 60 seconds.
    setTimeout(function () {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Email Modal',
        eventAction: 'show'
      });

      $("body").append(payload);
      $('#email-signup-modal').modal();

      $('#email-signup-modal').on("hide.bs.modal", function () {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Email Modal',
          eventAction: 'hide'
        });
        setCookie();
      });

      $('.modal-submit-button').on('click', function () {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Email Modal',
          eventAction: 'signup'
        });
        setCookie();
      });
    }, 60 * 1000);
  }
});

}());
