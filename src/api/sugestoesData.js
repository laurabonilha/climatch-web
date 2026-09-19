import { api } from "./client";

export const sugestoesDataApi = {
  listar: (cidade) =>
    api.get(cidade ? `/sugestoes-data?cidade=${encodeURIComponent(cidade)}` : "/sugestoes-data"),
  criar: (dados) => api.post("/sugestoes-data", dados),
  remover: (id) => api.delete(`/sugestoes-data/${id}`),
};
