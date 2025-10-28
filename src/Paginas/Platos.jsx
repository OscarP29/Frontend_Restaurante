import CategoriasPlato from "../componentes/CategoriasPlato";
import Buscador from "../componentes/Buscador";
import "../Css/PlatosTarjetas.css"

export default function Platos() {
  return (
    <section>
        <div className="encabezado">
        <h1>Mesas</h1>
        </div>
        <Buscador></Buscador>
        <CategoriasPlato/>
    </section>
  );
}
