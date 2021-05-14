import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import EquityForm from "../features/equities/EquityForm";
import TransactionsList from "../features/transactions/TransactionsList";
import TransactionForm from "../features/transactions/TransactionForm";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />

        <Route exact path="/addEquity" component={EquityForm} />
        <Route exact path="/editEquity/:id" component={EquityForm} />

        <Route exact path="/transactionsList" component={TransactionsList} />
        <Route exact path="/addTransaction" component={TransactionForm} />
        <Route exact path="/editTransaction/:id" component={TransactionForm} />
      </Router>
    </>
  );
}

export default App;
