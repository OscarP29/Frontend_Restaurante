import "../../Css/Encabezado.css"
import "../../Css/Empleado/Mesas.css"
import Sala from "../../componentes/Sala";
import { useEffect, useState} from "react";

export default function Mesas() {
  const [salas, setSalas] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [ocupadas, setOcupadas] = useState(0);
  const [libres, setLibres] = useState(0);

  const obtenerMesas = () =>{
    Promise.all([
      fetch("http://localhost:8080/Salas").then((res) => res.json()),
      fetch("http://localhost:8080/Mesas").then((res) => res.json()),
    ])
      .then(([salasData, mesasData]) => {
        setSalas(salasData);
        setMesas(mesasData);
        setOcupadas(mesasData.filter(m => m.estado_mesa).length);
        setLibres(mesasData.filter(m => !m.estado_mesa).length);

      })
      .catch((err) => console.error("Error al cargar datos:", err))
      .finally();
  }
  useEffect(() => {
    obtenerMesas()
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
              <p className="textoLibre">Libres: <strong>{libres}</strong></p>
            </div>
          </div>
          <div className="contenedorOcupado">
            <div className="indicadorOcupado"></div>
              <div className="mesasOcupadas">
              <p className="textoOcupado">Ocupadas: <strong>{ocupadas}</strong></p>
            </div>
          </div>
        </div>
      </div>
      <div className="contenedorSalasMesas">
      {salasConMesas.map((sala) => (
        <Sala
          key={sala.id_sala}
          nombre={sala.nombre_sala}
          mesas={sala.mesas}
          idsala={sala.id_sala}
          recargar={obtenerMesas}
        />
      ))}
      </div>
    </section>
  );
}
