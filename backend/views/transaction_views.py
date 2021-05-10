from functools import reduce
from flask import Response, request, jsonify
from models.transaction_model import Transaction
from models.equity_model import Equity
from views.equity_views import updateEquityFromTransaction
from serializers.transaction_serializer import transaction_serializer
from flask_restful import Resource
import requests
import yfinance as yf
import json
        
class TransactionsViews(Resource):
    def get(self):

        transactions = Transaction.objects()
        return jsonify(transaction_serializer.dump(transactions, many=True))

    def post(self):
        body = request.get_json()
        
        try:
            returnUpdate = updateEquityFromTransaction(body, "Insert")

            if (returnUpdate > 0): 
                transaction = Transaction(**body).save()
                id = str(transaction.id)
            else:
                id = '-1'

            return jsonify(id)

        except:
            return jsonify('-1')


class TransactionViews(Resource):
    def get(self, id):
        transaction = Transaction.objects.get(id=id)
        return transaction_serializer.dump(transaction)

    def delete(self, id):
        transaction = Transaction.objects.get(id=id)
        
        try:
            #Update EQUITY (qty, averagePrice)
            returnUpdate = updateEquityFromTransaction(transaction, "Delete")

            if (returnUpdate > 0): 
                transaction.delete()
                id = str(transaction.id)
            else:
                id = '-1'

            return jsonify(id)

        except:
            return jsonify('-1')

    
    def put(self, id):
        body = request.get_json()
        transaction = Transaction.objects.get(id=id)

        try:
            #Update EQUITY (qty, averagePrice)
            returnUpdate = updateEquityFromTransaction(transaction, "Delete")

            if (returnUpdate > 0): 
                returnUpdate = updateEquityFromTransaction(body, "Insert")

            if (returnUpdate > 0): 
                transaction.update(**body)
                id = str(transaction.id)
            else:
                id = '-1'

            return jsonify(id)

        except:
            return jsonify('-1')
 

