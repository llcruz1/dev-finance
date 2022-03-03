import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  getEquities,
  selectAllEquities,
  selectTotalEquities,
} from "../features/equities/equitiesSlice";
import EquitiesList from "../features/equities/EquitiesList";
import { Equity } from "../types/equity";

function HomePage() {
  const dispatch = useAppDispatch();
  const equities = useAppSelector(selectAllEquities);
  const count = useAppSelector(selectTotalEquities);
  const [filteredMarket, setFilteredMarket] = useState<string>("BR");

  useEffect(() => {
    if (!equities) {
      dispatch(getEquities());
    }
  }, [dispatch, equities]);

  function handleFilteredMarket(e: ChangeEvent<HTMLSelectElement>) {
    setFilteredMarket(e.target.value);
  }

  function formatMarket(market: string) {
    switch (market) {
      case "BR":
        return "Ativos Brasileiros";
      case "US":
        return "Ativos Americanos";
    }
  }

  const unique = (list: Equity[]) => {
    const object = list.reduce(
      (acc, item) => ({
        ...acc,
        [item["market"]]: true,
      }),
      {},
    );
    return Object.keys(object);
  };

  return (
    <div className="space-y-4">
      <div>
        <Link to="/login">Logout</Link>
      </div>

      <div className="space-x-2">
        <Link to={"/adicionar-transacao"}>
          <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
            <p className="text-sm font-medium leading-none text-white">Nova Transação</p>
          </button>
        </Link>

        <Link to={"/extrato"}>
          <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
            <p className="text-sm font-medium leading-none text-white">Extrato</p>
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800">Meus Ativos</h1>

      {count > 0 && (
        <select
          name="wallet"
          value={filteredMarket}
          onChange={handleFilteredMarket}
          className="form-select
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding bg-no-repeat
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
          {unique(equities).map((market) => (
            <option key={market} value={market}>
              {formatMarket(market)}
            </option>
          ))}
        </select>
      )}
      <EquitiesList market={filteredMarket} />
    </div>
  );
}

export default HomePage;
