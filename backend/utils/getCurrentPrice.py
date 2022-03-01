import yfinance as yf
import logging

def getCurrentPrice(symbol, market):
    if (market == "BR"):
        symbol += ".SA"

    try:
        ticker       = yf.Ticker(symbol)
        todays_data  = ticker.history(period='1d')
    
        currentPrice = round(todays_data['Close'][0], 2)

    except Exception as e:
        logging.error("Failed to get current price for symbol %s", symbol)
        logging.exception(e)
        logging.warning("Setting current price to 0...")
        currentPrice = 0

    return currentPrice