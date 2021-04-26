from flask import Response, request, jsonify
from models.equity_model import Equity
from serializers.equity_serializer import equity_serializer
from flask_restful import Resource
import requests

API_URL = "https://www.alphavantage.co/query"
API_KEY = 'UXC3A03SLTC7P1WY'

class EquitiesViews(Resource):
    def get(self):
        equities = Equity.objects()
        for equity in equities:
            data = {
                "function": "GLOBAL_QUOTE",
                "symbol": equity.name,
                "apikey": API_KEY,
            }
            response = requests.get(API_URL, params=data)

            currentPrice = response.json()["Global Quote"]["05. price"]
            equity.currentPrice = currentPrice

        return jsonify(equity_serializer.dump(equities, many=True))

    def post(self):
        body = request.get_json()
        equity = Equity(**body).save()
        return jsonify(str(equity.id))

class EquityViews(Resource):
    def get(self, id):
        equity = Equity.objects.get(id=id)
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
    

