import { NavLink, Outlet } from "react-router-dom";
import { Logo } from "./Logo";

const links = [
  { to: "/eventos", label: "Eventos" },
  { to: "/eventos/novo", label: "Novo Evento" },
  { to: "/eventos-em-risco", label: "Eventos em Risco" },
  { to: "/sugestoes-data", label: "Melhor Data" },
];

export function Layout() {
  return (
    <div className="wrap">
      <header className="topbar">
        <div className="brand">
          <Logo />
          climatch
        </div>
        <nav className="tabs">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/eventos"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
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
