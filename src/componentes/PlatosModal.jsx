import CategoriasPlatos from "./CategoriasPlato";
import Buscador from "./Buscador";
import { useState, useEffect } from "react";
import "../Css/PlatosModal.css";
export default function PlatosModal() {
  
  const [categorias, setCategorias] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [busqueda,setBusqueda] = useState("")

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
    .filter((categoria) => categoria.platos.length > 0);

  return (
    <div>
      <Buscador buscar={setBusqueda}></Buscador>
      <div className="contenedorModalCategorias">
                {CategoriasConPlatos.length > 0 ? (
                CategoriasConPlatos.map((categoria) => (
                  <CategoriasPlatos
                    key={categoria.id_categoria}
                    nombre={categoria.tipo_categoria}
                    platos={categoria.platos}
                    ingredientes={true}
                    boton={true}
                  />
                ))
              ) : (
                <p className="nombreMensaje">No se encontraron platos con ese nombre</p>
              )}
      </div>
    </div>
  );
}
