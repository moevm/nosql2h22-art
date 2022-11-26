from flask_cors import CORS
from flask import Flask
import routes

app = Flask(__name__)
CORS(app)

app.add_url_rule('/', methods=['POST'], view_func=routes.clear_tmp)
app.add_url_rule('/add_art', methods=['POST'], view_func=routes.add_art)
app.add_url_rule('/import_arts', methods=['POST'], view_func=routes.reimport_arts)
app.add_url_rule('/get_arts', methods=['GET'], view_func=routes.get_arts)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
