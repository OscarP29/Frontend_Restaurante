import Mesas from "../Paginas/Mesas";
import Platos from "../Paginas/Platos"

function Contenedor({ section }) {
  return (
    <main style={{ flex: 1, padding: "0 0 1rem",  overflowY: "scroll", overflowX: "hidden" }}>
      {section === "mesas" && <Mesas />}
      {section === "platos" && <Platos />}
    </main>
  );
}

export default Contenedor;
