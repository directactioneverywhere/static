var fundraiser =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setRecentDonor"] = setRecentDonor;
/* harmony export (immutable) */ __webpack_exports__["createThermometer"] = createThermometer;
var HTML = '\n<style>\n\n  #fundraiser-thermometer-wrapper {\n    background-image: url(\'https://static.dxetech.org/fundraiser/img/piggies.jpg\');\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center;\n    width: 100%;\n    height: 350px;\n    margin: 0px auto;\n    visibility: hidden;\n    position: relative;\n    font-family: Montserrat;\n    border-radius: 10px;\n  }\n\n  .fundraiser-outer-inner-wrapper {\n    background: linear-gradient(\n      rgba(0,0,0,0.3),\n      rgba(0,0,0,0.3));\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    border-radius: 10px;\n  }\n\n  .fundraiser-inner-wrapper {\n    min-width: 700px;\n    margin: 0 auto;\n  }\n\n  .fundraiser-goal {\n    font-size: 48px;\n    text-align: right;\n    color: #FFF;\n    padding: 10px;\n    @media only screen and (max-width : 640px) {\n      text-align: center;\n    }\n  }\n\n  .fundraiser-glass {\n    background: repeating-linear-gradient(to right, #c7c7c7, #c7c7c7 100px, #666 1px, #666 101px);\n    width: 100%;\n    height: 20px;\n    border-radius: 10px;\n    float: left;\n    overflow: hidden;\n  }\n\n  #fundraiser-progress {\n    float: left;\n    width: 0%;\n    height: 20px;\n    background: #FF5D50;\n    z-index: 333;\n  }\n\n  .fundraiser-goal-stat {\n    width: 25%;\n    padding: 10px;\n    float: left;\n    margin: 0;\n    color: #FFF;\n\n    @media only screen and (max-width : 640px) {\n      width: 50%;\n      text-align: center;\n    }\n    box-sizing: border-box;\n  }\n\n  .fundraiser-goal-number, .fundraiser-goal-label {\n    display: block;\n    box-sizing: border-box;\n  }\n\n  .fundraiser-goal-number {\n    font-weight: bold;\n    box-sizing: border-box;\n  }\n\n  .fundraiser-goal-overall-desc {\n    font-size: 0.5em;\n  }\n\n  @media only screen and (max-width : 640px) {\n    .fundraiser-inner-wrapper {\n      min-width: initial;\n    }\n\n    .fundraiser-goal-stat {\n      box-sizing: initial;\n    }\n  }\n\n</style>\n\n<div id="fundraiser-thermometer-wrapper">\n  <div class="fundraiser-outer-inner-wrapper">\n    <div class="fundraiser-inner-wrapper">\n      <div id="fundraiser-goal-overall" class="fundraiser-goal"></div>\n      <div class="fundraiser-glass">\n        <div id="fundraiser-progress">\n        </div>\n      </div>\n      <div class="fundraiser-goal-stat">\n        <span id="fundraiser-percent" class="fundraiser-goal-number"></span>\n        <span class="fundraiser-goal-label">Funded</span>\n      </div>\n      <div class="fundraiser-goal-stat">\n        <span id="fundraiser-donors" class="fundraiser-goal-number"></span>\n        <span class="fundraiser-goal-label">Donors</span>\n      </div>\n      <div class="fundraiser-goal-stat">\n        <span id="fundraiser-time-left" class="fundraiser-goal-number"></span>\n        <span class="fundraiser-goal-label">Days to Go</span>\n      </div>\n    </div>\n  </div>\n</div>\n  ';

var DONORS_GOAL = 750;

var DONORS_OFFSET = 244;

var FUNDRAISER_TIME_END = '9/30/2017';

function isRecentDonor() {
  return document.cookie.indexOf('recent_donor=') !== -1;
}

function setRecentDonor() {
  var expires = new Date();
  expires.setMinutes(expires.getMinutes() + 5);

  document.cookie = 'recent_donor=1; ' + expires + '; path=/';
}

function createThermometer(elementID) {
  var el = document.getElementById(elementID);
  if (!el) {
    return;
  }
  el.innerHTML = HTML;

  // First, set the number of donors that we want.
  document.getElementById('fundraiser-goal-overall').innerHTML = 'GOAL: ' + DONORS_GOAL + ' <span class="fundraiser-goal-overall-desc">Monthly Donors</span>';

  countDownTimer(FUNDRAISER_TIME_END, 'fundraiser-time-left');

  function refreshDonorCount() {
    getDonorCount(function (donorCount) {
      donorCount = donorCount - DONORS_OFFSET;
      if (isRecentDonor()) {
        donorCount++;
      }

      var donorsEl = document.getElementById('fundraiser-donors');
      donorsEl.innerText = donorCount;

      var percentNum = Math.floor(donorCount / DONORS_GOAL * 1000) / 10;
      var percent = percentNum + "%";
      var percentEl = document.getElementById('fundraiser-percent');
      percentEl.innerText = percent;

      var progressEl = document.getElementById('fundraiser-progress');
      progressEl.style.width = percent;

      var wrapper = document.getElementById('fundraiser-thermometer-wrapper');
      wrapper.style.visibility = 'visible';
    });
  }
  refreshDonorCount();
  setInterval(refreshDonorCount, 1000);
}

function getDonorCount(callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function () {
    if (xhr.status !== 200) {
      return;
    }

    var data = JSON.parse(xhr.responseText);
    var donorCount = data['result']['donorCount'];

    callback(donorCount);
  });
  xhr.open("GET", "https://platform.funraise.io/api/v1/public/form/230?apiKey=472c107b-a760-4be2-b990-81c429da14d5");
  xhr.send();
}

function countDownTimer(dt, id) {
  var end = new Date(dt);

  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;
  var timer;

  function showRemaining() {
    var now = new Date();
    var distance = end - now;
    if (distance < 0) {
      if (timer) {
        clearInterval(timer);
        document.getElementById(id).innerText = '0';
      }
      return;
    }
    var days = Math.floor(distance / _day);
    var hours = Math.floor(distance % _day / _hour);
    var minutes = Math.floor(distance % _hour / _minute);
    var seconds = Math.floor(distance % _minute / _second);

    document.getElementById(id).innerText = days /*+ ' days'*/;
  }

  showRemaining();

  timer = setInterval(showRemaining, 1000);
}

/***/ })
/******/ ]);