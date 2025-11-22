import PlatosTarjeta from "./PlatosTarjeta"
import "../Css/CategoriasPlatos.css"
import Modal from "../componentes/Admin/ModalEditarAdmin.jsx"
import { useState } from "react";
export default function CategoriasPlatos({boton, ingredientes, nombre, platos, admin, id, recargar}) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipoModal, setModal] = useState();
  const [idCategoria, setIdCategoria] = useState("");
  const [nombreCategoria, setNombreCategoria] = useState("");

  const abrirModalEditar = () => {
      setIsModalOpen(true);
      setModal("editarCategoria")
      setIdCategoria(id);
      setNombreCategoria(nombre);
  }
  const enviarEdicionCategoria = async (e) => {
      e.preventDefault();
      const nuevaCategoria = {
          id_categoria: idCategoria,
          tipo_categoria: nombreCategoria
      };
      try {
      const res = await fetch("http://localhost:8080/CategoriasActualizar", {
          method: "PATCH",  
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevaCategoria),
      });
      if (!res.ok) throw new Error(`Error al editar categoria: ${res.status}`);
      alert("Categoria editada correctamente ✅");
      setIsModalOpen(false);
      recargar();
      }
      catch (err) {
      console.error(err);
      alert("Error al editar la categoria ❌");
      }
  }
  const enviarEliminarCategoria = async (e) => {
      e.preventDefault();
      const nuevaCategoria = {
          id_categoria: idCategoria,
          tipo_categoria: nombreCategoria
      };
      try {
      const res = await fetch("http://localhost:8080/CategoriasEliminar", {
          method: "DELETE",  
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevaCategoria),
      });
      if (!res.ok) throw new Error(`Error al editar categoria: ${res.status}`);
      alert("Categoria Eliminada correctamente ✅");
      setIsModalOpen(false);
      recargar();
      }
      catch (err) {
      console.error(err);
      alert("Error al editar la categoria ❌");
      }
  }
  const cerrarModal = () => {
      setIsModalOpen(false);
  }
  const abrirModalEliminar = () => {
      setIsModalOpen(true);
      setIdCategoria(id);
      setModal("eliminarCategoria")
  }
  return (
    <section className="contenedorDeCategorias">
      <div className="contendedorEncabezadoCategoria">
        <div className="contenedorCategoria">
          <div></div>
          <h2 className="tituloCategoria">{nombre}</h2>
        </div>
        {admin && 
          <div className="contenedorBotonesAdmin">
            <button className="botonEditar" onClick={abrirModalEditar}><span className="material-symbols-outlined text-gray-600">edit</span></button>
            <button className="botonEliminar" onClick={abrirModalEliminar}><span className="material-symbols-outlined text-gray-600">delete</span></button>
          </div>}
      </div>
      <div className="contenedorPlatos">
        {platos.length > 0 ? (
                  platos.map((p) => (
                    <PlatosTarjeta
                      key={p.id_plato}
                      plato={p}
                      nombre={p.nombre_plato}
                      des={p.descripcion_plato}
                      precio={p.precio_plato}
                      ingredientes={ingredientes}
                      boton={boton}
                      admin={admin}
                      recargar={recargar}
                    />
                  ))
                ) : (
                  <p style={{ color: "#999" }}>No hay Platos registrados</p>
                )}
      </div>
      <Modal abierto={isModalOpen} cerrado={cerrarModal}>
        {tipoModal === "editarCategoria" && (
            <>
            <h2 className="editarCategoriaH2">Editar Categoria</h2>
            <form className="formEditarCategoria"  onSubmit={enviarEdicionCategoria}>
              <div className="formNombreCategoria">
                <label htmlFor="">Nombre Categoria</label>
                <input type="text" value={nombreCategoria} onChange={(e) => setNombreCategoria(e.target.value)}/>
              </div>
                <input className="botonGuardar" type="submit" value="Guardar"/>
            </form>
            </>
        )}
        {tipoModal === "eliminarCategoria" && (
          <>
            {platos.length <= 0 ? (
              <div className="modalEliminar">
                <span className="material-symbols-outlined">warning</span>
                <h2 className="mensajeModal">¿Estas seguro?</h2>
                <div className="botonesModalEliminar">
                  <button className="botonEliminarModalEliminar" onClick={enviarEliminarCategoria}>Eliminar</button>
                  <button onClick={cerrarModal}>Cancelar</button>
                </div>
              </div>
            ) : (
              <div className="modalEliminar">
                <span className="material-symbols-outlined">warning</span>
                <h2 className="mensajeModal">Para eliminar la categoría debe estar vacía</h2>
              </div>
            )}
          </>
        )}     
      </Modal>
    </section>
  )
}
