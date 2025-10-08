import { useState, useEffect, useMemo } from "react";

export default function App() {
  // variabili reattive
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3333/politicians`)
      .then((res) => res.json())
      .then((data) => setPoliticians(data))
      .catch((err) => console.error(err));
  }, []);

  const politicansFiltered = useMemo(() => {
    return politicians.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.biography.toLowerCase().includes(search.toLowerCase())
    );
  }, [politicians, search]);

  return (
    <>
      <h1>EX - Lista di Politici</h1>
      <input
        type="text"
        placeholder="Ricerca per nome o biografia"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {politicansFiltered &&
        politicansFiltered.map((p) => (
          <div className="card" key={p.id}>
            <div>
              <img src={p.image} alt={p.name} />
            </div>
            <div>
              {" "}
              <h3>{p.name}</h3>
              <p>
                Incarico:
                <strong>{p.position}</strong>
              </p>
              <p>{p.biography}</p>
            </div>
          </div>
        ))}
    </>
  );
}
