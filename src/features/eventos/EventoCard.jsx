import { Card } from "../../components/Card";
import { StatusPill } from "../../components/StatusPill";
import { WeatherIcon } from "../../components/WeatherIcon";
import { ClockIcon } from "../../components/icons";
import { Button } from "../../components/Button";
import { formatarData } from "../../utils/formatarData";

export function EventoCard({
  nome,
  tipoEvento,
  cidade,
  data,
  hora,
  classificacao,
  recomendacao,
  melhorHorario,
  tipoReconhecido,
  emRisco,
  onRemover,
}) {
  return (
    <Card icon={<WeatherIcon classificacao={classificacao} />} className={classificacao}>
      <div className="card-top">
        <h3>{nome}</h3>
        <StatusPill classificacao={classificacao} />
      </div>

      <p className="meta">
        {tipoEvento ? `${tipoEvento} · ` : ""}
        {cidade} · <span className="num">{formatarData(data)}</span>
        {hora ? (
          <>
            {" "}
            às <span className="num">{hora}</span>
          </>
        ) : null}
      </p>

      {recomendacao && <p className="recomendacao">{recomendacao}</p>}

      {melhorHorario?.hora && (
        <p className="melhor-horario">
          <ClockIcon />
          Melhor horário do dia: <strong>{melhorHorario.hora}</strong> — {melhorHorario.motivo}
        </p>
      )}

      {tipoReconhecido === false && (
        <p className="aviso">Tipo de evento não mapeado — usando critérios genéricos.</p>
      )}

      {emRisco && <p className="aviso">⚠️ Este evento está em risco.</p>}

      {onRemover && (
        <Button variant="danger" onClick={onRemover}>
          Remover
        </Button>
      )}
    </Card>
  );
}
