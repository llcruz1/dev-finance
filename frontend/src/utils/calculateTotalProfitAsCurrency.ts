import { Equity } from "../types/equity";

export default function calculateTotalProfitAsCurrency(equities: Equity[]) {
  var totalProfit = 0;
  equities.map((equity) => (totalProfit += equity.profitAsCurrency));
  return Number(totalProfit.toFixed(2));
}
