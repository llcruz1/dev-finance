import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
import { getEquities, deleteEquity, selectAllEquities, selectTotalEquities } from "./equitiesSlice";

function EquitiesList() {
  const dispatch = useAppDispatch();
  const equities = useAppSelector(selectAllEquities);
  const status = useAppSelector((state) => state.equities.status);
  const error = useAppSelector((state) => state.equities.error);
  const count = useAppSelector(selectTotalEquities);

  const statusTransactions = useAppSelector((state) => state.transactions.status);

  useEffect(() => {
    if (status === "idle" || status === "saved" || status === "deleted") {
      dispatch(getEquities());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (
      statusTransactions === "saved" ||
      statusTransactions === "deleted" ||
      statusTransactions === "refreshed"
    ) {
      dispatch(getEquities());
    }
  }, [statusTransactions, dispatch]);

  /*function handleDeleteEquity(id: string) {
    dispatch(deleteEquity(id));
  }*/

  return (
    <div>
      <h1>Meus Ativos</h1>

      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Preço Médio</th>
            <th>Preço Atual</th>
            <th>Rentabilidade</th>
            <th>Total: {count} ativos</th>
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
            {equities.map((equity, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/extrato/${equity.ticker}`}>{equity.ticker}</Link>
                </td>
                <td>{equity.equityType}</td>
                <td>{equity.qty}</td>
                <td>{equity.averagePrice}</td>
                <td>{equity.currentPrice}</td>
                <td>
                  {(
                    ((equity.currentPrice - equity.averagePrice) / equity.currentPrice) *
                    100
                  ).toFixed(2)}{" "}
                  %
                </td>
                <td>{/*<button onClick={() => handleDeleteEquity(equity.id)}>Delete</button>*/}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default EquitiesList;
