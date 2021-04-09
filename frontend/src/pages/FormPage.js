import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateTransaction, selectTransactionById } from "../transactionsSlice";

function FormPage({ match, history }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const id = match.params.id;
  const transaction = useSelector((state) => selectTransactionById(state, id));

  function onSubmit(data) {
    dispatch(updateTransaction({ ...data, id: transaction.id }));
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
            defaultValue={transaction.description}
            {...register("description")}
          />
        </div>

        <div>
          <label>Amount: </label>
          <input
            type="number"
            placeholder="Amount"
            defaultValue={transaction.amount}
            {...register("amount")}
          />
        </div>

        <div>
          <label>Date: </label>
          <input
            type="text"
            placeholder="Date"
            defaultValue={transaction.date}
            {...register("date")}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default FormPage;
