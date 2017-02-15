from flask import Flask, send_from_directory
app = Flask(__name__, static_url_path='')

@app.route("/")
def index():
    return open("index-test.html").read()

@app.route("/subscriber-confirmed")
def subscriber_confirmed():
    return 'subscriber confirmed, hooray!'

@app.route("/api/form/FormSubmissionKey", methods=["POST"])
def form_key():
    return '{"key":"1:1482902640:1/4wLIsueGSZFrBbpkMOqBMBsCv95yto3Usj8zxucWE="}'

@app.route("/api/form/SaveFormSubmission", methods=["POST"])
def form_save():
    return 'OK'

@app.route('/out/<path:path>')
def send_js(path):
    return send_from_directory('out', path)


if __name__ == "__main__":
    app.run()
