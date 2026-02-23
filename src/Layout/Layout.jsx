import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-dark)", color: "var(--text-light)", fontFamily: "'Oswald', sans-serif" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 100,
        background: "rgba(10,10,15,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "2px solid var(--orange)",
        boxShadow: "0 0 30px rgba(255,120,20,0.25)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", height: "64px" }}>
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "50%",
              background: "linear-gradient(135deg, var(--orange), var(--gold))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.2rem", boxShadow: "0 0 15px rgba(255,160,0,0.6)",
              animation: "pulse-glow 2s ease-in-out infinite"
            }}>⚡</div>
            <span style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--orange)", textTransform: "uppercase" }}>
              Dragon<span style={{ color: "var(--gold)" }}>Ball</span>
            </span>
          </NavLink>

          {/* Links */}
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <NavLink
              to="/"
              end
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "var(--gold)" : "var(--text-muted)",
                fontSize: "0.9rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
                paddingBottom: "4px",
                borderBottom: isActive ? "2px solid var(--gold)" : "2px solid transparent",
                transition: "all 0.2s ease"
              })}
            >Inicio</NavLink>
            <NavLink
              to="/dragonball"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "var(--gold)" : "var(--text-muted)",
                fontSize: "0.9rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
                paddingBottom: "4px",
                borderBottom: isActive ? "2px solid var(--gold)" : "2px solid transparent",
                transition: "all 0.2s ease"
              })}
            >Personajes</NavLink>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ paddingTop: "64px", minHeight: "100vh" }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "2rem",
        color: "var(--text-muted)",
        fontSize: "0.8rem",
        borderTop: "1px solid rgba(255,120,20,0.15)",
        letterSpacing: "0.1em"
      }}>
        DRAGON BALL API · LUIS VENTURO MORALES
      </footer>
    </div>
  );
};

export default Layout;
