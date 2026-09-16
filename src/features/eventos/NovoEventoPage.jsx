import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventosApi } from "../../api/eventos";
import { ApiError } from "../../api/client";
import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/Button";
import { Mensagem } from "../../components/Mensagem";
import { EventoForm } from "./EventoForm";

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
        <EventoForm valores={form} aoAlterarCampo={atualizarCampo} />

        {erro && <Mensagem tipo="erro">{erro}</Mensagem>}

        <Button type="submit" loading={enviando}>
          {enviando ? "Avaliando clima..." : "Criar evento"}
        </Button>
      </form>
    </div>
  );
}
