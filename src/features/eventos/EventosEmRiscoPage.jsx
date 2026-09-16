import { useEffect, useState } from "react";
import { eventosApi } from "../../api/eventos";
import { ApiError } from "../../api/client";
import { PageHeader } from "../../components/PageHeader";
import { Mensagem } from "../../components/Mensagem";
import { EventoCard } from "./EventoCard";

export function EventosEmRiscoPage() {
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    eventosApi
      .emRisco()
      .then((resposta) => setResultados(resposta.resultados))
      .catch((e) => setErro(e instanceof ApiError ? e.message : "Falha ao avaliar eventos"))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div>
      <PageHeader
        title="Eventos em risco"
        subtitle="Avaliação em tempo real de todos os eventos futuros cadastrados."
      />

      {carregando && <Mensagem tipo="info">Avaliando eventos futuros...</Mensagem>}
      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}
      {!carregando && !erro && resultados.length === 0 && (
        <Mensagem tipo="vazio">Nenhum evento futuro cadastrado pra avaliar.</Mensagem>
      )}

      <ul className="lista">
        {resultados.map((r) => (
          <EventoCard
            key={r.id}
            nome={r.nome}
            cidade={r.cidade}
            data={r.data_evento}
            classificacao={r.classificacao}
            emRisco={r.em_risco}
          />
        ))}
      </ul>
    </div>
  );
}
