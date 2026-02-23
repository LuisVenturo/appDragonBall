import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCharacters } from "../hooks/useCharacters";

const raceColors = {
  "Saiyan": "#ff7700",
  "Human": "#4db8ff",
  "Namekian": "#00cc66",
  "Frieza Race": "#cc44ff",
  "Android": "#00cccc",
  "Majin": "#ff66aa",
  "God": "#ffcc00",
};

const getRaceColor = (race) => raceColors[race] || "#888";

const CharacterCard = ({ character }) => {
  return (
    <Link
      to={`/dragonball/${character.id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="char-card" style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,120,20,0.15)",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: "pointer",
        position: "relative",
      }}>
        {/* Image */}
        <div style={{
          position: "relative", overflow: "hidden",
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          height: "220px", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          {character.image ? (
            <img
              src={character.image}
              alt={character.name}
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                transition: "transform 0.4s ease"
              }}
              onError={e => { e.target.style.display = "none"; }}
            />
          ) : (
            <span style={{ fontSize: "4rem" }}>⚡</span>
          )}
          {/* Race badge */}
          <div style={{
            position: "absolute", bottom: "8px", right: "8px",
            padding: "2px 10px", borderRadius: "999px", fontSize: "0.65rem",
            fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            background: `${getRaceColor(character.race)}22`,
            color: getRaceColor(character.race),
            border: `1px solid ${getRaceColor(character.race)}55`
          }}>
            {character.race || "Unknown"}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "1rem" }}>
          <h3 style={{
            fontSize: "1rem", fontWeight: 700, color: "var(--text-light)",
            letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.4rem",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
          }}>
            {character.name}
          </h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
              {character.affiliation || "—"}
            </span>
            <span style={{
              fontSize: "0.7rem", fontWeight: 700, color: "var(--orange)",
              letterSpacing: "0.05em"
            }}>
              KI: {character.maxKi || character.ki || "?"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const DragonBall = () => {
  const { characters, loading, error } = useCharacters();
  const [search, setSearch] = useState("");
  const [raceFilter, setRaceFilter] = useState("Todos");

  const races = useMemo(() => {
    const set = new Set(characters.map(c => c.race).filter(Boolean));
    return ["Todos", ...Array.from(set)];
  }, [characters]);

  const filtered = useMemo(() => {
    return characters.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchRace = raceFilter === "Todos" || c.race === raceFilter;
      return matchSearch && matchRace;
    });
  }, [characters, search, raceFilter]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ color: "var(--orange)", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          — Universo Dragon Ball
        </p>
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900,
          textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1
        }}>
          <span style={{ color: "var(--text-light)" }}>Todos los </span>
          <span style={{ color: "var(--orange)" }}>Personajes</span>
        </h1>
      </div>

      {/* Filters */}
      <div style={{
        display: "flex", gap: "1rem", marginBottom: "2rem",
        flexWrap: "wrap", alignItems: "center"
      }}>
        {/* Search */}
        <div style={{ position: "relative", flex: "1", minWidth: "250px" }}>
          <span style={{
            position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
            color: "var(--text-muted)", fontSize: "1rem"
          }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "0.75rem 1rem 0.75rem 2.8rem",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,120,20,0.25)",
              borderRadius: "8px",
              color: "var(--text-light)",
              fontSize: "0.9rem",
              fontFamily: "'Oswald', sans-serif",
              outline: "none",
              transition: "border-color 0.2s ease",
              boxSizing: "border-box"
            }}
            onFocus={e => e.target.style.borderColor = "var(--orange)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,120,20,0.25)"}
          />
        </div>

        {/* Race filter */}
        <select
          value={raceFilter}
          onChange={e => setRaceFilter(e.target.value)}
          style={{
            padding: "0.75rem 1rem",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,120,20,0.25)",
            borderRadius: "8px",
            color: "var(--text-light)",
            fontSize: "0.85rem",
            fontFamily: "'Oswald', sans-serif",
            cursor: "pointer",
            outline: "none",
            minWidth: "160px"
          }}
        >
          {races.map(r => <option key={r} value={r} style={{ background: "#1a1a2e" }}>{r}</option>)}
        </select>

        {/* Count */}
        <div style={{
          padding: "0.75rem 1.2rem",
          background: "rgba(255,120,20,0.1)",
          border: "1px solid rgba(255,120,20,0.25)",
          borderRadius: "8px",
          color: "var(--orange)",
          fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em",
          whiteSpace: "nowrap"
        }}>
          {filtered.length} resultados
        </div>
      </div>

      {/* States */}
      {loading && (
        <div style={{ textAlign: "center", padding: "5rem", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem", animation: "float 1s ease-in-out infinite" }}>⚡</div>
          <p style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.85rem" }}>Cargando poder...</p>
        </div>
      )}

      {error && (
        <div style={{
          textAlign: "center", padding: "3rem",
          background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.3)",
          borderRadius: "12px", color: "#ff6666"
        }}>
          <p>Error al cargar: {error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "5rem", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
          <p style={{ letterSpacing: "0.1em" }}>No se encontraron personajes</p>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1.5rem"
        }}>
          {filtered.map(char => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DragonBall;
