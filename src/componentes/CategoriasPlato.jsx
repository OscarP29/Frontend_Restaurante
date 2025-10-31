import PlatosTarjeta from "./PlatosTarjeta"
import "../Css/CategoriasPlatos.css"
export default function CategoriasPlatos({boton, ingredientes, nombre, platos}) {
  return (
    <section className="contenedorDeCategorias">
      <div className="contenedorCategoria">
        <div></div>
        <h2 className="tituloCategoria">{nombre}</h2>
      </div>
      <div className="contenedorPlatos">
        {platos.length > 0 ? (
                  platos.map((p) => (
                    <PlatosTarjeta
                      key={p.id_plato}
                      nombre={p.nombre_plato}
                      des={p.descripcion_plato}
                      precio={p.precio_plato}
                      ingredientes={ingredientes}
                      boton={boton}
                    />
                  ))
                ) : (
                  <p style={{ color: "#999" }}>No hay mesas registradas</p>
                )}
      </div>
    </section>
  )
}
