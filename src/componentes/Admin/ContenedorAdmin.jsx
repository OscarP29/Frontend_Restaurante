import Mesas from "../../Paginas/Admin/Mesas"
import Platos from "../../Paginas/Admin/Platos"
import Pedidos from "../../Paginas/Empleado/Pedidos"
import Ventas from "../../Paginas/Empleado/Ventas"
import "../../Css/Contenedor.css"

export default function ContenedorAdmin({ section }) {
  return (
    <main key={section}>
      {section === "mesas" && <Mesas />}
      {section === "platos" && <Platos />}
      {section === "pedidos" && <Pedidos />}
      {section === "ventas" && <Ventas />}
    </main>
  );
}


