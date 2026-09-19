import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { Mensagem } from "../../components/Mensagem";
import { ApiError } from "../../api/client";
import { EventoAtualizarForm } from "./EventoAtualizarForm";

export function EditarEventoModal({ aberto, onFechar, valoresIniciais, onSalvar }) {
  const [form, setForm] = useState(valoresIniciais);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (aberto) {
      setForm(valoresIniciais);
      setErro(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto]);

  const atualizarCampo = (campo, valor) => {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  };

  const salvar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setErro(null);

    try {
      const dados = { nome: form.nome, hora: form.hora || null, descricao: form.descricao || null };
      await onSalvar(dados);
      onFechar();
    } catch (err) {
      setErro(err instanceof ApiError ? err.message : "Falha ao atualizar evento");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Modal aberto={aberto} titulo="Atualizar evento" onFechar={onFechar}>
      <form onSubmit={salvar} className="formulario formulario-modal">
        <EventoAtualizarForm valores={form} aoAlterarCampo={atualizarCampo} />

        {erro && <Mensagem tipo="erro">{erro}</Mensagem>}

        <Button type="submit" loading={enviando}>
          {enviando ? "Reavaliando clima..." : "Salvar alterações"}
        </Button>
      </form>
    </Modal>
  );
}
