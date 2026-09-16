import { useState } from "react";
import { sugestoesDataApi } from "../../api/sugestoesData";
import { ApiError } from "../../api/client";

export function NovaSugestaoForm({ onCriada }) {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [datasTexto, setDatasTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  const enviar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setErro(null);

    const datas = datasTexto
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);

    try {
      await sugestoesDataApi.criar({
        nome: nome || null,
        cidade,
        tipo_evento: tipoEvento,
        datas_candidatas: datas,
      });
      setNome("");
      setCidade("");
      setTipoEvento("");
      setDatasTexto("");
      onCriada();
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Falha ao calcular a melhor data");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={enviar} className="formulario">
      <label>
        Nome (opcional)
        <input value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <label>
        Cidade
        <input required value={cidade} onChange={(e) => setCidade(e.target.value)} />
      </label>
      <label>
        Tipo de evento
        <input required value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)} />
      </label>
      <label>
        Datas candidatas (separadas por vírgula, AAAA-MM-DD)
        <input
          required
          placeholder="2026-10-05, 2026-10-12, 2026-10-19"
          value={datasTexto}
          onChange={(e) => setDatasTexto(e.target.value)}
        />
      </label>

      {erro && <p className="erro">{erro}</p>}

      <button type="submit" disabled={enviando} className="botao">
        {enviando ? "Calculando..." : "Calcular melhor data"}
      </button>
    </form>
  );
}
