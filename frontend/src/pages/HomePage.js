import React from "react";
import { Link } from "react-router-dom";
import TransactionsList from "../components/TransactionsList";

function HomePage() {
  return (
    <div>
      <button>
        <Link to={"/add"}>Add Transaction</Link>
      </button>
      <TransactionsList />
    </div>
  );
}

export default HomePage;
