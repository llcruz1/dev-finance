import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TransactionFormPage from "./pages/TransactionFormPage";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/add" component={TransactionFormPage} />
        <Route exact path="/edit/:id" component={TransactionFormPage} />
      </Router>
    </>
  );
}

export default App;
