import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
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
      <div className="max-w-sm rounded overflow-hidden shadow-lg ">
        <div className="px-6 py-4">
          <ul>
            <li>
              <span className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total:{" "}
              </span>
              <span className="text-gray-900 whitespace-no-wrap">
                {filteredEquities.length} {filteredEquities.length === 1 ? "ativo" : "ativos"}
              </span>
            </li>
            <li>
              <span className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Lucro:{" "}
              </span>
              <span>{totalProfitAsCurrency}</span>
            </li>
            <li>
              <span className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rentabilidade:{" "}
              </span>
              <span>{totalProfitAsPercentage}%</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ticker
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quantidade
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Investido
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Preço Médio
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Preço Atual
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Atual
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Lucro
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rentabilidade
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
                  <tr
                    key={index}
                    className="hover:bg-gray-200"
                    onClick={() => history.push(`/extrato/${equity.ticker}`)}
                  >
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{equity.ticker}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{equity.qty}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {equity.totalInvestedAsCurrencyString}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {equity.averagePriceAsCurrencyString}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {equity.currentPriceAsCurrencyString}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {equity.currentTotalAsCurrencyString}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {equity.profitAsCurrencyString}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {equity.profitAsPercentage}%
                      </p>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default EquitiesList;
