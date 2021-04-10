import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTransactions,
  deleteTransaction,
  selectAllTransactions,
  selectTotalTransactions,
} from "../transactionsSlice";

function TransactionsList() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactions);
  const status = useSelector((state) => state.transactions.status);
  const error = useSelector((state) => state.transactions.error);
  const count = useSelector(selectTotalTransactions);

  useEffect(() => {
    if (status === "idle" || status === "saved" || status === "deleted") {
      dispatch(getTransactions());
    }
  }, [status, dispatch]);

  function handleDeleteTransaction(id) {
    dispatch(deleteTransaction(id));
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
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
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  <Link to={`/edit/${transaction.id}`}>
                    {transaction.description}
                  </Link>
                </td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                  >
                    Delete {transaction.id}
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
