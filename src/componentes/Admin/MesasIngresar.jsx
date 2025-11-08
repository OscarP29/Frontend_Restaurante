export default function MesasIngresar(){
    return(
        <div className="contenedorFormulario">
            <div className="encabezadoMesas">
                <div></div>
                <h3>Crear Mesa</h3>
            </div>
            <form className="formMesas" action="">
                <div className="NumeroMesa">
                    <label >Numero de mesa</label>
                    <input type="text" name="numeroMesa" id="mesaNumero" placeholder="Ej: 4"/>
                </div>
                <div className="SalaMesa">
                    <label>Sala</label>
                    <select name="miCombo" id="miCombo" className="comboBoxSalas">
                        <option value="opcion1">Opción 1</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                    </select>
                </div>
                <input type="submit" value="Crear" className="botonCrear"/>
            </form>
            <div className="encabezadoMesas">
                <div></div>
                <h3>Crear Sala</h3>
            </div>
            <form action="" className="formMesas">
                <div className="NombreSala">
                    <label>NombreSala</label>
                    <input type="text" name="nombreSala" id="SalaNumero" placeholder="Ej: Segundo Piso"/>
                </div>
                <input type="submit" value="Crear" className="botonCrear"/>
            </form>
        </div>
    )
}