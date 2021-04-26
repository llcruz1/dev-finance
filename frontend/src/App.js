import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import EquityFormPage from "./pages/EquityFormPage";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/add" component={EquityFormPage} />
        <Route exact path="/edit/:id" component={EquityFormPage} />
      </Router>
    </>
  );
}

export default App;
