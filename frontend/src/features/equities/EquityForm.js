import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateEquity, addEquity, selectEquityById } from "./EquitiesSlice";

function EquityForm({ match, history }) {
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
          <label>Bolsa: </label>
          <input
            type="text"
            placeholder="Bolsa"
            defaultValue={equity ? equity.index : ""}
            {...register("index")}
          />
        </div>

        <div>
          <label>Corretora: </label>
          <input
            type="text"
            placeholder="Corretora"
            defaultValue={equity ? equity.broker : ""}
            {...register("broker")}
          />
        </div>

        <div>
          <label>Ticker: </label>
          <input
            type="text"
            placeholder="Ticker"
            defaultValue={equity ? equity.ticker : ""}
            {...register("ticker")}
          />
        </div>

        <div>
          <label>Nome: </label>
          <input
            type="text"
            placeholder="Nome"
            defaultValue={equity ? equity.name : ""}
            {...register("name")}
          />
        </div>

        <div>
          <label>Tipo: </label>
          <input
            type="text"
            placeholder="Tipo"
            defaultValue={equity ? equity.equityType : ""}
            {...register("equityType")}
          />
        </div>

        <div>
          <label>Grupo: </label>
          <input
            type="text"
            placeholder="Grupo"
            defaultValue={equity ? equity.groupName : ""}
            {...register("groupName")}
          />
        </div>

        <div>
          <label>Quantidade: </label>
          <input
            type="text"
            placeholder="Quantidade"
            defaultValue={equity ? equity.qty : ""}
            {...register("qty")}
          />
        </div>

        <div>
          <label>Preço Médio: </label>
          <input
            type="number"
            step="0.01"
            placeholder="Preço Médio"
            defaultValue={equity ? equity.averagePrice : 0}
            {...register("averagePrice")}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EquityForm;
