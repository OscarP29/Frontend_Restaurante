import PlatosTarjeta from "./PlatosTarjeta"
import "../Css/CategoriasPlatos.css"
export default function CategoriasPlatos({boton, ingredientes, nombre, platos, admin}) {
  return (
    <section className="contenedorDeCategorias">
      <div className="contendedorEncabezadoCategoria">
        <div className="contenedorCategoria">
          <div></div>
          <h2 className="tituloCategoria">{nombre}</h2>
        </div>
        {admin && 
          <div className="contenedorBotonesAdmin">
            <button className="botonEditar"><span className="material-symbols-outlined text-gray-600">edit</span></button>
            <button className="botonEliminar"><span className="material-symbols-outlined text-gray-600">delete</span></button>
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
                    />
                  ))
                ) : (
                  <p style={{ color: "#999" }}>No hay Platos registrados</p>
                )}
      </div>
    </section>
  )
}
