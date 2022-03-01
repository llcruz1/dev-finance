from models.equity_model import Equity
from models.transaction_model import Transaction

#Insert e Delete Transaction
def update_equity_from_transaction(transaction, dbTransactionType):
    try:
        operationType = transaction['operationType']
        market = transaction['market']
        ticker  = transaction['ticker']
        broker = transaction['broker']
        qty     = float(transaction['qty'])
        price   = float(transaction['price'])
        
        if (dbTransactionType == "DEL"):
            qty *= -1

        equity  = Equity.objects.all().filter(ticker=ticker)

        if (equity):
            #Update qty e averagePrice 
            qtyEquity     = float(equity[0].qty)
            priceEquity   = float(equity[0].averagePrice)

            if (operationType == "C"):
                if(qtyEquity + qty) == 0:
                    price = 0
                    qty   = 0
                else:
                    price = round(((qtyEquity * priceEquity) + (price * qty)) / (qtyEquity + qty), 2)
                    qty   = qtyEquity + qty

            elif (operationType == "V"):
                price = priceEquity
                qty   = qtyEquity - qty

            if (qty < 0):
                res = {'id': '-1', 'error': 'Quantidade negativa'}

            else:
                equity.update(qty=qty,averagePrice=price)
                res = {'id': str(equity[0].id), 'error': ''}

                if (dbTransactionType == "DEL" and qty == 0):
                    transactionsCount  = Transaction.objects.all().filter(ticker=ticker).count()

                    if (transactionsCount == 1):
                        equity.delete()
                        res = {'id': '0', 'error': ''}

        elif (dbTransactionType == "INS") and operationType == "C":
            #Insert EQUITY
            if market == 'BR':
                body = {
                    "broker": broker,
                    "ticker": ticker,
                    "name": "Nome da Acao",
                    "groupName": "Ações Brasileiras",
                    "market": market,
                    "qty": qty,
                    "averagePrice": price
                }
            elif market == 'US':
                body = {
                    "broker": broker,
                    "ticker": ticker,
                    "name": "Nome da Acao",
                    "groupName": "Ações Americanas",
                    "market": market,
                    "qty": qty,
                    "averagePrice": price
                }               
            
            equity = Equity(**body).save()
            res = {'id': str(equity.id), 'error': ''}

        else:
            res = {'id': '-1', 'error': 'Ticker '+ticker+' não encontrado.'}

    except Exception as e:
        res = {'id': '-1', 'error': str(e)}

    return res