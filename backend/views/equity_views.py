from flask import request, jsonify
from models.equity_model import Equity
from serializers.equity_serializer import equity_serializer
from flask_restful import Resource
from utils.getCurrentPrice import getCurrentPrice
import logging
        
class EquitiesViews(Resource):
    def get(self):
        try:
            logging.info("Getting equities...")
            equities = Equity.objects.all().filter(qty__gt=0)

            if (equities):
                logging.info("Getting current prices...")
                for equity in equities:
                    equity.currentPrice = getCurrentPrice(equity.ticker, equity.market)    
            return jsonify(equity_serializer.dump(equities, many=True))

        except Exception as e:
            logging.error("Failed to get equities")
            logging.exception(e)

    def post(self):
        try: 
            logging.info("Adding equity...")
            body = request.get_json()
            equity = Equity(**body).save()
            return jsonify(str(equity.id))

        except Exception as e:
            logging.error("Failed to add equity")
            logging.exception(e)

class EquityByIDViews(Resource):
    def get(self, id):
        try:
            logging.info("Getting equity of id %s", id)
            equity = Equity.objects.get(id=id)
            equity.currentPrice = getCurrentPrice(equity.ticker, equity.market)
            return equity_serializer.dump(equity)

        except Exception as e:
            logging.error("Failed to get equity of id %s", id)
            logging.exception(e)

    def delete(self, id):
        try:
            logging.delete("Deleting equity of id %s", id)
            equity = Equity.objects.get(id=id)
            equity.delete()
            return jsonify(str(equity.id))

        except Exception as e:
            logging.error("Failed to delete equity of id %s", id)
            logging.exception(e)
    
    def put(self, id):
        try:
            logging.info("Updating equity of id %s", id)
            body = request.get_json()
            equity = Equity.objects.get(id=id)
            equity.update(**body)
            return str(equity.id)

        except Exception as e:
            logging.error("Failed to uptade equity of id %s", id)
            logging.exception(e)
    

