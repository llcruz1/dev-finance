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
        <Route path="/login" component={LoginPage} />

        <Route path="/addEquity" component={EquityForm} />
        <Route path="/editEquity/:id" component={EquityForm} />

        <Route path="/transactionsList" component={TransactionsList} />
        <Route path="/transactionsList/:ticker" component={TransactionsList} />
        <Route path="/addTransaction" component={TransactionForm} />
        <Route path="/editTransaction/:id" component={TransactionForm} />
      </Router>
    </>
  );
}

export default App;
