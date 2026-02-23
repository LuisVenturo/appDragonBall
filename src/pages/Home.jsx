import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ minHeight: "calc(100vh - 64px)", position: "relative", overflow: "hidden" }}>
      {/* Animated background orbs */}
      <div style={{
        position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,120,20,0.12) 0%, transparent 70%)",
        top: "-200px", right: "-100px", animation: "float 8s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,200,0,0.08) 0%, transparent 70%)",
        bottom: "50px", left: "-80px", animation: "float 10s ease-in-out infinite reverse"
      }} />

      {/* Dragon Balls decorative */}
      <div style={{ position: "absolute", top: "15%", right: "8%", opacity: 0.15, fontSize: "8rem", animation: "float 6s ease-in-out infinite" }}>
        ⚡
      </div>

      {/* Hero section */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        minHeight: "calc(100vh - 130px)", textAlign: "center", padding: "2rem",
        position: "relative", zIndex: 1
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.4rem 1.2rem", borderRadius: "999px",
          background: "rgba(255,120,20,0.12)", border: "1px solid rgba(255,120,20,0.35)",
          color: "var(--orange)", fontSize: "0.75rem", letterSpacing: "0.2em",
          textTransform: "uppercase", fontWeight: 600, marginBottom: "2rem",
          animation: "fade-in 0.6s ease"
        }}>
          <span>🔴</span> Dragon Ball Universe
        </div>

        <h1 style={{
          fontSize: "clamp(3rem, 10vw, 7rem)",
          fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.02em",
          textTransform: "uppercase", marginBottom: "1.5rem",
          animation: "slide-up 0.7s ease"
        }}>
          <span style={{ display: "block", color: "var(--text-light)" }}>El Poder</span>
          <span style={{
            display: "block",
            background: "linear-gradient(90deg, var(--orange), var(--gold), var(--orange))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundSize: "200%", animation: "shimmer 3s linear infinite"
          }}>Sin Límites</span>
        </h1>

        <p style={{
          fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "520px",
          lineHeight: 1.7, marginBottom: "2.5rem", animation: "fade-in 1s ease"
        }}>
          Explora el universo completo de Dragon Ball. Descubre todos los personajes, sus transformaciones, razas y poderes legendarios.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", animation: "fade-in 1.2s ease" }}>
          <Link to="/dragonball" style={{
            padding: "0.85rem 2.5rem",
            background: "linear-gradient(135deg, var(--orange), #e55000)",
            color: "white", textDecoration: "none", borderRadius: "6px",
            fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase",
            boxShadow: "0 0 25px rgba(255,120,20,0.45)",
            transition: "all 0.25s ease",
            fontFamily: "'Oswald', sans-serif"
          }}
            onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            Ver Personajes
          </Link>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: "3rem", marginTop: "4rem",
          flexWrap: "wrap", justifyContent: "center",
          animation: "fade-in 1.4s ease"
        }}>
          {[
            { num: "58+", label: "Personajes" },
            { num: "∞", label: "Poder" },
            { num: "7", label: "Esferas" },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--gold)", lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.3rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
