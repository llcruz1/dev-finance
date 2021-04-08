import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTransactions,
  selectAllTransactions,
  selectTotalTransactions,
} from "../transactionsSlice";
import axios from "axios";

function TransactionsList() {
  const dispatch = useDispatch();
  //const transactions = useSelector(selectAllTransactions);
  const count = useSelector(selectTotalTransactions);

  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    //dispatch(getTransactions());
    async function fetchTransactions() {
      const { data } = await axios.get("/transactions");
      setTransaction(data);
    }
    fetchTransactions();
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;
