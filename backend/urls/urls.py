from views.equity_views import EquitiesViews, EquityByIDViews
from views.transaction_views import TransactionsViews, TransactionByIDViews

def initialize_urls(api):
    api.add_resource(EquitiesViews, '/api/equities')
    api.add_resource(EquityByIDViews, '/api/equity/<id>')

    api.add_resource(TransactionsViews, '/api/transactions')
    api.add_resource(TransactionByIDViews, '/api/transaction/<id>')