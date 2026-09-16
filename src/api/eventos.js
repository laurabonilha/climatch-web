import { api } from "./client";

export const eventosApi = {
  listar: (cidade) => api.get(cidade ? `/eventos?cidade=${encodeURIComponent(cidade)}` : "/eventos"),
  obter: (id) => api.get(`/eventos/${id}`),
  criar: (dados) => api.post("/eventos", dados),
  atualizar: (id, dados) => api.put(`/eventos/${id}`, dados),
  remover: (id) => api.delete(`/eventos/${id}`),
  emRisco: () => api.get("/eventos/em-risco"),
};
