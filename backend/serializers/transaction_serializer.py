import marshmallow_mongoengine as ma
from models.transaction_model import Transaction

class TransactionSerializer(ma.ModelSchema):
    class Meta:
        model = Transaction

transaction_serializer = TransactionSerializer()

