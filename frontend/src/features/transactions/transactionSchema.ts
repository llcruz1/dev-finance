import * as yup from "yup";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

const today = new Date();
const mindate = "1899-01-01T00:00:00.000Z";

export const transactionSchema = yup.object().shape({
  ticker: yup.string().required(),
  market: yup.string().default("BR").required(),
  broker: yup.string().required(),
  operationType: yup.string().default("C").required(),
  operationDate: yup
    .date()
    .min(mindate, ({ min }) => `O campo deve ser posterior a ${formatDate(mindate)}`)
    .max(today, ({ max }) => `O campo deve ser igual ou anterior ao dia de hoje.`)
    .typeError("O campo é obrigatório.")
    .required(),
  qty: yup.number().positive().default(0).required(),
  price: yup.number().positive().default(0).required(),
  taxes: yup.number().default(0),
});
