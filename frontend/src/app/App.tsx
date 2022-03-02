import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import StatementPage from "../pages/StatementPage";
import TransactionForm from "../features/transactions/TransactionForm";

function App() {
  return (
    <div className="flex bg-gray-100">
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/extrato/:ticker?" component={StatementPage} />
        <Route path="/adicionar-transacao" component={TransactionForm} />
        <Route path="/editar-transacao/:id" component={TransactionForm} />
      </Router>
    </div>
  );
}

export default App;
