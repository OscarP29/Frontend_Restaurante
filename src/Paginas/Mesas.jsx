import "../Css/Encabezado.css"
import Sala from "../componentes/Sala";
import { useEffect, useState} from "react";

export default function Mesas() {
  const [salas, setSalas] = useState([]);
  const [mesas, setMesas] = useState([]);

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
      .finally();
  }, []);

  const salasConMesas = salas.map((sala) => ({
    ...sala,
    mesas: mesas.filter((m) => m.id_sala === sala.id_sala),
  }));

  return (
    <section>
      <div className="encabezado">
        <h1>Mesas</h1>
        <div className="contenedorInfo">
          <div className="contenedorLibre">
            <div className="indicadorLibre"></div>
            <div className="mesasLibres">
              <p className="textoLibre">Libres: <strong>2</strong></p>
            </div>
          </div>
          <div className="contenedorOcupado">
            <div className="indicadorOcupado"></div>
              <div className="mesasOcupadas">
              <p className="textoOcupado">Ocupadas: <strong>1</strong></p>
            </div>
          </div>
        </div>
      </div>
      {salasConMesas.map((sala) => (
        <Sala
          key={sala.id_sala}
          nombre={sala.nombre_sala}
          mesas={sala.mesas}
        />
      ))}
    </section>
  );
}
