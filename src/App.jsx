import React, { useState, useEffect, useMemo } from "react";

const Politicians = React.memo(({ name, image, position, biography }) => {
  console.log("card");
  return (
    <div className="card">
      <div>
        <img src={image} alt={name} />
      </div>
      <div>
        {" "}
        <h3>{name}</h3>
        <p>
          Incarico:
          <strong>{position}</strong>
        </p>
        <p>{biography}</p>
      </div>
    </div>
  );
});

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
          <Politicians
            key={p.id}
            name={p.name}
            image={p.image}
            position={p.position}
            biography={p.biography}
          />
        ))}
    </>
  );
}
