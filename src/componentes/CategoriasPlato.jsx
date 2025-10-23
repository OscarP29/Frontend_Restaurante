import PlatosTarjeta from "./PlatosTarjeta"

export default function CategoriasPlatos({ nombre, platos }) {
  return (
    <section style={{ margin: 0, marginLeft: "1rem" }}>
      <h1>{nombre}</h1>

      {platos.length === 0 ? (
        <p style={{ color: "#888", fontStyle: "italic", marginLeft: "1rem" }}>Platos no creados</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px"
          }}>
          {platos.map((p) => (
            <PlatosTarjeta
              key={p.id_plato}
              id={p.id_plato}
              nombre={p.nombre_plato}
              des={p.descripcion_plato}
              precio={p.precio_plato}
            />
          ))}
        </div>
      )}
    </section>
  )
}
