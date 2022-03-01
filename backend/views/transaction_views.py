from flask import request, jsonify
from models.transaction_model import Transaction
from serializers.transaction_serializer import transaction_serializer
from flask_restful import Resource
from utils.updateEquityFromTransaction import updateEquityFromTransaction
import logging
        
class TransactionsViews(Resource):
    def get(self):
        try:
            logging.info("Getting transactions...")
            transactions = Transaction.objects()
            return jsonify(transaction_serializer.dump(transactions, many=True))

        except Exception as e:
            logging.error("Failed to get transactions")
            logging.exception(e)

    def post(self):
        body  = request.get_json()

        try:
            logging.info("Updating equity from new transaction...")
            returnUpdate = updateEquityFromTransaction(body, "INS")
            if (returnUpdate['id'] == '-1'): 
                res = {'id': returnUpdate['id'], 'error': returnUpdate['error']}
            else:
                transaction = Transaction(**body).save()
                res = {'id': str(transaction.id), 'error': ''}

        except Exception as e:
            logging.error("Failed to update equity from new transaction")
            logging.exception(e)
            res = {'id': '-1', 'error': str(e)}
        
        return res


class TransactionByIDViews(Resource):
    def get(self, id):
        try:
            logging.info("Getting transaction of id %s", id)
            transaction = Transaction.objects.get(id=id)
            return transaction_serializer.dump(transaction)

        except Exception as e:
            logging.error("Failed to get transaction of id %s", id)
            logging.exception(e)


    def delete(self, id):
        try:
            logging.info("Deleting transaction of id %s", id)
            transaction = Transaction.objects.get(id=id)
        
            #Update EQUITY (qty, averagePrice)
            returnUpdate = updateEquityFromTransaction(transaction, "DEL")

            if (returnUpdate['id'] == '-1'): 
               res = {'id': returnUpdate['id'], 'error': returnUpdate['error']}
            else:
                transaction.delete()
                res = {'id': str(transaction.id), 'error': ''}

        except Exception as e: 
            logging.error("Failed to delete transaction of id %s", id)
            logging.exception(e)
            res = {'id': '-1', 'error': str(e)}

        return res


    def put(self, id):
        try:
            logging.info("Updating transaction of id %s", id)
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
            logging.error("Failed to update transaction of id %s", id)
            logging.exception(e)
            res = {'id': '-1', 'error': str(error)}
        
        return res

