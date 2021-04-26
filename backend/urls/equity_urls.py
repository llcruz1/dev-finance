from views.equity_views import EquitiesViews, EquityViews

def initialize_urls(api):
    api.add_resource(EquitiesViews, '/api/equities')
    api.add_resource(EquityViews, '/api/equity/<id>')