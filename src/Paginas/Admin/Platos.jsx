import CategoriasPlato from "../../componentes/CategoriasPlato";
import Buscador from "../../componentes/Buscador";
import ModalPlatos from "../../componentes/Modal.jsx";
import ModalCategorias from "../../componentes/Admin/ModalEditarAdmin.jsx"
import "../../Css/PlatosTarjetas.css"
import { useEffect,useState } from "react";

export default function Platos() {
  const [categorias, setCategorias] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [busqueda, setBusqueda] = useState("")
  const [isModalOpenPlatos, setIsModalOpenPlatos] = useState(false);
  const [isModalOpenCategorias, setIsModalOpenCategorias] = useState(false);

  const [nombrePlato, setNombrePlato] = useState("");
  const [precioPlato, setPrecioPlato] = useState("");
  const [descripcionPlato, setDescripcionPlato] = useState("");
  const [idcategoriaPlato, setIdCategoriaPlato] = useState("");

  const [nombreCategoria, setNombreCategoria] = useState("");

  const abrirModalCrearCategoria = () => {
      setIsModalOpenCategorias(true);
  }
  const abrirModalCrearPlato = () => {
      setIsModalOpenPlatos(true);
  }
  const cerrarModalCrearCategoria = () => {
      setIsModalOpenCategorias(false);
  }
  const cerrarModalCrearPlatos = () => {
    setIsModalOpenPlatos(false);
  }
  const enviarEdicionCategoria = async (e) => {
      e.preventDefault();
      const nuevaCategoria = {
          id_categoria: "",
          tipo_categoria: nombreCategoria
      };
      try {
      const res = await fetch("http://localhost:8080/CategoriasInsertar", {
          method: "POST",  
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevaCategoria),
      });
      if (!res.ok) throw new Error(`Error al editar categoria: ${res.status}`);
      alert("Categoria editada correctamente ✅");
      setIsModalOpenCategorias(false);
      obtenerDatos();
      }
      catch (err) {
      console.error(err);
      alert("Error al editar la categoria ❌");
      }
  }
  const enviarEdicionPlato = async (e) => {
      e.preventDefault();
      const nuevoPlato = {
          id_plato: "",
          nombre_plato: nombrePlato,
          descripcion_plato: descripcionPlato,
          id_categoria: idcategoriaPlato, // ✔ COINCIDE CON LA API
          precio_plato: precioPlato
      };
      try {
      const res = await fetch("http://localhost:8080/PlatosInsertar", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoPlato),
      });
      if (!res.ok) throw new Error(`Error al crear mesa: ${res.status}`);
      alert("Plato editado correctamente ✅");
      setIsModalOpenPlatos(false);
      obtenerDatos();

      } catch (err) {
      console.error(err);
      alert("Error al crear la sala ❌");
      }
  }
  const obtenerDatos = () => {
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
  }
  useEffect(() => {
    obtenerDatos();
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
        <div className="contenedorBotonesAñadir">
          <button className="botonAgregarPlatos" onClick={abrirModalCrearCategoria}><span className="material-symbols-outlined">add</span>Agregar Categoria</button>
          <button className="botonAgregarPlatos" onClick={abrirModalCrearPlato}><span className="material-symbols-outlined">add</span>Agregar Plato</button>
        </div>

        </div>
        <Buscador buscar={setBusqueda}></Buscador>
        <div className="contenedorCategorias">
          {CategoriasConPlatos.length > 0 ? (
          CategoriasConPlatos.map((categoria) => (
            <CategoriasPlato
              key={categoria.id_categoria}
              id={categoria.id_categoria}
              nombre={categoria.tipo_categoria}
              platos={categoria.platos}
              ingredientes={true}
              admin={true}
              recargar={obtenerDatos}
            />
          ))
        ) : (
          <p className="nombreMensaje">No se encontraron platos con ese nombre</p>
        )}
        </div>
        <ModalCategorias abierto={isModalOpenCategorias} cerrado={cerrarModalCrearCategoria}>
          <>
            <h2 className="editarCategoriaH2">Crear Categoria</h2>
            <form className="formEditarCategoria"  onSubmit={enviarEdicionCategoria}>
              <div className="formNombreCategoria">
                <label htmlFor="">Nombre Categoria</label>
                <input type="text" value={nombreCategoria} onChange={(e) => setNombreCategoria(e.target.value)}/>
              </div>
                <input className="botonGuardar" type="submit" value="Guardar"/>
            </form>
            </>
        </ModalCategorias>
        <ModalPlatos abierto={isModalOpenPlatos} cerrado={cerrarModalCrearPlatos}>
          <>
                <h2>Crear Plato</h2>
                <form action="" className="formEditarPlato" onSubmit={enviarEdicionPlato}>
                    <div className="formNombrePlato">
                        <label htmlFor="">Nombre Plato</label>
                        <input type="text" value={nombrePlato}  onChange={(e) => setNombrePlato(e.target.value)}/>
                    </div>
                    <div className="formPrecioPlato">
                        <label htmlFor="">Precio Plato</label>
                        <input type="number" min="0" value={precioPlato} onChange={(e) => setPrecioPlato(e.target.value)}/>
                    </div>
                    <div className="formCategoriaPlato">
                        <label htmlFor="">Categoria Plato</label>
                        <select name="" id="" value={idcategoriaPlato} onChange={(e) => setIdCategoriaPlato(e.target.value)}>
                            {categorias.map((categoria) => (
                                <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.tipo_categoria}</option>
                            ))}
                        </select>
                    </div>
                    <div className="formDescripcionPlato">
                        <label htmlFor="">Descripcion Plato (Opcional)</label>
                        <textarea name="" id="" value={descripcionPlato} onChange={(e) => setDescripcionPlato(e.target.value)}></textarea>
                    </div>
                    <input className="botonGuardar" type="submit" value="Guardar"/>
                </form>
                </>
        </ModalPlatos>
    </section>
  );
}
