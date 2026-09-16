export function Spinner({ tamanho = 16 }) {
  return (
    <span
      className="spinner"
      style={{ width: tamanho, height: tamanho }}
      role="status"
      aria-label="Carregando"
    />
  );
}
