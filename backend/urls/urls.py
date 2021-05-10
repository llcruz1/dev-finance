from views.equity_views import EquitiesViews, EquityViews
from views.transaction_views import TransactionsViews, TransactionViews

def initialize_urls(api):
    api.add_resource(EquitiesViews, '/api/equities')
    api.add_resource(EquityViews, '/api/equity/<id>')

    api.add_resource(TransactionsViews, '/api/transactions')
    api.add_resource(TransactionViews, '/api/transaction/<id>')