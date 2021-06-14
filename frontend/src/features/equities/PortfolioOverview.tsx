import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
import { getEquities, selectAllEquities } from "./equitiesSlice";
import { Equity } from "../../types/equity";

function PortfolioOverview() {
  const dispatch = useAppDispatch();
  const equities = useAppSelector(selectAllEquities);
  const status = useAppSelector((state) => state.equities.status);
  const error = useAppSelector((state) => state.equities.error);

  useEffect(() => {
    if (!equities) {
      dispatch(getEquities());
    }
  }, [dispatch, equities]);

  return (
    <div>
      {status === "loading" ? (
        <div>Carregando...</div>
      ) : status === "failed" ? (
        <div>{error}</div>
      ) : (
        <div>
          <h1>Visão Geral</h1>

          <table>
            <tr>
              <th>Rentabilidade Geral:</th>
              <td>teste</td>
            </tr>
            <tr>
              <th>Lucro Total:</th>
              <td>teste</td>
            </tr>
          </table>
        </div>
      )}
    </div>
  );
}

export default PortfolioOverview;
