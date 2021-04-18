import React from "react";
import { Link } from "react-router-dom";
import TransactionsList from "../components/TransactionsList";
import StockList from "../components/StockList";

function HomePage() {
  return (
    <div>
      <Link to="/login">Logout</Link>
      <TransactionsList />
      <StockList />
    </div>
  );
}

export default HomePage;
