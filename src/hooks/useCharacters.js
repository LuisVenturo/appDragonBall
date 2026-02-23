import { useState, useEffect } from "react";

const BASE_URL = "https://dragonball-api.com/api";

export function useCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        let page = 1;
        let allCharacters = [];
        let hasMore = true;

        while (hasMore) {
          const res = await fetch(`${BASE_URL}/characters?page=${page}&limit=58`);
          const data = await res.json();
          allCharacters = [...allCharacters, ...data.items];
          hasMore = page < data.meta.totalPages;
          page++;
          if (page > 5) break;
        }

        setCharacters(allCharacters);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { characters, loading, error };
}

export function useCharacter(id) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/characters/${id}`);
        const data = await res.json();
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  return { character, loading, error };
}