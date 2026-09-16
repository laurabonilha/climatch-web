import { useEffect } from "react";

export function Modal({ aberto, titulo, onFechar, children }) {
  useEffect(() => {
    if (!aberto) return;

    const aoTeclar = (e) => {
      if (e.key === "Escape") onFechar();
    };

    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto, onFechar]);

  if (!aberto) return null;

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
      >
        <div className="modal-header">
          <h3>{titulo}</h3>
          <button type="button" className="modal-fechar" onClick={onFechar} aria-label="Fechar">
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
