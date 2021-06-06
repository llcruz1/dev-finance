import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useParams, useHistory } from "react-router-dom";
import { format } from "date-fns";
//import { useForm } from "react-hook-form";
import {
  updateTransaction,
  addTransaction,
  getTransactionById,
  selectTransactionById,
} from "./transactionsSlice";

function TransactionForm() {
  const dispatch = useAppDispatch();
  //const { register, handleSubmit } = useForm();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const transaction = useAppSelector((state) => selectTransactionById(state, id));
  const status = useAppSelector((state) => state.transactions.status);

  const [ticker, setTicker] = useState<string>("");
  const [market, setMarket] = useState<string>("BR");
  const [broker, setBroker] = useState<string>("");
  const [operationType, setOperationType] = useState<string>("C");
  const [operationDate, setOperationDate] = useState<string>("");
  const [qty, setQty] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [taxes, setTaxes] = useState<number>(0);

  useEffect(() => {
    if (transaction) {
      setTicker(transaction.ticker);
      setMarket(transaction.market);
      setBroker(transaction.broker);
      setOperationType(transaction.operationType);
      setOperationDate(format(new Date(transaction.operationDate), "yyyy-dd-MM")); //
      setQty(transaction.qty);
      setPrice(transaction.price);
      setTaxes(transaction.taxes);
    }
  }, [transaction]);

  useEffect(() => {
    if (status === "idle" && id) {
      dispatch(getTransactionById(id));
    }
  }, [dispatch, status, id]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (transaction) {
      dispatch(
        updateTransaction({
          id: transaction.id,
          ticker: ticker,
          market: market,
          broker: broker,
          operationType: operationType,
          operationDate: operationDate,
          qty: qty,
          price: price,
          taxes: taxes,
        }),
      );
    } else {
      dispatch(
        addTransaction({
          ticker,
          market,
          broker,
          operationType,
          operationDate,
          qty,
          price,
          taxes,
        }),
      );
    }
    history.push("/");
  }

  return (
    <div>
      <div>
        <Link to="/">Voltar</Link>
        <br />
        <br />
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Tipo de ação: </label>
          <select required value={market} onChange={(e) => setMarket(e.target.value)}>
            <option value="BR">Ação Brasileira</option>
            <option value="US">Ação Americana</option>
          </select>
        </div>

        <div>
          <label>Ativo: </label>
          <input
            required
            type="text"
            placeholder="Ativo"
            //defaultValue={transaction?.ticker}
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            //{...register("ticker")}
          />
        </div>

        <div>
          <label>Banco ou corretora: </label>
          <input
            required
            type="text"
            placeholder="Banco ou corretora"
            //defaultValue={transaction?.ticker}
            value={broker}
            onChange={(e) => setBroker(e.target.value)}
            //{...register("ticker")}
          />
        </div>

        <div>
          <label>Tipo da Operação: </label>
          <select required value={operationType} onChange={(e) => setOperationType(e.target.value)}>
            <option value="C">Compra</option>
            <option value="V">Venda</option>
            <option value="D">Desdobramento</option>
            <option value="B">Bonificação</option>
          </select>
        </div>

        <div>
          <label>Data da Operação: </label>
          <input
            required
            type="date"
            placeholder="Data da Operação"
            //defaultValue={transaction?.operationDate}
            value={operationDate}
            onChange={(e) => setOperationDate(e.target.value)}
            //{...register("operationDate")}
          />
        </div>

        <div>
          <label>Quantidade: </label>
          <input
            required
            type="number"
            step={market === "US" ? "0.000001" : "1"}
            //defaultValue={transaction?.qty}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            //{...register("qty")}
          />
        </div>

        <div>
          <label>Preço: {market === "US" ? "$" : "R$"} </label>
          <input
            required
            type="number"
            step={market === "US" ? "0.000001" : "0.01"}
            //defaultValue={transaction?.price}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            //{...register("price")}
          />
        </div>

        <div>
          <label>Taxas (Opcional): {market === "US" ? "$" : "R$"} </label>
          <input
            type="number"
            step={market === "US" ? "0.000001" : "0.01"}
            placeholder="Taxas"
            //defaultValue={transaction?.taxes}
            value={taxes}
            onChange={(e) => setTaxes(Number(e.target.value))}
            //{...register("taxes")}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default TransactionForm;
