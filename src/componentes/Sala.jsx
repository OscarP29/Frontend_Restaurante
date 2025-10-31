import MesaTarjeta from "./MesaTarjeta";
import "../Css/Sala.css"
export default function Sala({nombre, mesas}) {
  return (
    <section className="sala">
      <div className="contenedorSala">
        <div></div>
        <h2 className="tituloSala">{nombre}</h2>
      </div>
      <div className="contenedorMesas">
        {mesas.length > 0 ? (
          mesas.map((m) => (
            <MesaTarjeta
              key={m.id_mesa}
              numero={m.numero_mesa}
              estado={m.estado_mesa}
            />
          ))
        ) : (
          <p style={{ color: "#999" }}>No hay mesas registradas</p>
        )}
      </div>
      </section>
  );
}
