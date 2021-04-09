from flask import Blueprint, request, jsonify
from models import Transaction

transactions = Blueprint('transactions', __name__)

@transactions.route('/transactions', methods=['GET'])
def getTransactions():
    transactions = Transaction.objects().to_json()
    return transactions

@transactions.route('/transactions', methods=['POST'])
def createTransaction():
    """
        **body unpacks the body dictionary into the Transaction object as named parameters. 
        For example if body = {"description": "Food", "amount": 23.50},
        then Transacation(**body) is the same as Transaction(description="Food", amount=23.50)
    """
    body = request.get_json()
    transaction = Transaction(**body).save()
    return jsonify(str(transaction.id))

@transactions.route('/transaction/<id>', methods=['GET'])
def getTransaction(id):
    transaction = Transaction.objects.get(id=id)
    return jsonify(transaction)

@transactions.route('/transactions/<id>', methods=['DELETE'])
def deleteTransaction(id):
    transaction = Transaction.objects.get(id=id)
    transaction.delete()
    return jsonify(str(transaction.id))

@transactions.route('/transactions/<id>', methods=['PUT'])
def updateTransaction(id):
    body = request.get_json()
    transaction = Transaction.objects.get(id=id).to_json()
    transaction.update(**body)
    return str(transaction.id)
