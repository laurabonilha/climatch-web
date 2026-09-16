import { Field } from "../../components/Field";

export function EventoForm({ valores, aoAlterarCampo }) {
  return (
    <>
      <Field label="Nome">
        <input required value={valores.nome} onChange={(e) => aoAlterarCampo("nome", e.target.value)} />
      </Field>

      <Field label="Tipo de evento">
        <input
          required
          placeholder="casamento, corrida, churrasco..."
          value={valores.tipo_evento}
          onChange={(e) => aoAlterarCampo("tipo_evento", e.target.value)}
        />
      </Field>

      <Field label="Cidade">
        <input required value={valores.cidade} onChange={(e) => aoAlterarCampo("cidade", e.target.value)} />
      </Field>

      <Field label="Data (DD-MM-AAAA)">
        <input
          required
          placeholder="05-10-2026"
          pattern="\d{2}-\d{2}-\d{4}"
          value={valores.data_evento}
          onChange={(e) => aoAlterarCampo("data_evento", e.target.value)}
        />
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
