import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventosApi } from "../../api/eventos";
import { ApiError } from "../../api/client";

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
      <h2>Novo evento</h2>
      <form onSubmit={enviar} className="formulario">
        <label>
          Nome
          <input
            required
            value={form.nome}
            onChange={(e) => atualizarCampo("nome", e.target.value)}
          />
        </label>

        <label>
          Tipo de evento
          <input
            required
            placeholder="casamento, corrida, churrasco..."
            value={form.tipo_evento}
            onChange={(e) => atualizarCampo("tipo_evento", e.target.value)}
          />
        </label>

        <label>
          Cidade
          <input
            required
            value={form.cidade}
            onChange={(e) => atualizarCampo("cidade", e.target.value)}
          />
        </label>

        <label>
          Data (AAAA-MM-DD)
          <input
            required
            placeholder="2026-10-05"
            pattern="\d{4}-\d{2}-\d{2}"
            value={form.data_evento}
            onChange={(e) => atualizarCampo("data_evento", e.target.value)}
          />
        </label>

        <label>
          Hora (HH:MM, opcional)
          <input
            placeholder="15:00"
            pattern="([01]\d|2[0-3]):[0-5]\d"
            value={form.hora}
            onChange={(e) => atualizarCampo("hora", e.target.value)}
          />
        </label>

        <label>
          Descrição (opcional)
          <textarea
            value={form.descricao}
            onChange={(e) => atualizarCampo("descricao", e.target.value)}
          />
        </label>

        {erro && <p className="erro">{erro}</p>}

        <button type="submit" disabled={enviando} className="botao">
          {enviando ? "Avaliando clima..." : "Criar evento"}
        </button>
      </form>
    </div>
  );
}
