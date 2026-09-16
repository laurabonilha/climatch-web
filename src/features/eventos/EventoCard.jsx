import { useState } from "react";
import { Card } from "../../components/Card";
import { StatusPill } from "../../components/StatusPill";
import { WeatherIcon } from "../../components/WeatherIcon";
import { Chip } from "../../components/Chip";
import { ClockIcon, ThermometerIcon, RaindropIcon, WindIcon } from "../../components/icons";
import { Button } from "../../components/Button";
import { formatarData } from "../../utils/formatarData";
import { EditarEventoModal } from "./EditarEventoModal";

export function EventoCard({
  nome,
  tipoEvento,
  cidade,
  data,
  hora,
  descricao,
  classificacao,
  recomendacao,
  temperatura,
  chanceChuva,
  vento,
  melhorHorario,
  tipoReconhecido,
  onRemover,
  onAtualizar,
}) {
  const [editando, setEditando] = useState(false);
  const temCondicoesNaHora = temperatura != null || chanceChuva != null || vento != null;

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

      {temCondicoesNaHora && (
        <div className="chips">
          {temperatura != null && (
            <Chip icon={<ThermometerIcon />}>{Math.round(temperatura)}°C</Chip>
          )}
          {chanceChuva != null && <Chip icon={<RaindropIcon />}>{chanceChuva}% de chuva</Chip>}
          {vento != null && <Chip icon={<WindIcon />}>{Math.round(vento)} km/h</Chip>}
        </div>
      )}

      {recomendacao && <p className="recomendacao">{recomendacao}</p>}

      {melhorHorario?.hora && (
        <div className="melhor-horario">
          <Chip icon={<ClockIcon />} variant="ghost">
            Melhor horário: {melhorHorario.hora}
          </Chip>
          <p className="motivo">{melhorHorario.motivo}</p>
        </div>
      )}

      {tipoReconhecido === false && (
        <p className="aviso">Tipo de evento não mapeado — usando critérios genéricos.</p>
      )}

      {(onAtualizar || onRemover) && (
        <div className="card-acoes">
          {onAtualizar && (
            <Button variant="secondary" onClick={() => setEditando(true)}>
              Atualizar
            </Button>
          )}
          {onRemover && (
            <Button variant="danger" onClick={onRemover}>
              Remover
            </Button>
          )}
        </div>
      )}

      {onAtualizar && (
        <EditarEventoModal
          aberto={editando}
          onFechar={() => setEditando(false)}
          valoresIniciais={{
            nome,
            tipo_evento: tipoEvento,
            cidade,
            data_evento: data,
            hora: hora ?? "",
            descricao: descricao ?? "",
          }}
          onSalvar={onAtualizar}
        />
      )}
    </Card>
  );
}
