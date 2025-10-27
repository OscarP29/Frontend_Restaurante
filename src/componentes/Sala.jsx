import MesaTarjeta from "./MesaTarjeta";
import "../Css/Sala.css"
export default function Sala() {
  return (
    <section>
      <div className="contenedorSala">
        <div></div>
        <h2 className="tituloSala">Piso 1</h2>
      </div>
      <div className="contenedorMesas">
        <MesaTarjeta></MesaTarjeta>
      </div>
      </section>
  );
}
