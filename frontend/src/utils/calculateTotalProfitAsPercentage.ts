import { Equity } from "../types/equity";

export default function calculateTotalProfitAsPercentage(equities: Equity[]) {
  var sumOfPercentages = 0;
  var totalProfitAsPercentage = 0;

  equities.map((equity) => (sumOfPercentages += equity.profitAsPercentage));

  if (equities.length !== 0) {
    totalProfitAsPercentage = sumOfPercentages / equities.length;
  }

  return Number(totalProfitAsPercentage.toFixed(2));
}
