import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useParams, useHistory } from "react-router-dom";
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
  const [operationType, setOperationType] = useState<string>("");
  const [operationDate, setOperationDate] = useState<string>("");
  const [qty, setQty] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [taxes, setTaxes] = useState<number>(0);

  useEffect(() => {
    if (transaction) {
      setTicker(transaction.ticker);
      setOperationType(transaction.operationType);
      setOperationDate(transaction.operationDate);
      setQty(transaction.qty);
      setPrice(transaction.price);
      setTaxes(transaction.taxes);
    }
  }, [transaction]);

  useEffect(() => {
    if (status === "idle") {
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
          <label>Tipo da Operação: </label>
          <input
            required
            type="text"
            placeholder="Tipo da Operação"
            //defaultValue={transaction?.operationType}
            value={operationType}
            onChange={(e) => setOperationType(e.target.value)}
            //{...register("operationType")}
          />
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
            step="0.000001"
            placeholder="Quantidade"
            //defaultValue={transaction?.qty}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            //{...register("qty")}
          />
        </div>

        <div>
          <label>Preço: </label>
          <input
            required
            type="number"
            step="0.01"
            placeholder="Preço"
            //defaultValue={transaction?.price}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            //{...register("price")}
          />
        </div>

        <div>
          <label>Taxas (Opcional): </label>
          <input
            type="number"
            step="0.01"
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
