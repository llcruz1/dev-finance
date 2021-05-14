import React from "react";
import { Link } from "react-router-dom";
import EquitiesList from "../features/equities/EquitiesList";

function HomePage() {
  return (
    <div>
      <div>
        <Link to="/login">Logout</Link>
      </div>
      <br />
      <button>
        <Link to={"/addTransaction"}>Nova Transação</Link>
      </button>

      <button>
        <Link to={"/TransactionsList"}>Extrato</Link>
      </button>

      <EquitiesList />
    </div>
  );
}

export default HomePage;