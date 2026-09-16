export function StatsBar({ itens }) {
  return (
    <div className="stats-bar">
      {itens.map((item) => (
        <div key={item.label} className={`stat-tile ${item.tone ? `stat-tile-${item.tone}` : ""}`.trim()}>
          <span className="stat-valor">{item.valor}</span>
          <span className="stat-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
