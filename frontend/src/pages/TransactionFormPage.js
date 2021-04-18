import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  updateTransaction,
  addTransaction,
  selectTransactionById,
} from "../transactionsSlice";

function FormPage({ match, history }) {
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
          <label>Description: </label>
          <input
            type="text"
            placeholder="Description"
            defaultValue={transaction ? transaction.description : ""}
            {...register("description")}
          />
        </div>

        <div>
          <label>Amount: </label>
          <input
            type="number"
            placeholder="Amount"
            defaultValue={transaction ? transaction.amount : 0}
            {...register("amount")}
          />
        </div>

        <div>
          <label>Date: </label>
          <input
            type="date"
            placeholder="Date"
            defaultValue={transaction ? transaction.date.substring(0, 10) : ""}
            {...register("date")}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default FormPage;
