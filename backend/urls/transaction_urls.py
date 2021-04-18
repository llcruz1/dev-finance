from views.transaction_views import TransactionsViews, TransactionViews

def initialize_urls(api):
    api.add_resource(TransactionsViews, '/api/transactions')
    api.add_resource(TransactionViews, '/api/transaction/<id>')