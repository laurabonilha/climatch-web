import { api } from "./client";

export const eventosApi = {
  listar: (cidade) => api.get(cidade ? `/eventos?cidade=${encodeURIComponent(cidade)}` : "/eventos"),
  criar: (dados) => api.post("/eventos", dados),
  atualizar: (id, dados) => api.patch(`/eventos/${id}`, dados),
  remover: (id) => api.delete(`/eventos/${id}`),
};
