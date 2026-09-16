import { useEffect, useState } from "react";
import { sugestoesDataApi } from "../../api/sugestoesData";
import { ApiError } from "../../api/client";
import { PageHeader } from "../../components/PageHeader";
import { Mensagem } from "../../components/Mensagem";
import { NovaSugestaoForm } from "./NovaSugestaoForm";
import { SugestaoCard } from "./SugestaoCard";

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
      <PageHeader
        title="Escolha a melhor data"
        subtitle="Compare datas candidatas para o mesmo local e tipo de evento."
      />

      <NovaSugestaoForm onCriada={carregar} />

      {carregando && <Mensagem tipo="info">Carregando...</Mensagem>}
      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}
      {!carregando && !erro && sugestoes.length === 0 && (
        <Mensagem tipo="vazio">Nenhuma sugestão calculada ainda.</Mensagem>
      )}

      <ul className="lista">
        {sugestoes.map((s) => (
          <SugestaoCard
            key={s.id}
            nome={s.nome}
            cidade={s.cidade}
            tipoEvento={s.tipo_evento}
            resultados={s.resultados}
            melhorData={s.melhor_data}
            onRemover={() => remover(s.id)}
          />
        ))}
      </ul>
    </div>
  );
}
