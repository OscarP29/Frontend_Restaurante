import PlatosTarjeta from "./PlatosTarjeta"
import "../Css/CategoriasPlatos.css"
export default function CategoriasPlatos({boton, ingredientes}) {
  return (
    <section>
      <div className="contenedorCategoria">
        <div></div>
        <h2 className="tituloCategoria">Almuerzos</h2>
      </div>
      <div className="contenedorPlatos">
        <PlatosTarjeta boton={boton} ingredientes={ingredientes}></PlatosTarjeta>
      </div>
    </section>
  )
}
