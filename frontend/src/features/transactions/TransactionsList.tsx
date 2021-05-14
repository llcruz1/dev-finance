import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getTransactions,
  deleteTransaction,
  selectAllTransactions,
  selectTotalTransactions,
} from "./TransactionsSlice";

function TransactionsList() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const transactions = useAppSelector(selectAllTransactions);
  const status = useAppSelector((state) => state.transactions.status);
  const error = useAppSelector((state) => state.transactions.error);
  const count = useAppSelector(selectTotalTransactions);

  useEffect(() => {
    if (status === "idle" || status === "saved" || status === "deleted") {
      dispatch(getTransactions());
    }
  }, [status, dispatch]);

  function handleDeleteTransaction(id: string) {
    dispatch(deleteTransaction(id));
    history.push("/");
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
      <table>
        <thead>
          <tr>
            <th>Data da Operação</th>
            <th>Ativo</th>
            <th>Tipo da Operação</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Taxas</th>
            <th>Total: {count} transactions</th>
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
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.operationDate}</td>
                <td>{transaction.ticker}</td>
                <td>{transaction.operationType}</td>
                <td>{transaction.qty}</td>
                <td>{transaction.price}</td>
                <td>{transaction.taxes}</td>
                <td>
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                  >
                    Delete
                  </button>
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
