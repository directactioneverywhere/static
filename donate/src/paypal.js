var ga = window.ga || function() {};
var fbq = window.fbq || function() {};

ga("require", "ec");

function logPaypalDonation() {
  let url = window.location.href;
  let m = url.match(/[?&]donation_id=([^&]*)/);
  let donation_id, amount;
  if (m) {
    donation_id = m[1];
  } else {
    console.log("Could not read donation_id");
    return;
  }
  m = url.match(/[?&]amount=([^&]*)/);
  if (m) {
    amount = m[1];
  } else {
    console.log("Could not read amount");
    return;
  }

  ga('ec:addProduct', {
    id: 'DO',
    name: 'Donate Once',
    price: amount,
    quantity: 1,
    variant: "Paypal",
  });
  ga('ec:setAction', 'purchase', {
    id: donation_id,
    affiliation: "Donate Page",
    revenue: amount,
  });
  ga('send', 'event', {
    eventCategory: 'Donate',
    eventAction: 'click',
    eventLabel: 'Once Checkout',
  });
}
logPaypalDonation();
