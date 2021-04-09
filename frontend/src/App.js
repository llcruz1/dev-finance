import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/add" component={FormPage} />
        <Route exact path="/edit/:id" component={FormPage} />
      </Router>
    </>
  );
}

export default App;
