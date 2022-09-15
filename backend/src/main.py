from flask import Flask
import routes

app = Flask(__name__)
app.add_url_rule('/', methods=['POST'], view_func=routes.test)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
