import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTransactions,
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
    dispatch(getTransactions());
  }, [dispatch]);

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
          <span>Loading...</span>
        ) : status === "failed" ? (
          <span>{error}</span>
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
                  <button>Delete</button>
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
