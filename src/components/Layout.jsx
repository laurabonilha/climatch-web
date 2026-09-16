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
    <div className="app-shell">
      <div className="fundo-montanhas" aria-hidden="true">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          <polygon
            points="0,220 0,140 220,70 420,150 640,50 860,140 1080,70 1300,130 1440,90 1440,220"
            fill="#e7d7ae"
            opacity="0.55"
          />
          <polygon
            points="0,220 0,170 260,110 500,175 760,90 1000,160 1260,100 1440,150 1440,220"
            fill="#ddc998"
            opacity="0.6"
          />
        </svg>
      </div>
      <header className="topbar">
        <div className="topbar-inner">
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
        </div>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
