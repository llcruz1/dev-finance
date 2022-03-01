from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from db import initialize_db
from flask_restful import Api
from urls.urls import initialize_urls
import logging

app = Flask(__name__)

logging.basicConfig(
    level=logging.DEBUG, 
    format=f'%(asctime)s %(filename)s %(funcName)s %(lineno)d %(levelname)s: %(message)s'
)

CORS(app)
api = Api(app)

app.config['MONGODB_SETTINGS'] = {
    "db": "dev_finance",
}

initialize_db(app)
initialize_urls(api)
