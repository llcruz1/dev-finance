import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
import { getEquities, selectAllEquities, selectTotalEquities } from "./equitiesSlice";

interface Equity {
  id: string;
  averagePrice: number;
  currentPrice: number;
  profit: number;
  groupName: string;
  market: string;
  broker: string;
  name: string;
  qty: number;
  ticker: string;
}

interface Props {
  market?: string;
}

function EquitiesList({ market }: Props) {
  const dispatch = useAppDispatch();
  const equities = useAppSelector(selectAllEquities);
  const status = useAppSelector((state) => state.equities.status);
  const error = useAppSelector((state) => state.equities.error);
  const count = useAppSelector(selectTotalEquities);

  const statusTransactions = useAppSelector((state) => state.transactions.status);

  console.log(market);
  const [filteredEquities, setFilteredEquities] = useState<Equity[]>([]);

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

  useEffect(() => {
    // Filter transactions
    if (market === "-") {
      setFilteredEquities(equities);
    } else {
      setFilteredEquities(equities.filter((equity) => equity.market === market));
    }
  }, [market, equities]);

  return (
    <div>
      <h1>Meus Ativos</h1>

      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Quantidade</th>
            <th>Preço Médio</th>
            <th>Preço Atual</th>
            <th>Rentabilidade</th>
            <th>
              Total: {count} {count === 1 ? "ativo" : "ativos"}
            </th>
          </tr>
        </thead>
        {status === "loading" ? (
          <tbody>
            <tr>
              <td>Carregando...</td>
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
            {filteredEquities.map((equity, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/extrato/${equity.ticker}`}>{equity.ticker}</Link>
                </td>
                <td>{equity.qty}</td>
                <td>{equity.averagePrice}</td>
                <td>{equity.currentPrice}</td>
                <td>{equity.profit}%</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default EquitiesList;
