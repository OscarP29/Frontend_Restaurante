import MesaTarjeta from "./MesaTarjeta";

export default function Sala({ nombre, mesas }) {
  return (
    <section style={{ marginBottom: "30px" , marginLeft: "1rem"}}>
      <h2 style={{  margin: 0, marginBottom: "15px", color: "#333" }}>{nombre}</h2>

      {mesas.length == 0 ? (<p style={{ color: "#888", fontStyle: "italic", marginLeft: "1rem" }}>Mesas no creadas</p>):(
        <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {mesas.map((m) => (
          <MesaTarjeta key={m.id} id={m.id_mesa} numero={m.numero_mesa} estado={m.estado_mesa} />
        ))}
      </div>
      )}
    </section>
  );
}
