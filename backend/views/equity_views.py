from functools import reduce
from flask import request, jsonify
from models.equity_model import Equity
from serializers.equity_serializer import equity_serializer
from flask_restful import Resource
from utils.getCurrentPrice import getCurrentPrice
        
class EquitiesViews(Resource):
    def get(self):
        equities = Equity.objects.all().filter(qty__gt=0)
        if (equities):
            for equity in equities:
                equity.currentPrice = getCurrentPrice(equity.ticker, equity.index)
        return jsonify(equity_serializer.dump(equities, many=True))

    def post(self):
        body = request.get_json()
        equity = Equity(**body).save()
        return jsonify(str(equity.id))

class EquityByIDViews(Resource):
    def get(self, id):
        equity = Equity.objects.get(id=id)
        equity.currentPrice = getCurrentPrice(equity.ticker, equity.index)
        return equity_serializer.dump(equity)

    def delete(self, id):
        equity = Equity.objects.get(id=id)
        equity.delete()
        return jsonify(str(equity.id))
    
    def put(self, id):
        body = request.get_json()
        equity = Equity.objects.get(id=id)
        equity.update(**body)
        return str(equity.id)
    

