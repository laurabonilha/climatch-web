import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

export function Carousel({ itens, renderItem, itensPorPagina = 3 }) {
  const totalPaginas = Math.max(1, Math.ceil(itens.length / itensPorPagina));
  const [pagina, setPagina] = useState(0);

  useEffect(() => {
    if (pagina > totalPaginas - 1) setPagina(0);
  }, [totalPaginas, pagina]);

  const inicio = pagina * itensPorPagina;
  const itensDaPagina = itens.slice(inicio, inicio + itensPorPagina);

  return (
    <div className="carrossel">
      <ul className="lista">{itensDaPagina.map(renderItem)}</ul>

      {totalPaginas > 1 && (
        <div className="carrossel-nav">
          <button
            type="button"
            className="carrossel-seta"
            onClick={() => setPagina((p) => Math.max(0, p - 1))}
            disabled={pagina === 0}
            aria-label="Página anterior"
          >
            <ArrowLeftIcon />
          </button>

          <span className="carrossel-pagina">
            {pagina + 1} / {totalPaginas}
          </span>

          <button
            type="button"
            className="carrossel-seta"
            onClick={() => setPagina((p) => Math.min(totalPaginas - 1, p + 1))}
            disabled={pagina === totalPaginas - 1}
            aria-label="Próxima página"
          >
            <ArrowRightIcon />
          </button>
        </div>
      )}
    </div>
  );
}
