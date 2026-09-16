import { useEffect, useState } from "react";
import { eventosApi } from "../../api/eventos";
import { ApiError } from "../../api/client";

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

  if (carregando) return <p>Avaliando eventos futuros...</p>;
  if (erro) return <p className="erro">{erro}</p>;
  if (resultados.length === 0) return <p>Nenhum evento futuro cadastrado pra avaliar.</p>;

  return (
    <div>
      <h2>Eventos em risco</h2>
      <p className="detalhe">Avaliação em tempo real de todos os eventos futuros cadastrados.</p>
      <ul className="lista-eventos">
        {resultados.map((r) => (
          <li key={r.id} className={`card classificacao-${r.classificacao}`}>
            <div className="card-header">
              <strong>{r.nome}</strong>
              <span className={`selo selo-${r.classificacao}`}>{r.classificacao}</span>
            </div>
            <p>
              {r.cidade} — {r.data_evento}
            </p>
            {r.em_risco && <p className="aviso">⚠️ Este evento está em risco.</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
