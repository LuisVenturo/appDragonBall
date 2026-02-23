import { useParams, Link } from "react-router-dom";
import { useCharacter } from "../hooks/useCharacters";

const StatBar = ({ label, value, max = 100 }) => {
  const numericVal = typeof value === "string"
    ? parseInt(value.replace(/[^0-9]/g, "")) || 0
    : value || 0;
  const pct = Math.min((numericVal / (max || 1)) * 100, 100);

  return (
    <div style={{ marginBottom: "0.9rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
        <span style={{ fontSize: "0.8rem", color: "var(--orange)", fontWeight: 700 }}>{value || "?"}</span>
      </div>
      <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" }}>
        <div style={{
          height: "100%", borderRadius: "2px",
          background: "linear-gradient(90deg, var(--orange), var(--gold))",
          width: `${pct}%`,
          transition: "width 0.8s ease",
          boxShadow: "0 0 8px rgba(255,160,0,0.5)"
        }} />
      </div>
    </div>
  );
};

const CharacterDetail = () => {
  const { id } = useParams();
  const { character, loading, error } = useCharacter(id);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "8rem 2rem", color: "var(--text-muted)" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1.5rem", animation: "float 1s ease-in-out infinite" }}>⚡</div>
        <p style={{ letterSpacing: "0.25em", textTransform: "uppercase", fontSize: "0.85rem" }}>Cargando datos del guerrero...</p>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div style={{ textAlign: "center", padding: "8rem 2rem" }}>
        <p style={{ color: "#ff6666", marginBottom: "1.5rem" }}>Personaje no encontrado</p>
        <Link to="/dragonball" style={{ color: "var(--orange)", textDecoration: "none", letterSpacing: "0.1em" }}>← Volver al listado</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Back */}
      <Link to="/dragonball" style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        color: "var(--text-muted)", textDecoration: "none",
        fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase",
        marginBottom: "2rem", transition: "color 0.2s ease"
      }}
        onMouseEnter={e => e.target.style.color = "var(--orange)"}
        onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
      >
        ← Volver a personajes
      </Link>

      {/* Hero section */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "3rem",
        alignItems: "start",
        "@media(max-width: 768px)": { gridTemplateColumns: "1fr" }
      }}>
        {/* Image Panel */}
        <div>
          <div style={{
            position: "relative", borderRadius: "16px", overflow: "hidden",
            background: "linear-gradient(145deg, #1a1a2e, #0f0f1a)",
            border: "1px solid rgba(255,120,20,0.2)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
          }}>
            {character.image ? (
              <img
                src={character.image}
                alt={character.name}
                style={{ width: "100%", display: "block", maxHeight: "500px", objectFit: "cover" }}
                onError={e => { e.target.parentElement.innerHTML = '<div style="padding:5rem;text-align:center;font-size:5rem">⚡</div>'; }}
              />
            ) : (
              <div style={{ padding: "5rem", textAlign: "center", fontSize: "5rem" }}>⚡</div>
            )}
            {/* Gradient overlay */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
              background: "linear-gradient(transparent, rgba(10,10,15,0.95))",
              display: "flex", alignItems: "flex-end", padding: "1.5rem"
            }}>
              <div>
                <div style={{
                  fontSize: "0.65rem", color: "var(--orange)", letterSpacing: "0.2em",
                  textTransform: "uppercase", fontWeight: 700, marginBottom: "0.3rem"
                }}>
                  {character.race || "Desconocido"}
                </div>
                <h1 style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900,
                  textTransform: "uppercase", lineHeight: 1, color: "var(--text-light)"
                }}>
                  {character.name}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div>
          {/* Tags */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {character.affiliation && (
              <span style={{
                padding: "4px 14px", borderRadius: "999px", fontSize: "0.7rem",
                fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                background: "rgba(255,120,20,0.12)", color: "var(--orange)",
                border: "1px solid rgba(255,120,20,0.3)"
              }}>
                {character.affiliation}
              </span>
            )}
            {character.gender && (
              <span style={{
                padding: "4px 14px", borderRadius: "999px", fontSize: "0.7rem",
                fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                background: "rgba(255,255,255,0.06)", color: "var(--text-muted)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}>
                {character.gender}
              </span>
            )}
          </div>

          {/* Description */}
          {character.description && (
            <p style={{
              color: "var(--text-muted)", lineHeight: 1.8, fontSize: "0.95rem",
              marginBottom: "2rem",
              borderLeft: "3px solid var(--orange)", paddingLeft: "1rem"
            }}>
              {character.description}
            </p>
          )}

          {/* Ki stats */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,120,20,0.15)",
            borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem"
          }}>
            <h3 style={{ fontSize: "0.75rem", color: "var(--orange)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
              — Nivel de Poder
            </h3>
            <StatBar label="KI Base" value={character.ki} max={1000000000} />
            <StatBar label="KI Máximo" value={character.maxKi} max={1000000000} />
          </div>

          {/* Transformations */}
          {character.transformations && character.transformations.length > 0 && (
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,120,20,0.15)",
              borderRadius: "12px", padding: "1.5rem"
            }}>
              <h3 style={{ fontSize: "0.75rem", color: "var(--orange)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
                — Transformaciones ({character.transformations.length})
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "1rem" }}>
                {character.transformations.map(t => (
                  <div key={t.id} style={{ textAlign: "center" }}>
                    {t.image && (
                      <img
                        src={t.image}
                        alt={t.name}
                        style={{
                          width: "70px", height: "70px", objectFit: "cover",
                          borderRadius: "8px", border: "1px solid rgba(255,120,20,0.2)",
                          marginBottom: "0.4rem"
                        }}
                        onError={e => e.target.style.display = "none"}
                      />
                    )}
                    <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.05em", lineHeight: 1.3 }}>
                      {t.name}
                    </p>
                    {t.ki && (
                      <p style={{ fontSize: "0.6rem", color: "var(--orange)", fontWeight: 700 }}>
                        KI: {t.ki}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
