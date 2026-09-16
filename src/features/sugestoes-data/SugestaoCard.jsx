import { Card } from "../../components/Card";
import { StatusPill } from "../../components/StatusPill";
import { Button } from "../../components/Button";
import { formatarData } from "../../utils/formatarData";

export function SugestaoCard({ nome, cidade, tipoEvento, resultados, melhorData, onRemover }) {
  return (
    <Card>
      <div className="card-top">
        <h3>{nome || `${cidade} — ${tipoEvento}`}</h3>
        {melhorData && <span className="selo selo-favoravel">melhor: {formatarData(melhorData)}</span>}
      </div>

      <p className="meta">
        {cidade} · {tipoEvento}
      </p>

      <ul className="lista-resultados">
        {resultados.map((r) => (
          <li key={r.data}>
            <span className="num">{formatarData(r.data)}</span>: <StatusPill classificacao={r.classificacao} />
            {r.chance_chuva !== null ? ` (${r.chance_chuva}% de chuva)` : ""}
          </li>
        ))}
      </ul>

      {onRemover && (
        <div className="card-acoes">
          <Button variant="danger" onClick={onRemover}>
            Remover
          </Button>
        </div>
      )}
    </Card>
  );
}
