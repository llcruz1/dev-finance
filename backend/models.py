from db import db
import mongoengine_goodjson as gj

class Transaction(gj.Document):
    description = db.StringField(max_length=200, required=True)
    amount = db.DecimalField(max_digits=7, decimal_places=2)
    date = db.StringField()