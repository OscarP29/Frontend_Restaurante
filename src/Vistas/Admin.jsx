import { useState } from "react";
import Menu from "../componentes/Menu";
import Contenedor from "../componentes/Admin/ContenedorAdmin";
import Notificacion from "../componentes/Notificacion";

export default function Admin() {
  const [selectedSection, setSelectedSection] = useState("mesas");

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5", width: "100vw"}}>
      <Notificacion/>
      <Menu selecionado={selectedSection} enSelecion={setSelectedSection} />
      <Contenedor section={selectedSection} />
    </div>
  );
}


