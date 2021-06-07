import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import EquitiesList from "../features/equities/EquitiesList";
import { selectAllEquities } from "../features/equities/equitiesSlice";
import { useAppSelector } from "../app/hooks";
import { Equity } from "../types/equity";

function HomePage() {
  const equities = useAppSelector(selectAllEquities);
  const [filteredMarket, setFilteredMarket] = useState<string>("-");

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

      <select name="wallet" value={filteredMarket} onChange={handleFilteredMarket}>
        <option value={"-"}>Todos os ativos</option>
        {unique(equities).map((market) => (
          <option key={market} value={market}>
            {formatMarket(market)}
          </option>
        ))}
      </select>

      <EquitiesList market={filteredMarket} />
    </div>
  );
}

export default HomePage;
