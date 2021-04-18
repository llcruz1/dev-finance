from db import db
import datetime

class Transaction(db.Document):
    description = db.StringField(max_length=200, required=True)
    amount = db.IntField(max_digits=7, decimal_places=2)
    date = db.DateTimeField(default=datetime.datetime.utcnow)