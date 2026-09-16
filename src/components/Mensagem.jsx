export function Mensagem({ tipo = "info", children }) {
  return <p className={`mensagem mensagem-${tipo}`}>{children}</p>;
}
