import { useEffect, useState } from "react";
import CategoriasPlato from "../componentes/CategoriasPlato";
import iconBuscar from "../assets/IconoBuscar.svg"
import "../Css/PlatosTarjetas.css"

export default function Platos() {
  const [categorias, setCategorias] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Llamamos ambos endpoints en paralelo
    Promise.all([
      fetch("http://localhost:8080/Categorias").then((res) => res.json()),
      fetch("http://localhost:8080/Platos").then((res) => res.json()),
    ])
      .then(([CategoriasData, PlatosData]) => {
        setCategorias(CategoriasData);
        setPlatos(PlatosData);
        
      })
      .catch((err) => console.error("Error al cargar datos:", err))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p>Cargando...</p>;
  console.log(platos)
  // Unimos las mesas a cada sala correspondiente
  const CategoriasConPlatos = categorias.map((categoria) => ({
    ...categoria,
    platos: platos.filter((p) => p.tipo_categoria === categoria.tipo_categoria),
  }));
  console.log(CategoriasConPlatos)
  return (
    <div>
        <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#333" , display: "flex", justifyContent: "center", alignItems: "center",
            border: "1px solid #ccc",
        }}>
            <p style={{margin: 0, marginTop:"8px"}}>Platos</p>
        </div>
        <div className="buscador">
            <form action="">
                <input className="buscador-text" type="text" name="" id="BuscarPlato" placeholder="Buscar"/>
                <button type="submit" className="buscador-boton">
                    <img src= {iconBuscar} alt=""/> Buscar
                </button>
            </form>
        </div>
      {CategoriasConPlatos.map((xd) => (
        <CategoriasPlato
          key={xd.id_categoria}
          nombre={xd.tipo_categoria}
          platos={xd.platos}
        />
      ))}
    </div>
  );
}
