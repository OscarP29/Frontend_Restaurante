import PlatosTarjeta from "./PlatosTarjeta"
import "../Css/CategoriasPlatos.css"
export default function CategoriasPlatos() {
  return (
    <section>
      <div className="contenedorCategoria">
        <div></div>
        <h2 className="tituloCategoria">Almuerzos</h2>
      </div>
      <div className="contenedorPlatos">
        <PlatosTarjeta></PlatosTarjeta>
      </div>
    </section>
  )
}
