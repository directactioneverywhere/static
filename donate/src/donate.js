import {
  showDonateUpgradeModal,
  donateUpgradeModalState,
  modalEnabled,
} from './modal';

var ga = window.ga || function() {};
var fbq = window.fbq || function() {};

var AFFILIATION;

function initAffiliation() {
  var url = window.location.href;
  var m = url.match(/[?&]campaign=([^&]*)/);
  if (m) {
    AFFILIATION = m[1];
  } else {
    AFFILIATION = 'Donate Page';
  }
}
initAffiliation();

ga("require", "ec");

function getTransactionID() {
  return Math.floor(Math.random() * 10000000000).toString();
}

var funraiseId = {
  'monthly': '472c107b230',
  'once': '472c107b229',
};

function logDonateImpression() {
  ga('ec:addProduct', {
    id: 'DO',
    name: "Donate Once",
  });
  ga('ec:addProduct', {
    id: 'DM',
    name: "Donate Monthly",
  });
  ga('ec:addImpression', {
    id: 'DM',
    name: "Donate Monthly",
    list: 'Donate Page',
    position: 1,
  });
  ga('ec:addImpression', {
    id: 'DO',
    name: "Donate Once",
    list: 'Donate Page',
    position: 2,
  });
  ga('ec:setAction', 'detail', {affiliation: AFFILIATION});
  ga('send', 'event', {
    eventCategory: 'Donate',
    eventAction: 'impression',
    eventLabel: 'Donate Page',
  });
}
logDonateImpression();

var hasAttachedMonthly = false;

// We want to reliably know when the "your information" button is
// clicked so that we can show the "upgrade to monthly donation"
// modal. 90% of the time, this will succeed. We can't do this more
// generally because we don't know if the button click was successful
// most of the time.
var initialButtonClick = false;

function monthlyHandler() {
  initialButtonClick = true;
  // Send checkout and add to cart events.
  ga('ec:addProduct', {
    id: 'DM',
    name: "Donate Monthly",
  });
  ga('ec:setAction', 'checkout', {step: 1, affiliation: AFFILIATION});
  ga('send', 'event', {
    eventCategory: 'Donate',
    eventAction: 'click',
    eventLabel: 'Monthly',
  });

  ga('ec:addProduct', {
    id: 'DM',
    name: "Donate Monthly",
  });
  ga('ec:setAction', 'add', {affiliation: AFFILIATION});
  ga('send', 'event', {
    eventCategory: 'Donate',
    eventAction: 'click',
    eventLabel: 'Monthly',
  });

  if (!hasAttachedMonthly) {
    $('.submit-button-' + funraiseId['monthly']).on('click', monthlySubmitHandler);
    hasAttachedMonthly = true;
  }
}
$('.dxe-donate-monthly').on('click', monthlyHandler);

function getDonationAmount(type) {
  var id = funraiseId[type];
  if (!id) {
    throw new Error('invalid donation type: ' + type);
  }
  var idName = '#headerAmount-' + id;
  var dollars = parseInt($(idName + ' .money__dollars').text());
  var cents = parseInt($(idName + ' .money__cents').text());
  if (isNaN(dollars) || isNaN(cents)) {
    throw new Error('invalid dollar amount');
  }
  return dollars + '.' + cents;
}

var handlerTimeout = 250;

