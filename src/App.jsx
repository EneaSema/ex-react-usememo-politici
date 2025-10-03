import { useState, useEffect, useMemo } from "react";

export default function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState(``);

  useEffect(() => {
    fetch(`http://localhost:3333/politicians`)
      .then((resp) => resp.json())
      .then((data) => setPoliticians(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.biography.toLowerCase().includes(search.toLowerCase())
    );
  }, [politicians, search]);
  console.log(filteredPoliticians);

  return (
    <>
      <h1>EX - Lista di Politici</h1>
      <div className="lista-politici">
        <input
          type="text"
          placeholder="Cerca per nome o biografia"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredPoliticians.map((p) => {
          return (
            <div className="card" key={p.i}>
              <img src={p.image} alt={p.name} />
              <h2>{p.name}</h2>
              <h3>{p.position}</h3>
              <p>{p.biography}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
