export function StatusPill({ classificacao }) {
  return <span className={`selo selo-${classificacao}`}>{classificacao}</span>;
}
