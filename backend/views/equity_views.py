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
        if (equities):
            for equity in equities:
                equity.currentPrice = getCurrentPrice(equity.ticker, equity.index)
        return jsonify(equity_serializer.dump(equities, many=True))

    def post(self):
        body = request.get_json()
        equity = Equity(**body).save()
        return jsonify(str(equity.id))

class EquityViews(Resource):
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
    

def getCurrentPrice(symbol, index):
    if (index == "B3"):
        symbol += ".SA"

    ticker      = yf.Ticker(symbol)
    todays_data = ticker.history(period='1d')
    
    return round(todays_data['Close'][0], 2)


#Insert e Delete Transaction
def updateEquityFromTransaction(transaction, dbTransactionType):
    try:
        ticker  = transaction['ticker']
        qty     = transaction['qty']
        price   = transaction['price']
        
        if (dbTransactionType == "Delete"):
            qty *= -1

        equity  = Equity.objects.all().filter(ticker=ticker)
        
        if (equity):
            #Update qty e averagePrice 
            qtyEquity     = equity[0].qty
            priceEquity   = equity[0].averagePrice

            operationType = transaction['operationType']
            
            if (operationType == "C"):
                price = ((qtyEquity * priceEquity) + (price * qty)) / (qtyEquity + qty)
                qty   = qtyEquity + qty
            elif (operationType == "V"):
                price = priceEquity
                qty   = qtyEquity - qty
            
            equity.update(qty=qty,averagePrice=price)
            
        elif (dbTransactionType == "Insert"):
            #Insert EQUITY
            body = {
                "broker": "Clear",
                "ticker": ticker,
                "name": "Nome da Acao",
                "index": "B3",
                "groupName": "Ações Brasileiras",
                "equityType": "Ação",
                "qty": qty,
                "averagePrice": price
            }
            equity = Equity(**body).save()

        return 1

    except:
        return -1
