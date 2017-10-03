export var payload = `
<div id="payload">
  <div class="modal fade" id="email-signup-modal" tabindex="-1" role="dialog" aria-labelledby="email-signup-modal-label" aria-hidden="true">
    <div class="vertical-alignment-helper">
      <div class="modal-dialog vertical-align-center">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span id="close-button" aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
  <h4 class="modal-title" id="myModalLabel">Sign up to learn about our<br>next open rescue!</h4>
          </div>
          <div class="modal-body">
            <div class="form-wrapper">
              <div class="form-inner-wrapper">
                <form autocomplete="on" action="" method="POST" onsubmit="return (function(form) { Y.use
                                                                          ('squarespace-form-submit', 'node',
                                                                          function (Y) { (new Y.Squarespace.FormSubmit({ formNode: Y.Node(form) })).submit('5850c5e044024318a770abf8', '', '') }); return false;})(this)">
                  <div class="field-list clear">
                    <fieldset id="name-yui_3_17_2_1_1481686238867_115413" class="form-item fields name required">
                      <div class="title">Name <span class="required">*</span></div>
                      <div class="field first-name">
                        <label class="caption"><input class="field-element field-control" name="fname" x-autocompletetype="given-name" type="text" spellcheck="false" maxlength="30" data-title="First"><span id="first-name-caption">First Name</span></label>
                      </div>
                      <div class="field last-name">
                        <label class="caption"><input class="field-element field-control" name="lname" x-autocompletetype="surname" type="text" spellcheck="false" maxlength="30" data-title="Last"><span id="last-name-caption">Last Name</span></label>
                      </div>
                    </fieldset>
                    <div id="email-yui_3_17_2_1_1481686238867_115752" class="form-item field email required">
                      <label class="title" for="email-yui_3_17_2_1_1481686238867_115752-field">Email Address <span class="required">*</span></label>
                      <input class="field-element" name="email" x-autocompletetype="email" type="text" spellcheck="false" id="email-yui_3_17_2_1_1481686238867_115752-field">
                    </div><br>
                    <div id="select-yui_3_17_2_1_1481686238867_118639" class="form-item field select">
                      <label class="title" for="select-yui_3_17_2_1_1481686238867_118639-field">Add to a local mailing list?</label>
                      <select name="select-yui_3_17_2_1_1481686238867_118639-field">
                        <option value="None">None</option>
                        <option value="Bakersfield">Bakersfield</option>
                        <option value="Berlin">Berlin</option>
                        <option value="Bloomington">Bloomington</option>
                        <option value="Chicago">Chicago</option>
                        <option value="Cleveland">Cleveland</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Copenhagen">Copenhagen</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Fraser Valley">Fraser Valley</option>
                        <option value="Grand Rapids">Grand Rapids</option>
                        <option value="Halifax">Halifax</option>
                        <option value="Hamburg">Hamburg</option>
                        <option value="Indiana">Indiana</option>
                        <option value="Inland Empire">Inland Empire</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Maryland/DC/Virginia">Maryland/DC/Virginia</option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="New Orleans">New Orleans</option>
                        <option value="New York City">New York City</option>
                        <option value="Orange County">Orange County</option>
                        <option value="Philadelphia">Philadelphia</option>
                        <option value="Philadelphia">Portland</option>
                        <option value="Riverside">Riverside</option>
                        <option value="Salt Lake City">Salt Lake City</option>
                        <option value="San Diego">San Diego</option>
                        <option value="San Francisco Bay Area">San Francisco Bay Area</option>
                        <option value="San Luis Obispo">San Luis Obispo</option>
                        <option value="Tallahassee">Tallahassee</option>
                        <option value="Tel Aviv">Tel Aviv</option>
                        <option value="Toronto">Toronto</option>
                        <option value="Vancouver">Vancouver</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-button-wrapper form-button-wrapper--align-center">
                    <input class="modal-submit-button button sqs-system-button sqs-editable-button" id="submit-button" type="submit" value="Submit">
                  </div><br>
                  <div class="hidden" id="alert-box"></div>
                  <div class="hidden form-submission-text"><p>Thank you for signing up! You'll now be notified of DxE news and global and local events!</p></div>
                  <div class="hidden form-submission-html" data-submission-html="<script>var e = $('#select-yui_3_17_2_1_1481686238867_118639 select'); var strChapter = e[0].options[e[0].selectedIndex].value; if (strChapter == 'San Francisco Bay Area') {window.location.assign('/subscriber-confirmed?action=email-modal?list=sfbay');} else {window.location.assign('/subscriber-confirmed?action=email-modal');}</script>"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
