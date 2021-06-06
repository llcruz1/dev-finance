import yfinance as yf

def getCurrentPrice(symbol, market):
    if (market == "BR"):
        symbol += ".SA"

    try:
        ticker       = yf.Ticker(symbol)
        todays_data  = ticker.history(period='1d')
    
        currentPrice = round(todays_data['Close'][0], 2)

    except:
        currentPrice = 0

    return currentPrice