import CategoriasPlato from "../componentes/CategoriasPlato";
import "../Css/PlatosTarjetas.css"

export default function Platos() {
  return (
    <section>
        <div className="encabezado">
        <h1>Mesas</h1>
        </div>
        <form className="buscador" action="">
            <div className="contenedorIcon">
                <span className="material-symbols-outlined">search</span>
            </div>    
            <input className="buscador-text" type="text" name="" id="BuscarPlato" placeholder="Buscar"/>
        </form>
        <CategoriasPlato/>
    </section>
  );
}
