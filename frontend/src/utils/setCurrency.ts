export default function setCurrency(market: string) {
  if (market === "BR") {
    return "R$";
  } else {
    return "$";
  }
}
