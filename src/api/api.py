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


@app.route("/api/pdfs/<filename>", methods=['GET'])
def get_pdf(filename):
    return flask.send_file('api/pdfs/{}'.format(filename), mimetype = 'application/pdf', as_attachment=True)

@app.route("/<filename>", methods=['GET'])
def get_worker(filename):
    if filename == 'pdf.worker.min.js' or filename == 'pdf.worker.js':
        return flask.send_file('../node_modules/react-pdf/node_modules/pdfjs-dist/build/{}'.format(filename), as_attachment=True)
    return flask.abort(404)