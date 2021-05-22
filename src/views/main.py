from src import app
from src.util import *
import flask

@app.route("/")
def home_page():
    context = {
        'jsfile': main_jsfile_c,
        'title': 'Nametags'
    }
    return flask.render_template("base.html", **context)
