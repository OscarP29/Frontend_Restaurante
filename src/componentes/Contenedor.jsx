import Mesas from "../Paginas/Mesas";
import Platos from "../Paginas/Platos"
import "../Css/Contenedor.css"

function Contenedor({ section }) {
  return (
    <main key={section}>
      {section === "mesas" && <Mesas />}
      {section === "platos" && <Platos />}
    </main>
  );
}

export default Contenedor;
