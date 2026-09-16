import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { eventosApi } from "../../api/eventos";
import { ApiError } from "../../api/client";

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

  if (carregando) return <p>Carregando eventos...</p>;
  if (erro) return <p className="erro">{erro}</p>;

  return (
    <div>
      <h2>Eventos cadastrados</h2>
      <Link to="/eventos/novo" className="botao">
        + Novo evento
      </Link>

      {eventos.length === 0 && <p>Nenhum evento cadastrado ainda.</p>}

      <ul className="lista-eventos">
        {eventos.map((evento) => (
          <li key={evento.id} className={`card classificacao-${evento.classificacao_geral}`}>
            <div className="card-header">
              <strong>{evento.nome}</strong>
              <span className={`selo selo-${evento.classificacao_geral}`}>
                {evento.classificacao_geral}
              </span>
            </div>
            <p>
              {evento.tipo_evento} em {evento.cidade} — {evento.data_evento}
              {evento.hora ? ` às ${evento.hora}` : ""}
            </p>
            <p className="recomendacao">{evento.recomendacao}</p>
            <p className="detalhe">
              Melhor horário do dia: {evento.melhor_horario_hora} ({evento.melhor_horario_motivo})
            </p>
            {!evento.tipo_evento_reconhecido && (
              <p className="aviso">Tipo de evento não mapeado — usando critérios genéricos.</p>
            )}
            <button onClick={() => remover(evento.id)} className="botao-remover">
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
