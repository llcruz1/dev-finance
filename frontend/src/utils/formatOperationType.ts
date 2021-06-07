export default function formatOperationType(operationType: string) {
  switch (operationType) {
    case "C":
      return "Compra";
    case "V":
      return "Venda";
    case "B":
      return "Bonificação";
    case "D":
      return "Desdobramento";
  }
}
