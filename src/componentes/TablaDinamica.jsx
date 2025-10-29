import "../Css/TablaDinamica.css"
import Modal from "../componentes/Modal"
import { useState } from 'react';

export default function TablaDinamica({columnas,datos,acciones}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fila, setFila] = useState(null)

    const AbrirModal = (filaSeleccionada) => {
      setIsModalOpen(true);
      setFila(filaSeleccionada)
    }
    const CerrarModal = () => {
      setFila(null)
      setIsModalOpen(false);
    }
    const FuncionesBotones = {
      AbrirModal,   
      CerrarModal,
    };
    const ReferenciasFunciones = (accionDescriptor, row) => {
    if (typeof accionDescriptor.onClick === "function") {
      return accionDescriptor.onClick(row);
    }
    if (accionDescriptor.handlerName && FuncionesBotones[accionDescriptor.handlerName]) {
      return FuncionesBotones[accionDescriptor.handlerName](row);
    }
    }
    return(

        <div className="contenedorTabla">
            <table className="tabla">
                <thead>
                    <tr>
                        {columnas.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
                 {acciones && <th className="tituloAcciones">Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                {datos.map((row, idx) => (
            <tr key={idx}>
              {columnas.map((col) => (
                <td key={col.key}>
                    <p className={col.className}>
                    {row[col.key]}</p>
                    </td>
              ))}
              {acciones && (
                <td className="acciones">
                  {acciones.map((accion, i) => (
                    <button className={accion.className}
                      key={i}
                      size="sm"
                      variant="ghost"
                      onClick={() => ReferenciasFunciones(accion, row)}
                    >
                      {accion.icon}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
            </tbody>
            </table>
            <Modal abierto={isModalOpen} cerrado={CerrarModal}>
              {fila ? (
              <ul>
                {Object.entries(fila).map(([clave, valor]) => (
                  <li key={clave}>
                    <strong>{clave}: </strong>
                    {valor}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay datos</p>
            )}
              <button onClick={CerrarModal}>ADIOS</button>
            </Modal>
        </div>
    )
}