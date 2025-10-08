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
  const [selectPosition, setSelectPosition] = useState(``);

  useEffect(() => {
    fetch(`http://localhost:3333/politicians`)
      .then((res) => res.json())
      .then((data) => setPoliticians(data))
      .catch((err) => console.error(err));
  }, []);

  const politicansFiltered = useMemo(() => {
    return politicians.filter((p) => {
      const isName = p.name.toLowerCase().includes(search.toLowerCase());
      const isBio = p.biography.toLowerCase().includes(search.toLowerCase());
      const isPositionValid =
        selectPosition === `` || selectPosition === p.position;
      return (isName || isBio) && isPositionValid;
    });
  }, [politicians, search, selectPosition]);

  const positions = useMemo(() => {
    const uniquePosition = [];
    politicians.forEach((p) => {
      if (!uniquePosition.includes(p.position)) {
        uniquePosition.push(p.position);
      }
    });
    return uniquePosition;
  }, [politicians]);

  // soluzione con il reduce:
  // const positions = useMemo(() => {
  // return politicians.reduce{(acc,p)=>{
  //   if (!acc.includes(p.position)) {
  //        return[...acc, p.position];
  //      }
  // return acc;
  // },[]}

  console.log(positions);

  return (
    <>
      <h1>EX - Lista di Politici</h1>
      <input
        type="text"
        placeholder="Ricerca per nome o biografia"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        value={selectPosition}
        onChange={(e) => setSelectPosition(e.target.value)}
      >
        <option value="">Filtra per posizione</option>
        {positions.map((p, i) => {
          return (
            <option value={p} key={i}>
              {p}
            </option>
          );
        })}
      </select>

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
