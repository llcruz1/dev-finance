from flask import Response, request, jsonify
from models.transaction_model import Transaction
from serializers.transaction_serializer import transaction_serializer
from flask_restful import Resource

class TransactionsViews(Resource):
    def get(self):
        transactions = Transaction.objects()
        return jsonify(transaction_serializer.dump(transactions, many=True))

    def post(self):
        body = request.get_json()
        transaction = Transaction(**body).save()
        return jsonify(str(transaction.id))

class TransactionViews(Resource):
    def get(self, id):
        transaction = Transaction.objects.get(id=id)
        return transaction_serializer.dump(transaction)

    def delete(self, id):
        transaction = Transaction.objects.get(id=id)
        transaction.delete()
        return jsonify(str(transaction.id))
    
    def put(self, id):
        body = request.get_json()
        transaction = Transaction.objects.get(id=id)
        transaction.update(**body)
        return str(transaction.id)
    

