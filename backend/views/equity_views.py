from functools import reduce
from flask import Response, request, jsonify
from models.equity_model import Equity
from serializers.equity_serializer import equity_serializer
from flask_restful import Resource
import requests
import yfinance as yf
import json
        
class EquitiesViews(Resource):
    def get(self):

        equities = Equity.objects()
        
        if len(equities) > 0:
            #map gera uma lista com os nomes dos ativos
            #reduce pega a lista gerada e converte em string no formato: ticker1+' '+ticker2+' '+tickerN
            symbols  = reduce(lambda x,y : x+' '+y, map(lambda x : x.ticker, equities))

            if len(equities) == 1:
                tickers = yf.Ticker(symbols)    
            else:
                tickers = yf.Tickers(symbols)
            
            for equity in equities:
                todays_data = tickers.history(period='1d')

                if len(equities) == 1:
                    currentPrice = round(todays_data['Close'][0], 2)
                else:
                    currentPrice = round(todays_data['Close'][equity.ticker], 2)

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
    

