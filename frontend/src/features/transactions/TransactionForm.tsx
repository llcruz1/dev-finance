import React from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  updateTransaction,
  addTransaction,
  getTransactionById,
  selectTransactionById,
} from "./transactionsSlice";
import { yupResolver } from "@hookform/resolvers/yup";
//import { transactionSchema } from "./transactionSchema";
import * as yup from "yup";
import { TransactionFormInput } from "../../types/transaction";

function TransactionForm() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const transaction = useAppSelector((state) => selectTransactionById(state, id));
  const status = useAppSelector((state) => state.transactions.status);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  const today = new Date();
  const mindate = "1900-01-01T00:00:00.000Z";

  const transactionSchema = yup.object().shape({
    ticker: yup.string().required("Campo Obrigatório"),
    market: yup.string().required("Campo Obrigatório"),
    broker: yup.string().required("Campo Obrigatório"),
    operationType: yup.string().required("Campo Obrigatório"),
    operationDate: yup
      .date()
      .min(mindate, ({ min }) => `O campo deve ser posterior a ${formatDate(mindate)}`)
      .max(today, ({ max }) => `O campo deve ser igual ou anterior ao dia de hoje`)
      .typeError("Campo obrigatório")
      .required("Campo Obrigatório"),
    qty: yup.number().positive().typeError("Campo Obrigatório").required("Campo Obrigatório"),
    price: yup.number().positive().typeError("Campo Obrigatório").required("Campo Obrigatório"),
    taxes: yup.number().typeError(" "),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormInput>({
    resolver: yupResolver(transactionSchema),
  });

  const [transactionOnLoad, setTransactionOnLoad] = useState(
    id ? transaction ?? transactionSchema.cast({}) : transactionSchema.cast({}),
  );

  const [market, setMarket] = useState<string>("BR");

  useEffect(() => {
    if (status === "idle" && id) {
      dispatch(getTransactionById(id));
    }
  }, [dispatch, status, id]);

  useEffect(() => {
    if (transaction && status === "refreshed") {
      setTransactionOnLoad(transaction);
    }
  }, [transaction, status]);

  function onSubmit(data: TransactionFormInput) {
    if (transaction) {
      dispatch(updateTransaction({ ...data, id: transaction.id }));
    } else {
      dispatch(addTransaction(data));
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Tipo de ação: </label>
          <select
            required
            defaultValue={transactionOnLoad.market}
            {...register("market")}
            onChange={(e) => setMarket(e.target.value)}
          >
            <option value="BR">Ação Brasileira</option>
            <option value="US">Ação Americana</option>
          </select>
        </div>
        <p>{errors.market?.message}</p>

        <div>
          <label>Ativo: </label>
          <input
            {...register("ticker")}
            type="text"
            placeholder="Ativo"
            defaultValue={transactionOnLoad.ticker}
          />
        </div>
        <p>{errors.ticker?.message}</p>

        <div>
          <label>Banco ou corretora: </label>
          <input
            {...register("broker")}
            type="text"
            placeholder="Banco ou corretora"
            defaultValue={transactionOnLoad.broker}
          />
        </div>
        <p>{errors.broker?.message}</p>

        <div>
          <label>Tipo da Operação: </label>
          <select
            {...register("operationType")}
            placeholder="Tipo de Operação"
            defaultValue={transactionOnLoad.operationType}
          >
            <option value="C">Compra</option>
            <option value="V">Venda</option>
            <option value="D">Desdobramento</option>
            <option value="B">Bonificação</option>
          </select>
        </div>
        <p>{errors.operationType?.message}</p>

        <div>
          <label>Data da Operação: </label>
          <input
            {...register("operationDate")}
            type="date"
            placeholder="Data da Operação"
            defaultValue={transactionOnLoad.operationDate}
          />
        </div>
        <p>{errors.operationDate?.message}</p>

        <div>
          <label>Quantidade: </label>
          <input
            {...register("qty")}
            type="number"
            placeholder={market === "US" ? "0.000000" : "0"}
            step={market === "US" ? "0.000001" : "1"}
            defaultValue={transactionOnLoad.qty}
          />
        </div>
        <p>{errors.qty?.message}</p>

        <div>
          <label>Preço: {market === "US" ? "$" : "R$"} </label>
          <input
            {...register("price")}
            type="number"
            placeholder={market === "US" ? "0.000000" : "0.00"}
            step={market === "US" ? "0.000001" : "0.01"}
            defaultValue={transactionOnLoad.price}
          />
        </div>
        <p>{errors.price?.message}</p>

        <div>
          <label>Taxas (Opcional): {market === "US" ? "$" : "R$"} </label>
          <input
            {...register("taxes")}
            type="number"
            placeholder={market === "US" ? "0.000000" : "0.00"}
            step={market === "US" ? "0.000001" : "0.01"}
            defaultValue={transactionOnLoad.taxes}
          />
        </div>
        <p>{errors.taxes?.message}</p>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default TransactionForm;
