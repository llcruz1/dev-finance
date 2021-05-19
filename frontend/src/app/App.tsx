import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import StatementPage from "../pages/StatementPage";
import EquityForm from "../features/equities/EquityForm";
import TransactionsList from "../features/transactions/TransactionsList";
import TransactionForm from "../features/transactions/TransactionForm";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />

        <Route path="/adicionar-ativo" component={EquityForm} />
        <Route path="/editar-ativo/:id" component={EquityForm} />

        <Route path="/extrato/:ticker?" component={StatementPage} />

        <Route path="/adicionar-transacao" component={TransactionForm} />
        <Route path="/editar-transacao/:id" component={TransactionForm} />
      </Router>
    </>
  );
}

export default App;
