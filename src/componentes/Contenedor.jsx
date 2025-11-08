import Mesas from "../Paginas/Empleado/Mesas"
import Platos from "../Paginas/Empleado/Platos"
import Pedidos from "../Paginas/Empleado/Pedidos"
import Ventas from "../Paginas/Empleado/Ventas"
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
