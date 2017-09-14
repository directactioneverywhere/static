var HTML = `
<style>

  #fundraiser-thermometer-wrapper {
    background-image: url('https://static.dxetech.org/fundraiser/img/piggies.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 350px;
    margin: 0px auto;
    visibility: hidden;
    position: relative;
    font-family: Montserrat;
    border-radius: 10px;
  }

  .fundraiser-outer-inner-wrapper {
    background: linear-gradient(
      rgba(0,0,0,0.3),
      rgba(0,0,0,0.3));
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
  }

  .fundraiser-inner-wrapper {
    min-width: 700px;
    margin: 0 auto;
  }

  .fundraiser-goal {
    font-size: 48px;
    text-align: right;
    color: #FFF;
    padding: 10px;
    @media only screen and (max-width : 640px) {
      text-align: center;
    }
  }

  .fundraiser-glass {
    background: repeating-linear-gradient(to right, #c7c7c7, #c7c7c7 100px, #666 1px, #666 101px);
    width: 100%;
    height: 20px;
    border-radius: 10px;
    float: left;
    overflow: hidden;
  }

  #fundraiser-progress {
    float: left;
    width: 0%;
    height: 20px;
    background: #FF5D50;
    z-index: 333;
  }

  .fundraiser-goal-stat {
    width: 25%;
    padding: 10px;
    float: left;
    margin: 0;
    color: #FFF;

    @media only screen and (max-width : 640px) {
      width: 50%;
      text-align: center;
    }
    box-sizing: border-box;
  }

  .fundraiser-goal-number, .fundraiser-goal-label {
    display: block;
    box-sizing: border-box;
  }

  .fundraiser-goal-number {
    font-weight: bold;
    box-sizing: border-box;
  }

  .fundraiser-goal-overall-desc {
    font-size: 0.5em;
  }

  @media only screen and (max-width : 640px) {
    .fundraiser-inner-wrapper {
      min-width: initial;
    }

    .fundraiser-goal-stat {
      box-sizing: initial;
    }
  }

</style>

<div id="fundraiser-thermometer-wrapper">
  <div class="fundraiser-outer-inner-wrapper">
    <div class="fundraiser-inner-wrapper">
      <div id="fundraiser-goal-overall" class="fundraiser-goal"></div>
      <div class="fundraiser-glass">
        <div id="fundraiser-progress">
        </div>
      </div>
      <div class="fundraiser-goal-stat">
        <span id="fundraiser-percent" class="fundraiser-goal-number"></span>
        <span class="fundraiser-goal-label">Funded</span>
      </div>
      <div class="fundraiser-goal-stat">
        <span id="fundraiser-donors" class="fundraiser-goal-number"></span>
        <span class="fundraiser-goal-label">Donors</span>
      </div>
      <div class="fundraiser-goal-stat">
        <span id="fundraiser-time-left" class="fundraiser-goal-number"></span>
        <span class="fundraiser-goal-label">Days to Go</span>
      </div>
    </div>
  </div>
</div>
  `;

var DONORS_GOAL = 750;

var DONORS_OFFSET = 244;

var FUNDRAISER_TIME_END = '9/30/2017';

function isRecentDonor() {
  return document.cookie.indexOf('recent_donor=') !== -1;
}

export function setRecentDonor() {
  var expires = new Date();
  expires.setMinutes( expires.getMinutes() + 5 );

  document.cookie = 'recent_donor=1; ' + expires + '; path=/';
}

export function createThermometer(elementID) {
  let el = document.getElementById(elementID);
  if (!el) {
    return;
  }
  el.innerHTML = HTML;

  // First, set the number of donors that we want.
  document.getElementById('fundraiser-goal-overall').innerHTML = 'GOAL: ' + DONORS_GOAL +
    ' <span class="fundraiser-goal-overall-desc">Monthly Donors</span>';

  countDownTimer(FUNDRAISER_TIME_END, 'fundraiser-time-left');

  function refreshDonorCount() {
    getDonorCount(function(donorCount) {
      donorCount = donorCount - DONORS_OFFSET;
      if (isRecentDonor()) {
        donorCount++;
      }

      var donorsEl = document.getElementById('fundraiser-donors');
      donorsEl.innerText = donorCount;

      var percentNum = Math.floor((donorCount / DONORS_GOAL) * 1000) / 10;
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

var _donorCount = 0;

function getDonorCount(callback) {
  if (_donorCount) {
    callback(_donorCount);
    return;
  }

  var count = 0;
  function load() {
    if (this.status !== 200) {
      return;
    }

    var data = JSON.parse(this.responseText);
    var donorCount = data['result']['donorCount'];

    _donorCount += donorCount;
    count++;
    //if (count >= 5) {
    if (count >= 4) {
      callback(_donorCount);
    }
  }

  var urls = [
    "https://platform.funraise.io/api/v1/public/form/230?apiKey=472c107b-a760-4be2-b990-81c429da14d5",
    "https://platform.funraise.io/api/v1/public/form/1172?apiKey=472c107b-a760-4be2-b990-81c429da14d5",
    "https://platform.funraise.io/api/v1/public/form/1173?apiKey=472c107b-a760-4be2-b990-81c429da14d5",
    //"https://platform.funraise.io/api/v1/public/form/1174?apiKey=472c107b-a760-4be2-b990-81c429da14d5",
    "https://platform.funraise.io/api/v1/public/form/1175?apiKey=472c107b-a760-4be2-b990-81c429da14d5",
  ];

  for (var i = 0; i < urls.length; i++) {
    var u = urls[i];
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", load);
    xhr.open("GET", u);
    xhr.send();
  }
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
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    document.getElementById(id).innerText = days /*+ ' days'*/;
  }

  showRemaining();

  timer = setInterval(showRemaining, 1000);
}


