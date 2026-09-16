import { Spinner } from "./Spinner";

export function Mensagem({ tipo = "info", children }) {
  return (
    <p className={`mensagem mensagem-${tipo}`}>
      {tipo === "info" && <Spinner />}
      {children}
    </p>
  );
}
