import os
import facebook
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

# Facebook access token and Instagram API endpoint
FACEBOOK_ACCESS_TOKEN = 'your_facebook_access_token_here'
INSTAGRAM_API_ENDPOINT = 'https://graph.facebook.com/v12.0/178414XXXXXXX/media'

@app.route('/schedule', methods=['POST'])
def schedule_post():
    # Extract form data
    message = request.form['message']
    link = request.form['link']
    caption = request.form['caption']
    image = request.files['image']

    # Schedule post on Facebook
    graph = facebook.GraphAPI(access_token=FACEBOOK_ACCESS_TOKEN, version='3.0')
    facebook_post = graph.put_photo(image=image, message=message, link=link)
    facebook_post_id = facebook_post['post_id']

    # Schedule post on Instagram
    instagram_response = requests.post(INSTAGRAM_API_ENDPOINT, params={'access_token': FACEBOOK_ACCESS_TOKEN},
                                       data={'image_url': facebook_post['images'][0]['source'], 'caption': caption})
    instagram_post_id = instagram_response.json()['id']

    # Return success response
    return jsonify({'facebook_post_id': facebook_post_id, 'instagram_post_id': instagram_post_id})

if __name__ == '__main__':
    app.run(debug=True)
