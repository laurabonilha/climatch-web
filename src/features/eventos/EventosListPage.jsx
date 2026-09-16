import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { eventosApi } from "../../api/eventos";
import { ApiError } from "../../api/client";
import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/Button";
import { Mensagem } from "../../components/Mensagem";
import { EventoCard } from "./EventoCard";

export function EventosListPage() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = () => {
    setCarregando(true);
    eventosApi
      .listar()
      .then(setEventos)
      .catch((e) => setErro(e instanceof ApiError ? e.message : "Falha ao carregar eventos"))
      .finally(() => setCarregando(false));
  };

  useEffect(carregar, []);

  const remover = async (id) => {
    if (!confirm("Remover este evento?")) return;
    await eventosApi.remover(id);
    carregar();
  };

  return (
    <div>
      <PageHeader
        title="Eventos cadastrados"
        subtitle={`${eventos.length} evento(s) ao ar livre acompanhado(s) nesta conta.`}
        action={
          <Button as={Link} to="/eventos/novo">
            + Novo evento
          </Button>
        }
      />

      {carregando && <Mensagem tipo="info">Carregando eventos...</Mensagem>}
      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}
      {!carregando && !erro && eventos.length === 0 && (
        <Mensagem tipo="vazio">Nenhum evento cadastrado ainda.</Mensagem>
      )}

      <ul className="lista">
        {eventos.map((evento) => (
          <EventoCard
            key={evento.id}
            nome={evento.nome}
            tipoEvento={evento.tipo_evento}
            cidade={evento.cidade}
            data={evento.data_evento}
            hora={evento.hora}
            classificacao={evento.classificacao_geral}
            recomendacao={evento.recomendacao}
            melhorHorario={{ hora: evento.melhor_horario_hora, motivo: evento.melhor_horario_motivo }}
            tipoReconhecido={evento.tipo_evento_reconhecido}
            onRemover={() => remover(evento.id)}
          />
        ))}
      </ul>
    </div>
  );
}
