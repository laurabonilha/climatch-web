import { Field } from "../../components/Field";

export function EventoAtualizarForm({ valores, aoAlterarCampo }) {
  return (
    <>
      <p className="campo-fixo">
        {valores.tipo_evento} · {valores.cidade} · {valores.data_evento}
      </p>
      <p className="aviso">
        Cidade, tipo e data não podem ser alterados aqui — para mudar algum desses, remova este evento e crie um
        novo. Salvar aqui sempre reconsulta a previsão do tempo.
      </p>

      <Field label="Nome">
        <input required value={valores.nome} onChange={(e) => aoAlterarCampo("nome", e.target.value)} />
      </Field>

      <Field label="Hora (HH:MM, opcional)">
        <input
          placeholder="15:00"
          pattern="([01]\d|2[0-3]):[0-5]\d"
          value={valores.hora ?? ""}
          onChange={(e) => aoAlterarCampo("hora", e.target.value)}
        />
      </Field>

      <Field label="Descrição (opcional)">
        <textarea value={valores.descricao ?? ""} onChange={(e) => aoAlterarCampo("descricao", e.target.value)} />
      </Field>
    </>
  );
}
