from flask import Flask, jsonify
from flask_cors import CORS
import requests
import time

app = Flask(__name__)
CORS(app)

def status_check(url):
    start_time = time.time()

    # 503 Error Solution - Amazon requires that you specify 'User-Agent' header in order to return 200 response
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0'} # https://stackoverflow.com/questions/64192137/amazon-com-returns-status-503

    response = requests.get(
        url=url, 
        headers=headers
        )
    
    return {
        "url": url,
        "statusCode": response.status_code,
        "duration": int((time.time() - start_time)*1000), # (current time - start time) to calculate duration
        "date": int(time.time())
    }

@app.route('/v1/amazon-status', methods=['GET'])
def amazon_status():
    result = status_check("https://www.amazon.com")
    return jsonify(result)

@app.route('/v1/google-status', methods=['GET'])
def google_status():
    result = status_check("https://www.google.com")
    return jsonify(result)

@app.route('/v1/all-status', methods=['GET'])
def all_status():
    amazon_result = status_check("https://www.amazon.com")
    google_result = status_check("https://www.google.com")
    return jsonify([amazon_result, google_result])

if __name__ == "__main__":
    app.run()