import marshmallow_mongoengine as ma
from models.equity_model import Equity

class EquitySerializer(ma.ModelSchema):
    class Meta:
        model = Equity

equity_serializer = EquitySerializer()

