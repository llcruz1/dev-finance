import React from "react";
import { Link } from "react-router-dom";
import EquitiesList from "../components/EquitiesList";

function HomePage() {
  return (
    <div>
      <Link to="/login">Logout</Link>
      <EquitiesList />
    </div>
  );
}

export default HomePage;
