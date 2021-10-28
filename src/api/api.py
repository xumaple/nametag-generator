from src import app
from src.util import *
import os
import flask

@app.route("/api/", methods=['GET'])
def get_id():
    new_hash = gen_hash(recipe_id_length_c)
    return flask.jsonify({'id': new_hash})

# spotify_id = alsdkjfalkjf
@app.route("/api/getSomething/", methods=['GET'])
def get_something():
    print('the api was called')
    return flask.jsonify({'field': 'MAPLEANDFRANK'})

@app.route("/favicon.ico", methods=['GET'])
def favicon():
    return flask.send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')