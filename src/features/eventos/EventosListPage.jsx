import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { eventosApi } from "../../api/eventos";
import { ApiError } from "../../api/client";
import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/Button";
import { Mensagem } from "../../components/Mensagem";
import { StatsBar } from "../../components/StatsBar";
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

  const atualizar = async (id, dados) => {
    await eventosApi.atualizar(id, dados);
    carregar();
  };

  const porClassificacao = eventos.reduce((acc, evento) => {
    acc[evento.classificacao_geral] = (acc[evento.classificacao_geral] ?? 0) + 1;
    return acc;
  }, {});

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

      {eventos.length > 0 && (
        <StatsBar
          itens={[
            { label: "Cadastrados", valor: eventos.length },
            { label: "Favoráveis", valor: porClassificacao.favoravel ?? 0, tone: "favoravel" },
            { label: "Moderados", valor: porClassificacao.moderado ?? 0, tone: "moderado" },
            { label: "Arriscados", valor: porClassificacao.arriscado ?? 0, tone: "arriscado" },
          ]}
        />
      )}

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
            descricao={evento.descricao}
            classificacao={evento.classificacao_geral}
            recomendacao={evento.recomendacao}
            temperatura={evento.condicoes_horario_temperatura}
            chanceChuva={evento.condicoes_horario_chance_chuva}
            vento={evento.condicoes_horario_vento}
            melhorHorario={{ hora: evento.melhor_horario_hora, motivo: evento.melhor_horario_motivo }}
            tipoReconhecido={evento.tipo_evento_reconhecido}
            onRemover={() => remover(evento.id)}
            onAtualizar={(dados) => atualizar(evento.id, dados)}
          />
        ))}
      </ul>
    </div>
  );
}
