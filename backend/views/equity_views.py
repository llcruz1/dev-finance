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

    try:
        ticker       = yf.Ticker(symbol)
        todays_data  = ticker.history(period='1d')
    
        currentPrice = round(todays_data['Close'][0], 2)

    except:
        currentPrice = 0

    return currentPrice


#Insert e Delete Transaction
def updateEquityFromTransaction(transaction, dbTransactionType):
    try:
        operationType = transaction['operationType']
        ticker  = transaction['ticker']
        qty     = float(transaction['qty'])
        price   = float(transaction['price'])
        
        if (dbTransactionType == "DEL"):
            qty *= -1

        equity  = Equity.objects.all().filter(ticker=ticker)

        if (equity):
            #Update qty e averagePrice 
            qtyEquity     = float(equity[0].qty)
            priceEquity   = float(equity[0].averagePrice)

            print(ticker,qty,price,qtyEquity,priceEquity)


            if (operationType == "C"):
                if(qtyEquity + qty) == 0:
                    price = 0
                    qty   = 0
                else:
                    price = round(((qtyEquity * priceEquity) + (price * qty)) / (qtyEquity + qty), 2)
                    qty   = qtyEquity + qty

            elif (operationType == "V"):
                price = priceEquity
                qty   = qtyEquity - qty

            equity.update(qty=qty,averagePrice=price)
            res = {'id': str(equity[0].id), 'error': ''}
            
        elif (dbTransactionType == "INS") and operationType == "C":
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
            res = {'id': str(equity.id), 'error': ''}

        else:
            res = {'id': '-1', 'error': 'Ticker '+ticker+' não encontrado.'}

    except Exception as error:
        res = {'id': '-1', 'error': str(error)}

    return res
