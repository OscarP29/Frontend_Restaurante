import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Empleado from "./Vistas/Empleado";
import Login from "./Vistas/Login";
import Admin from "./Vistas/Admin"

function App() {
  const [usuario, setUsuario] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUsuario={setUsuario} />} />

        {usuario?.rol === "Empleado" && (
          <Route path="/empleado/*" element={<Empleado />} />
        )}

        {usuario?.rol === "Administrador" && (
          <Route path="/admin/*" element={<Admin />} />
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
