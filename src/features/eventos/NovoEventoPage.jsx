import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventosApi } from "../../api/eventos";
import { ApiError } from "../../api/client";
import { PageHeader } from "../../components/PageHeader";
import { Field } from "../../components/Field";
import { Button } from "../../components/Button";
import { Mensagem } from "../../components/Mensagem";

const valoresIniciais = {
  nome: "",
  tipo_evento: "",
  cidade: "",
  data_evento: "",
  hora: "",
  descricao: "",
};

export function NovoEventoPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(valoresIniciais);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  const atualizarCampo = (campo, valor) => {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  };

  const enviar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setErro(null);

    try {
      const dados = { ...form, hora: form.hora || null, descricao: form.descricao || null };
      await eventosApi.criar(dados);
      navigate("/eventos");
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Falha ao criar evento");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div>
      <PageHeader title="Novo evento" subtitle="Cadastre um evento ao ar livre e receba a avaliação do clima na hora." />

      <form onSubmit={enviar} className="formulario">
        <Field label="Nome">
          <input required value={form.nome} onChange={(e) => atualizarCampo("nome", e.target.value)} />
        </Field>

        <Field label="Tipo de evento">
          <input
            required
            placeholder="casamento, corrida, churrasco..."
            value={form.tipo_evento}
            onChange={(e) => atualizarCampo("tipo_evento", e.target.value)}
          />
        </Field>

        <Field label="Cidade">
          <input required value={form.cidade} onChange={(e) => atualizarCampo("cidade", e.target.value)} />
        </Field>

        <Field label="Data (AAAA-MM-DD)">
          <input
            required
            placeholder="2026-10-05"
            pattern="\d{4}-\d{2}-\d{2}"
            value={form.data_evento}
            onChange={(e) => atualizarCampo("data_evento", e.target.value)}
          />
        </Field>

        <Field label="Hora (HH:MM, opcional)">
          <input
            placeholder="15:00"
            pattern="([01]\d|2[0-3]):[0-5]\d"
            value={form.hora}
            onChange={(e) => atualizarCampo("hora", e.target.value)}
          />
        </Field>

        <Field label="Descrição (opcional)">
          <textarea value={form.descricao} onChange={(e) => atualizarCampo("descricao", e.target.value)} />
        </Field>

        {erro && <Mensagem tipo="erro">{erro}</Mensagem>}

        <Button type="submit" disabled={enviando}>
          {enviando ? "Avaliando clima..." : "Criar evento"}
        </Button>
      </form>
    </div>
  );
}
