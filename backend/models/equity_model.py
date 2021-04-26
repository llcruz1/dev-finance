from db import db
import datetime

class Equity(db.Document):
    name = db.StringField(max_length=200, required=True)
    averagePrice = db.FloatField(max_digits=11, decimal_places=2)
    operationDate = db.DateTimeField(default=datetime.datetime.utcnow)
    currentPrice = db.FloatField(max_digits=11, decimal_places=2, editable=False)

