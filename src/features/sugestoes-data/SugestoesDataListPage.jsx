import { useEffect, useState } from "react";
import { sugestoesDataApi } from "../../api/sugestoesData";
import { ApiError } from "../../api/client";
import { NovaSugestaoForm } from "./NovaSugestaoForm";

export function SugestoesDataListPage() {
  const [sugestoes, setSugestoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = () => {
    setCarregando(true);
    sugestoesDataApi
      .listar()
      .then(setSugestoes)
      .catch((e) => setErro(e instanceof ApiError ? e.message : "Falha ao carregar sugestões"))
      .finally(() => setCarregando(false));
  };

  useEffect(carregar, []);

  const remover = async (id) => {
    if (!confirm("Remover esta sugestão?")) return;
    await sugestoesDataApi.remover(id);
    carregar();
  };

  return (
    <div>
      <h2>Escolha a melhor data</h2>
      <NovaSugestaoForm onCriada={carregar} />

      {carregando && <p>Carregando...</p>}
      {erro && <p className="erro">{erro}</p>}

      <ul className="lista-eventos">
        {sugestoes.map((s) => (
          <li key={s.id} className="card">
            <div className="card-header">
              <strong>{s.nome || `${s.cidade} — ${s.tipo_evento}`}</strong>
              {s.melhor_data && <span className="selo selo-favoravel">melhor: {s.melhor_data}</span>}
            </div>
            <p>
              {s.cidade} — {s.tipo_evento}
            </p>
            <ul className="lista-resultados">
              {s.resultados.map((r) => (
                <li key={r.data}>
                  {r.data}: <span className={`selo selo-${r.classificacao}`}>{r.classificacao}</span>
                  {r.chance_chuva !== null ? ` (${r.chance_chuva}% de chuva)` : ""}
                </li>
              ))}
            </ul>
            <button onClick={() => remover(s.id)} className="botao-remover">
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