var hasSubmittedMonthlyDonation = false;
function monthlySubmitHandler(e) {
  // Sometimes this fires before the button text changes, so wrap it
  // in a setTimeout so that it sees the correct button label.
  setTimeout(() => {
    var $t = $(e.target);
    var text = $t.text();
    if (text.indexOf('Payment Info') !== -1) {
      hasSubmittedMonthlyDonation = false;
      ga('ec:addProduct', {
        id: 'DM',
        name: "Donate Monthly",
      });
      ga('ec:setAction', 'checkout', {step: 2, affiliation: AFFILIATION});
    } else if (text.indexOf('Submit Donation') !== -1) {
      if (!hasSubmittedMonthlyDonation) {
        hasSubmittedMonthlyDonation = true;
        ga('ec:addProduct', {
          id: 'DM',
          name: "Donate Monthly",
        });
        ga('ec:setAction', 'checkout', {step: 3, affiliation: AFFILIATION});
      } else {
        hasSubmittedMonthlyDonation = false;
        var amount = getDonationAmount('monthly');
        ga('ec:addProduct', {
          id: 'DM',
          name: "Donate Monthly",
          price: amount,
          quantity: 1,
        });
        ga('ec:setAction', 'purchase', {
          id: getTransactionID(),
          affiliation: AFFILIATION,
          revenue: amount,
        });
        if (window.fundraiser && window.fundraiser.setRecentDonor) {
          window.fundraiser.setRecentDonor();
        }
        fbq('track', 'DonateMonthlyCompleted');
        _paq.push(['trackEvent', 'Donate', 'Donate Monthly Completed', 'Donate Monthly', amount]);
      }
    }
    ga('send', 'event', {
      eventCategory: 'Donate',
      eventAction: 'click',
      eventLabel: 'Monthly Checkout',
    });
  }, handlerTimeout);
}


var hasAttachedOnce = false;
function onceHandler() {
  initialButtonClick = true;
  ga('ec:addProduct', {
    id: 'DO',
    name: "Donate Once",
  });
  ga('ec:setAction', 'checkout', {step: 1});
  ga('send', 'event', {
    eventCategory: 'Donate',
    eventAction: 'click',
    eventLabel: 'Once',
  });

  ga('ec:addProduct', {
    id: 'DO',
    name: "Donate Once",
  });
  ga('ec:setAction', 'add');
  ga('send', 'event', {
    eventCategory: 'Donate',
    eventAction: 'click',
    eventLabel: 'Once',
  });
  if (!hasAttachedOnce) {
    $('.submit-button-' + funraiseId['once']).on('click', onceSubmitHandler);
    hasAttachedOnce = true;
  }
}
$('.dxe-donate-once').on('click', onceHandler);


var hasSubmittedOnceDonation = false;
function onceSubmitHandler(e) {
  if (modalEnabled && initialButtonClick) {
    showDonateUpgradeModal();
    initialButtonClick = false;
  }

  // Sometimes this fires before the button text changes, so wrap it
  // in a setTimeout so that it sees the correct button label.
  setTimeout(() => {
    var $t = $(e.target);
    var text = $t.text();
    if (text.indexOf('Payment Info') !== -1) {
      // Show the donate upgrade modal.
      hasSubmittedOnceDonation = false;
      ga('ec:addProduct', {
        id: 'DO',
        name: 'Donate Once',
      });
      ga('ec:setAction', 'checkout', {step: 2});
    } else if (text.indexOf('Submit Donation') !== -1) {
      if (!hasSubmittedOnceDonation) {
        hasSubmittedOnceDonation = true;
        ga('ec:addProduct', {
          id: 'DO',
          name: 'Donate Once',
        });
        ga('ec:setAction', 'checkout', {step: 3});
      } else {
        hasSubmittedOnceDonation = false;
        var amount = getDonationAmount('once');
        ga('ec:addProduct', {
          id: 'DO',
          name: 'Donate Once',
          price: amount,
          quantity: 1,
        });
        ga('ec:setAction', 'purchase', {
          id: getTransactionID(),
          affiliation: "Donate Page",
          revenue: amount,
        });
        fbq('track', 'DonateOnceCompleted');
        _paq.push(['trackEvent', 'Donate', 'Donate Once Completed', 'Donate Once', amount]);
      }
    }
    ga('send', 'event', {
      eventCategory: 'Donate',
      eventAction: 'click',
      eventLabel: 'Once Checkout',
    });
  }, handlerTimeout);
}
