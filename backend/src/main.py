from flask_cors import CORS
from flask import Flask
import routes

app = Flask(__name__)
CORS(app, support_credentials=True)

app.add_url_rule('/', methods=['POST'], view_func=routes.clear_tmp)
app.add_url_rule('/add_art', methods=['POST'], view_func=routes.add_art)
app.add_url_rule('/import_arts', methods=['POST'], view_func=routes.reimport_arts)
app.add_url_rule('/get_arts', methods=['GET'], view_func=routes.get_arts)
app.add_url_rule('/get_arts_by_filter', methods=['POST'], view_func=routes.get_arts_by_filter)
app.add_url_rule('/get_materials', methods=['GET'], view_func=routes.get_materials)
app.add_url_rule('/get_genres', methods=['GET'], view_func=routes.get_genres)
app.add_url_rule('/get_museums', methods=['GET'], view_func=routes.get_museums)
app.add_url_rule('/get_types', methods=['GET'], view_func=routes.get_types)
app.add_url_rule('/recreate_table', methods=['GET'], view_func=routes.recreate_table)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
