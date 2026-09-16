import { api } from "./client";

export const sugestoesDataApi = {
  listar: (cidade) =>
    api.get(cidade ? `/sugestoes-data?cidade=${encodeURIComponent(cidade)}` : "/sugestoes-data"),
  obter: (id) => api.get(`/sugestoes-data/${id}`),
  criar: (dados) => api.post("/sugestoes-data", dados),
  atualizar: (id, dados) => api.put(`/sugestoes-data/${id}`, dados),
  remover: (id) => api.delete(`/sugestoes-data/${id}`),
};
