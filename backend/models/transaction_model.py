from db import db
import datetime

from models.equity_model import Equity


class Transaction(db.Document):
    OPERATION_TYPE = (
        ('C', 'Compra'),
        ('V', 'Venda'),
        ('D', 'Desdobramento'),
        ('B', 'Bonificação')
    )

    ticker          = db.StringField(max_length=10, required=True)
    operationType   = db.StringField(max_length=1, required=True, choices=OPERATION_TYPE)
    operationDate   = db.DateTimeField(default=datetime.datetime.utcnow)
    qty             = db.FloatField(max_digits=14, decimal_places=6)
    price           = db.FloatField(max_digits=14, decimal_places=6)
    taxes           = db.FloatField(max_digits=14, decimal_places=6, required=False, default=0)