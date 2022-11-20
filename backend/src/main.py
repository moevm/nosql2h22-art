from flask_cors import CORS
from flask import Flask
import routes

app = Flask(__name__)
CORS(app)

app.add_url_rule('/', methods=['POST'], view_func=routes.test)
app.add_url_rule('/add_art', methods=['POST'], view_func=routes.add_art)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
