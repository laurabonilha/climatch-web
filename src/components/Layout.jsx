import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/eventos", label: "Eventos" },
  { to: "/eventos/novo", label: "Novo Evento" },
  { to: "/eventos-em-risco", label: "Eventos em Risco" },
  { to: "/sugestoes-data", label: "Melhor Data" },
];

export function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Climatch</h1>
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
