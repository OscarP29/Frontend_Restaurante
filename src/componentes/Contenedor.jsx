import Mesas from "../Paginas/Mesas"
import Platos from "../Paginas/Platos"
import Pedidos from "../Paginas/Pedidos"
import Ventas from "../Paginas/Ventas"
import "../Css/Contenedor.css"

function Contenedor({ section }) {
  return (
    <main key={section}>
      {section === "mesas" && <Mesas />}
      {section === "platos" && <Platos />}
      {section === "pedidos" && <Pedidos />}
      {section === "ventas" && <Ventas />}
    </main>
  );
}

export default Contenedor;
