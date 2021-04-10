import marshmallow_mongoengine as ma
from models import Transaction

class TransactionSerializer(ma.ModelSchema):
    class Meta:
        model = Transaction

transaction_serializer = TransactionSerializer()

