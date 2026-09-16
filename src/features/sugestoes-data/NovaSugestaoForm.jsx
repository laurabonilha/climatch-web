import { useState } from "react";
import { sugestoesDataApi } from "../../api/sugestoesData";
import { ApiError } from "../../api/client";
import { Field } from "../../components/Field";
import { Button } from "../../components/Button";
import { Mensagem } from "../../components/Mensagem";

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
      <Field label="Nome (opcional)">
        <input value={nome} onChange={(e) => setNome(e.target.value)} />
      </Field>

      <Field label="Cidade">
        <input required value={cidade} onChange={(e) => setCidade(e.target.value)} />
      </Field>

      <Field label="Tipo de evento">
        <input required value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)} />
      </Field>

      <Field label="Datas candidatas (separadas por vírgula, DD-MM-AAAA)">
        <input
          required
          placeholder="05-10-2026, 12-10-2026, 19-10-2026"
          value={datasTexto}
          onChange={(e) => setDatasTexto(e.target.value)}
        />
      </Field>

      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}

      <Button type="submit" loading={enviando}>
        {enviando ? "Calculando..." : "Calcular melhor data"}
      </Button>
    </form>
  );
}
