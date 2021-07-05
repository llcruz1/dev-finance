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
    <div>
      <div>
        <Link to="/login">Logout</Link>
      </div>
      <br />
      <button>
        <Link to={"/adicionar-transacao"}>Nova Transação</Link>
      </button>

      <button>
        <Link to={"/extrato"}>Extrato</Link>
      </button>
      <br />
      <br />

      <h1>Meus Ativos</h1>

      {count > 0 && (
        <select name="wallet" value={filteredMarket} onChange={handleFilteredMarket}>
          {unique(equities).map((market) => (
            <option key={market} value={market}>
              {formatMarket(market)}
            </option>
          ))}
        </select>
      )}
      <br />
      <br />
      <EquitiesList market={filteredMarket} />
    </div>
  );
}

export default HomePage;
