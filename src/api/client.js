const API_URL = "http://localhost:8001";

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function request(path, options = {}) {
  const resposta = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null);
    const detalhe = corpo?.detail ? JSON.stringify(corpo.detail) : resposta.statusText;
    throw new ApiError(resposta.status, detalhe);
  }

  if (resposta.status === 204) {
    return undefined;
  }

  return resposta.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
};
