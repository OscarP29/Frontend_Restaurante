import "../Css/Encabezado.css"
import Sala from "../componentes/Sala";

export default function Mesas() {

  return (
    <section>
      <div className="encabezado">
        <h1>Mesas</h1>
        <div className="contenedorInfo">
          <div className="contenedorLibre">
            <div className="indicadorLibre"></div>
            <div className="mesasLibres">
              <p className="textoLibre">Libres: <strong>2</strong></p>
            </div>
          </div>
          <div className="contenedorOcupado">
            <div className="indicadorOcupado"></div>
              <div className="mesasOcupadas">
              <p className="textoOcupado">Ocupadas: <strong>1</strong></p>
            </div>
          </div>
        </div>
      </div>
      <Sala></Sala>
    </section>
  );
}
