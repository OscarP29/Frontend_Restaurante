import CategoriasPlato from "../../componentes/CategoriasPlato";
import Buscador from "../../componentes/Buscador";
import "../../Css/PlatosTarjetas.css"
import { useEffect,useState } from "react";

export default function Platos() {
  const [categorias, setCategorias] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [busqueda, setBusqueda] = useState("")

  
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/Categorias").then((res) => res.json()),
      fetch("http://localhost:8080/Platos").then((res) => res.json()),
    ])
      .then(([CategoriasData, PlatosData]) => {
        setCategorias(CategoriasData);
        setPlatos(PlatosData);
      })
      .catch((err) => console.error("Error al cargar datos:", err))
      .finally();
  }, []);

  const platosFiltrados = platos.filter((p) =>
    p.nombre_plato.toLowerCase().includes(busqueda.toLowerCase())
  );


 const CategoriasConPlatos = categorias
  .map((categoria) => ({
    ...categoria,
    platos: platosFiltrados.filter(
      (p) => p.id_categoria === categoria.id_categoria
    ),
  }))
  .filter((categoria) =>
    busqueda === "" ? true : categoria.platos.length > 0
  );
  return (
    <section>
        <div className="encabezado">
        <h1>Platos</h1>
        </div>
        <Buscador buscar={setBusqueda}></Buscador>
        <div className="contenedorCategorias">
          {CategoriasConPlatos.length > 0 ? (
          CategoriasConPlatos.map((categoria) => (
            <CategoriasPlato
              key={categoria.id_categoria}
              nombre={categoria.tipo_categoria}
              platos={categoria.platos}
              ingredientes={true}
            />
          ))
        ) : (
          <p className="nombreMensaje">No se encontraron platos con ese nombre</p>
        )}
        </div>
    </section>
  );
}
