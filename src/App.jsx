import { useState, useEffect } from "react";

export default function App() {
  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3333/politicians`)
      .then((res) => res.json())
      .then((data) => setPoliticians(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <h1>EX - Lista di Politici</h1>
      {politicians.map((p) => {
        return (
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
        );
      })}
    </>
  );
}
