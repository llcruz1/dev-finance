from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from db import initialize_db
from routes import transactions

app = Flask(__name__)

CORS(app)

app.config['MONGODB_SETTINGS'] = {
    "db": "dev_finance",
}

db = MongoEngine(app)

app.register_blueprint(transactions)
