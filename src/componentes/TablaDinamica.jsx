import "../Css/TablaDinamica.css"
import Modal from "../componentes/Modal"
import { useState } from 'react';

export default function TablaDinamica({columnas,datos,acciones}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fila, setFila] = useState(null)
    const [tipoModal, setModal] = useState()

    const AbrirModal = (filaSeleccionada) => {
      setModal("Ver")
      setIsModalOpen(true);
      setFila(filaSeleccionada)
    }
    const CerrarModal = () => {
      setFila(null)
      setIsModalOpen(false);
    }
    const finalizar = (filaSeleccionada) => {
      setModal("Finalizar")
      setIsModalOpen(true);
      setFila(filaSeleccionada)
    }
    const FuncionesBotones = {
      AbrirModal,   
      CerrarModal,
      finalizar,
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
              {tipoModal === "Ver" && fila ? (
              <ul>
                {Object.entries(fila).map(([clave, valor]) => (
                  <li key={clave}>
                    <strong>{clave}: </strong>
                    {valor}
                  </li>
                ))}
              </ul>
            ) : (null)}
            {tipoModal === "Finalizar" && 
              <>
              <div className="encabezadoModal">
              <div>
                  <div className="divDecoracion"></div>
                  <h3>Mesa 1</h3>
              </div>
              <p>Fecha : 2025-20-25 9:48</p>
              </div>
              <div className="contendorModal">
                  <TablaDinamica columnas={columnas} datos={datos}></TablaDinamica>
              </div>
              <p>Total a Pagar: <strong>$ 180.000 COP</strong></p>
              <div className="contenedorBotones">
                  <button className="botonListoModal">Finalizar</button>
                  <button className="botonCerrarModal" onClick={CerrarModal}>Cancelar</button>
              </div>
              </>
            }
            </Modal>
        </div>
    )
}