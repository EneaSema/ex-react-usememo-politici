import React, { useState, useEffect, useMemo } from "react";

function PoliticianCard({ name, image, position, biography }) {
  console.log("Card");
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <h3>{position}</h3>
      <p>{biography}</p>
    </div>
  );
}
const MemorizedPoliticianCard = React.memo(PoliticianCard);

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
        {filteredPoliticians.map((p) => (
          <MemorizedPoliticianCard key={p.id} {...p} />
        ))}
      </div>
    </>
  );
}
