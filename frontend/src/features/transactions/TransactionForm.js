import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  updateTransaction,
  addTransaction,
  selectTransactionById,
} from "./TransactionsSlice";

function TransactionForm({ match, history }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const id = match.params.id;
  const transaction = useSelector((state) => selectTransactionById(state, id));

  function onSubmit(FormData) {
    if (transaction) {
      dispatch(updateTransaction({ ...FormData, id: transaction.id }));
    } else {
      dispatch(addTransaction(FormData));
    }
    history.push("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Ativo: </label>
          <input
            type="text"
            placeholder="Ativo"
            defaultValue={transaction ? transaction.ticker : ""}
            {...register("ticker")}
          />
        </div>

        <div>
          <label>Tipo da Operação: </label>
          <input
            type="text"
            placeholder="Tipo da Operação"
            defaultValue={transaction ? transaction.operationType : ""}
            {...register("operationType")}
          />
        </div>

        <div>
          <label>Data da Operação: </label>
          <input
            type="date"
            placeholder="Data da Operação"
            defaultValue={transaction ? transaction.operationDate : ""}
            {...register("operationDate")}
          />
        </div>

        <div>
          <label>Quantidade: </label>
          <input
            type="number"
            step="0.000001"
            placeholder="Quantidade"
            defaultValue={transaction ? transaction.qty : 0}
            {...register("qty")}
          />
        </div>

        <div>
          <label>Preço: </label>
          <input
            type="number"
            step="0.01"
            placeholder="Preço"
            defaultValue={transaction ? transaction.price : 0}
            {...register("price")}
          />
        </div>

        <div>
          <label>Taxas (Opcional): </label>
          <input
            type="text"
            placeholder="Taxas"
            defaultValue={transaction ? transaction.taxes : 0}
            {...register("taxes")}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default TransactionForm;
