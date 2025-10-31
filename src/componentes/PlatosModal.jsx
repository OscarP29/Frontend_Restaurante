import CategoriasPlatos from "./CategoriasPlato"
import Buscador from "./Buscador"
import { useState,useEffect } from "react";
import "../Css/PlatosModal.css"
export default function PlatosModal(){
    const [categorias, setCategorias] = useState([]);
    const [platos, setPlatos] = useState([]);
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
            .finally();
        }, []);
      
        const CategoriasConPlatos = categorias.map((categoria) => ({
          ...categoria,
          platos: platos.filter((p) => p.id_categoria === categoria.id_categoria),
        }));
    return(
        <div>
            <Buscador></Buscador>
            <div className="contenedorModalCategorias">
                {CategoriasConPlatos.map((categoria) => (
                    <CategoriasPlatos
                        key={categoria.id_categoria}
                        nombre={categoria.tipo_categoria}
                        platos={categoria.platos}
                        boton={true}
                    />
                ))}
            </div>
        </div>
    )
}