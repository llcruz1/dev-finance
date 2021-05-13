from models.equity_model import Equity

#Insert e Delete Transaction
def updateEquityFromTransaction(transaction, dbTransactionType):
    try:
        operationType = transaction['operationType']
        ticker  = transaction['ticker']
        qty     = float(transaction['qty'])
        price   = float(transaction['price'])
        
        if (dbTransactionType == "DEL"):
            qty *= -1

        equity  = Equity.objects.all().filter(ticker=ticker)

        if (equity):
            #Update qty e averagePrice 
            qtyEquity     = float(equity[0].qty)
            priceEquity   = float(equity[0].averagePrice)

            print(ticker,qty,price,qtyEquity,priceEquity)


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

            equity.update(qty=qty,averagePrice=price)
            res = {'id': str(equity[0].id), 'error': ''}
            
        elif (dbTransactionType == "INS") and operationType == "C":
            #Insert EQUITY
            body = {
                "broker": "Clear",
                "ticker": ticker,
                "name": "Nome da Acao",
                "index": "B3",
                "groupName": "Ações Brasileiras",
                "equityType": "Ação",
                "qty": qty,
                "averagePrice": price
            }
            equity = Equity(**body).save()
            res = {'id': str(equity.id), 'error': ''}

        else:
            res = {'id': '-1', 'error': 'Ticker '+ticker+' não encontrado.'}

    except Exception as error:
        res = {'id': '-1', 'error': str(error)}

    return res