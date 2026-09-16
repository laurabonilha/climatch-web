const API_URL = import.meta.env.VITE_API_URL;

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
  patch: (path) => request(path, { method: "PATCH" }),
  delete: (path) => request(path, { method: "DELETE" }),
};
