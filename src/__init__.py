import flask

app = flask.Flask(__name__)
app.config.from_object('config')

app.config.from_envvar('APP_SETTINGS', silent=True)

# firebase = pyrebase.initialize_app({
#    TODO if using firebase
# })

# db = firebase.database()

import src.views
import src.api
