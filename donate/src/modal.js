var ga = window.ga || function() {};

var HTML = `
<style>
#upgrade-modal {
    z-index: 1000000;
}
#donate-upgrade-modal-header {
    font-size: 120%;
    text-transform: uppercase;
    text-align: center;
}
#return-to-one-time-donation {
    float: left;
    font-size: 60%;
    padding: 10px 0;
    border: none;
    background: none;
}
#return-to-one-time-donation:hover {
    color: black;
    decoration: underline;
}
#go-to-monthly-donation {
    float: right;
    font-size: 60%;
    padding: 10px;
}
</style>

<div class="modal" id="donate-upgrade-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" id="donate-upgrade-modal-header">Did you know about our Monthly Donor Campaign?</h4>

      </div>
      <div class="modal-body">
        <p>Thank you for choosing to donate to DxE&#39;s life saving work.</p>
        <p>
          For a limited time only, <strong>every new monthly donor</strong> (in any amount) earns DxE a <strong>bonus
            $100 grant</strong> from our generous monthly donor.
        </p>
        <p>
          Would you like make a $<span id="donate-upgrade-amount"></span> monthly donation and earn DxE a <strong>bonus $100</strong>?
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="sqs-editable-button" id="return-to-one-time-donation">No, I want to donate once. </button>
        <button type="button" class="sqs-editable-button" data-dismiss="modal" id="go-to-monthly-donation">Yes, I&#39;ll become a monthly donor!</button>
      </div>
    </div>
  </div>
</div>
  `;

export const donateUpgradeModalState = {
  monthlySelected: false,
};

function init() {
  $('body').append(HTML);

  // Event handler for when user clicks "No, I'll donate once.", show one-time donation modal
  $('#return-to-one-time-donation').on('click', () => {
    $('#donate-upgrade-modal').modal('hide');
    $('#donateModal-472c107b229').modal('show');
  });

  // Event handler for when user clicks "Yes, I'll become a monthly donor!", show monthly donation modal
  $('#go-to-monthly-donation').on('click', () => {
    donateUpgradeModalState.monthlySelected = true;
    $('#donate-upgrade-modal').modal('hide');
    $('.dxe-donate-monthly').click();
    // Use the funraise API to update the donation amount.
    f230.setAmount($('#donate-upgrade-amount').text());
    // Remove the "active" class from the donation amount buttons so
    // that "$45" isn't highlighted.
    $('.js-amount').removeClass('active');

    // Measure promo click.
    ga('ec:addPromo', {
      'id': 'UPGRADE_TO_MONTHLY',
      'name': 'Upgrade to Monthly',
    });

    // Send the promo_click action with an event.
    ga('ec:setAction', 'promo_click');
    ga('send', 'event', 'Internal Promotions', 'click', 'Upgrade to Monthly');
  });
}
init();

let donateUpgradeModalShown = false;

export function showDonateUpgradeModal() {
  // Only ever show the donate modal once.
  if (donateUpgradeModalShown) {
    return;
  } else {
    donateUpgradeModalShown = true;
  }

  $('#donateModal-472c107b229').modal('hide');

  // Calculate 30% of one-time donation amount
  let amount = $('#amount-472c107b229').val();
  let suggestAmount;
  if (amount == 0 || isNaN(amount)) {
    suggestAmount = ((30/100) * 45);
  } else {
    suggestAmount = ((30/100) * amount);
  }
  // Round suggestAmount to hundredths.
  suggestAmount = Math.round(100*suggestAmount) / 100;
  // Convert to a string and make sure it looks like "$12" or
  // "$12.40".
  let suggestAmountStr = '' + suggestAmount;
  if (suggestAmountStr.indexOf('.') !== -1) {
    // Assume that all strings are either "xxx.xx" or "xxx.x")
    var dotIndex = suggestAmountStr.indexOf('.');
    var cents = suggestAmountStr.slice(dotIndex+1);
    if (cents.length == 1) {
      // amount is "xxx.x", add an extra 0
      suggestAmountStr += "0";
    }
  }

  $('#donate-upgrade-amount').html(suggestAmountStr);

  $('#donate-upgrade-modal').modal('show');
}
