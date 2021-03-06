import React, { useState, useEffect, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getTransactions, deleteTransaction, selectAllTransactions } from "./transactionsSlice";
import { getEquities, selectAllEquities } from "../equities/equitiesSlice";
import { Transaction } from "../../types/transaction";

interface Props {
  ticker?: string;
}

function TransactionsList({ ticker }: Props) {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const transactions = useAppSelector(selectAllTransactions);
  const status = useAppSelector((state) => state.transactions.status);
  const error = useAppSelector((state) => state.transactions.error);

  const equities = useAppSelector(selectAllEquities);
  const statusEquities = useAppSelector((state) => state.equities.status);

  const [filteredEquityTicker, setFilteredEquityTicker] = useState<string>(ticker ? ticker : "-");
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Fetch transactions
    if (status === "idle" || status === "saved" || status === "deleted" || status === "refreshed") {
      dispatch(getTransactions());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (statusEquities === "idle") {
      dispatch(getEquities());
    }
  });

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
            <th>Data da Opera????o</th>
            <th>Ativo</th>
            <th>Tipo da Opera????o</th>
            <th>Quantidade</th>
            <th>Pre??o</th>
            <th>Taxas</th>
            <th></th>
            <th>
              Total: {filteredTransactions.length}{" "}
              {filteredTransactions.length === 1 ? "transa????o" : "transa????es"}
            </th>
          </tr>
        </thead>
        {status === "loading" ? (
          <tbody>
            <tr>
              <td>Carregando...</td>
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
                <td>{transaction.formattedOperationDate}</td>
                <td>{transaction.ticker}</td>
                <td>{transaction.formattedOperationType}</td>
                <td>{transaction.qty}</td>
                <td>{transaction.priceAsCurrencyString}</td>
                <td>{transaction.taxesAsCurrencyString}</td>
                <td>
                  <Link to={`/editar-transacao/${transaction.id}`}>
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
