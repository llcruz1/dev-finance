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
        body  = request.get_json()

        try:
            returnUpdate = updateEquityFromTransaction(body, "INS")
            if (returnUpdate['id'] == '-1'): 
                res = {'id': returnUpdate['id'], 'error': returnUpdate['error']}
            else:
                transaction = Transaction(**body).save()
                res = {'id': str(transaction.id), 'error': ''}
        except Exception as error: 
            res = {'id': '-1', 'error': str(error)}
        
        print(res)
        return res


class TransactionViews(Resource):
    def get(self, id):
        transaction = Transaction.objects.get(id=id)
        return transaction_serializer.dump(transaction)

    def delete(self, id):
        try:
            transaction = Transaction.objects.get(id=id)
        
            #Update EQUITY (qty, averagePrice)
            returnUpdate = updateEquityFromTransaction(transaction, "DEL")
            if (returnUpdate['id'] == '-1'): 
               res = {'id': returnUpdate['id'], 'error': returnUpdate['error']}
            else:
                transaction.delete()
                res = {'id': str(transaction.id), 'error': ''}
        except Exception as error: 
            res = {'id': '-1', 'error': str(error)}

        print(res)
        return res


    def put(self, id):
        try:
            body = request.get_json()
            transaction = Transaction.objects.get(id=id)

            #Update EQUITY (qty, averagePrice)
            returnUpdate = updateEquityFromTransaction(transaction, "DEL")
            if (returnUpdate['id'] == '-1'): 
                res = {'id': returnUpdate['id'], 'error': returnUpdate['error']}
            else:
                returnUpdate = updateEquityFromTransaction(body, "INS")
                if (returnUpdate['id'] == '-1'): 
                    res = {'id': returnUpdate['id'], 'error': returnUpdate['error']}
                else:
                    transaction.update(**body)
                    res = {'id': str(transaction.id), 'error': ''}
        except Exception as error: 
            res = {'id': '-1', 'error': str(error)}
        
        print(res)
        return res

