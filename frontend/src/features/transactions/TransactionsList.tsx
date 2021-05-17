import React, { useState, useEffect, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getTransactions, deleteTransaction, selectAllTransactions } from "./transactionsSlice";
import { selectAllEquities } from "../equities/equitiesSlice";

interface Transaction {
  id: string;
  ticker: string;
  operationType: string;
  operationDate: string;
  qty: number;
  price: number;
  taxes: number;
}

function TransactionsList() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { ticker } = useParams<{ ticker: string }>();

  const transactions = useAppSelector(selectAllTransactions);
  const equities = useAppSelector(selectAllEquities);

  const status = useAppSelector((state) => state.transactions.status);
  const error = useAppSelector((state) => state.transactions.error);

  const [filteredEquityTicker, setFilteredEquityTicker] = useState<string>(ticker ? ticker : "-");
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Fetch transactions
    if (status === "idle" || status === "saved" || status === "deleted") {
      dispatch(getTransactions());
    }
  }, [status, dispatch]);

  useEffect(() => {
    // Filter transactions
    if (filteredEquityTicker === "-") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter((transaction) => transaction.ticker === filteredEquityTicker),
      );
    }
  }, [filteredEquityTicker, transactions]);

  function handleDeleteTransaction(id: string) {
    dispatch(deleteTransaction(id));
    history.push("/");
  }

  function handleFilteredEquityTicker(e: ChangeEvent<HTMLSelectElement>) {
    setFilteredEquityTicker(e.target.value);
  }

  return (
    <div>
      <div>
        <Link to="/">Voltar</Link>
      </div>
      <h1>Extrato</h1>
      <button>
        <Link to={"/addTransaction"}>Nova Transação</Link>
      </button>
      <br />
      <br />

      <select
        name="transactions"
        value={filteredEquityTicker}
        onChange={handleFilteredEquityTicker}
      >
        <option value={"-"}>Todos os Ativos</option>
        {equities.map((equity) => (
          <option key={equity.id} value={equity.ticker}>
            {equity.ticker}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Data da Operação</th>
            <th>Ativo</th>
            <th>Tipo da Operação</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Taxas</th>
            <th></th>
            <th>Total: {filteredTransactions.length} transactions</th>
          </tr>
        </thead>
        {status === "loading" ? (
          <tbody>
            <tr>
              <td>Loading...</td>
            </tr>
          </tbody>
        ) : status === "failed" ? (
          <tbody>
            <tr>
              <td>{error}</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.operationDate}</td>
                <td>{transaction.ticker}</td>
                <td>{transaction.operationType}</td>
                <td>{transaction.qty}</td>
                <td>{transaction.price}</td>
                <td>{transaction.taxes}</td>
                <td>
                  <Link to={`/editTransaction/${transaction.id}`}>
                    <button>Editar</button>
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDeleteTransaction(transaction.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default TransactionsList;
