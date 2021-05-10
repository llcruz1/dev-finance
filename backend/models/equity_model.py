from db import db
import datetime

class Equity(db.Document):
    broker          = db.StringField(max_length=20, required=True)
    ticker          = db.StringField(max_length=10, required=True)
    name            = db.StringField(max_length=80, required=True)
    index           = db.StringField(max_length=50, required=True)
    groupName       = db.StringField(max_length=50, required=True)
    equityType      = db.StringField(max_length=50, required=True)
    qty             = db.FloatField(max_digits=11, decimal_places=2)
    averagePrice    = db.FloatField(max_digits=11, decimal_places=2)
    currentPrice    = db.FloatField(max_digits=11, decimal_places=2, editable=False)

