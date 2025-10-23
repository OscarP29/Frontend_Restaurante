import { useState } from "react";
import Menu from "./componentes/Menu";
import Contenedor from "./componentes/Contenedor";

function App() {
  const [selectedSection, setSelectedSection] = useState("mesas");

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5", width: "100vw"}}>
      <Menu selected={selectedSection} onSelect={setSelectedSection} />
      <Contenedor section={selectedSection} />
    </div>
  );
}

export default App;
