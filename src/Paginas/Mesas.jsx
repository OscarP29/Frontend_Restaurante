import { useEffect, useState } from "react";
import Sala from "../componentes/Sala";

export default function Mesas() {
  const [salas, setSalas] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Llamamos ambos endpoints en paralelo
    Promise.all([
      fetch("http://localhost:8080/Salas").then((res) => res.json()),
      fetch("http://localhost:8080/Mesas").then((res) => res.json()),
    ])
      .then(([salasData, mesasData]) => {
        setSalas(salasData);
        setMesas(mesasData);
      })
      .catch((err) => console.error("Error al cargar datos:", err))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p>Cargando...</p>;

  // Unimos las mesas a cada sala correspondiente
  const salasConMesas = salas.map((sala) => ({
    ...sala,
    mesas: mesas.filter((m) => m.id_sala === sala.id_sala),
  }));
  return (
    <div>
        <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#333" , display: "flex", justifyContent: "center", alignItems: "center",
            border: "1px solid #ccc",
        }}>
            <p style={{margin: 0, marginTop:"8px"}}>Mesas</p>
        </div>
      {salasConMesas.map((sala) => (
        <Sala
          key={sala.id_sala}
          nombre={sala.nombre_sala}
          mesas={sala.mesas}
        />
      ))}
    </div>
  );
}
