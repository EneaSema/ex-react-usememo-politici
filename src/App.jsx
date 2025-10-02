import { useState, useEffect, useMemo } from "react";

export default function App() {
  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3333/politicians`)
      .then((resp) => resp.json())
      .then((data) => setPoliticians(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h1>EX - Lista di Politici</h1>
      <div className="lista-politici">
        {politicians.map((p) => {
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
