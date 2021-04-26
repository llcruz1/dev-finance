import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateEquity, addEquity, selectEquityById } from "../equitiesSlice";

function FormPage({ match, history }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const id = match.params.id;
  const equity = useSelector((state) => selectEquityById(state, id));

  function onSubmit(FormData) {
    if (equity) {
      dispatch(updateEquity({ ...FormData, id: equity.id }));
    } else {
      dispatch(addEquity(FormData));
    }
    history.push("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            placeholder="Name"
            defaultValue={equity ? equity.name : ""}
            {...register("name")}
          />
        </div>

        <div>
          <label>Average Price: </label>
          <input
            type="number"
            step="0.01"
            placeholder="Average Price"
            defaultValue={equity ? equity.averagePrice : 0}
            {...register("averagePrice")}
          />
        </div>

        <div>
          <label>Operation Date: </label>
          <input
            type="date"
            placeholder="Operation Date"
            defaultValue={equity ? equity.operationDate.substring(0, 10) : ""}
            {...register("operationDate")}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default FormPage;
