import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
import { getEquities, selectAllEquities } from "./equitiesSlice";
import { Equity } from "../../types/equity";
import setCurrency from "../../utils/setCurrency";
import calculateTotalProfitAsCurrency from "../../utils/calculateTotalProfitAsCurrency";
import calculateTotalProfitAsPercentage from "../../utils/calculateTotalProfitAsPercentage";

interface Props {
  market: string;
}

function EquitiesList({ market }: Props) {
  const dispatch = useAppDispatch();
  const equities = useAppSelector(selectAllEquities);
  const status = useAppSelector((state) => state.equities.status);
  const error = useAppSelector((state) => state.equities.error);
  const statusTransactions = useAppSelector((state) => state.transactions.status);
  const [filteredEquities, setFilteredEquities] = useState<Equity[]>([]);
  const [totalProfitAsCurrency, setTotalProfitAsCurrency] = useState<string>("0");
  const [totalProfitAsPercentage, setTotalProfitAsPercentage] = useState<string>("0");

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
    setFilteredEquities(equities.filter((equity) => equity.market === market));
  }, [market, equities]);

  useEffect(() => {
    setTotalProfitAsCurrency(
      setCurrency(market) + " " + String(calculateTotalProfitAsCurrency(filteredEquities)),
    );
    setTotalProfitAsPercentage(String(calculateTotalProfitAsPercentage(filteredEquities)));
  }, [filteredEquities, market]);

  return (
    <div>
      <table>
        <tr>
          <th>Total:</th>
          <td>
            {filteredEquities.length} {filteredEquities.length === 1 ? "ativo" : "ativos"}
          </td>
          <th>Rentabilidade: </th>
          <td>{totalProfitAsPercentage}%</td>
          <th>Lucro:</th>
          <td>{totalProfitAsCurrency}</td>
        </tr>
      </table>

      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Quantidade</th>
            <th>Total Investido</th>
            <th>Preço Médio</th>
            <th>Preço Atual</th>
            <th>Total Atual</th>
            <th>Lucro</th>
            <th>Rentabilidade</th>
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
                <td>{equity.totalInvestedAsCurrencyString}</td>
                <td>{equity.averagePriceAsCurrencyString}</td>
                <td>{equity.currentPriceAsCurrencyString}</td>
                <td>{equity.currentTotalAsCurrencyString}</td>
                <td>{equity.profitAsCurrencyString}</td>
                <td>{equity.profitAsPercentage}%</td>
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
