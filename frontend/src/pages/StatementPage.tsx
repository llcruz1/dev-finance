import { Link, useParams } from "react-router-dom";
import TransactionsList from "../features/transactions/TransactionsList";

function StatementPage() {
  const { ticker } = useParams<{ ticker: string }>();

  return (
    <div>
      <div>
        <Link to="/">Voltar</Link>
      </div>
      <h1>Extrato</h1>
      <TransactionsList ticker={ticker} />
    </div>
  );
}

export default StatementPage;
