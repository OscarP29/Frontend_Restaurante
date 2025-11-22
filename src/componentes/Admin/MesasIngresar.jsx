import { useEffect, useState } from "react"

export default function MesasIngresar(){
    const [salas, setSalas] = useState([]);
    const [mesas, setMesas] = useState([]);
    const [numeroMesa, setNumeroMesa] = useState("");
    const [idSala, setIdSala] = useState(1);
    const [nombreSala, setNombreSala] = useState("");

    const ObtenerSalas = () =>{
        fetch("http://localhost:8080/Salas")
        .then((res) => {
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
        })
        .then((data) => {
        setSalas(data);
        })
        .catch((err) => {
        console.error("Error al cargar datos:", err);
        });
    }
    const ObtenerMesas = () =>{
        fetch("http://localhost:8080/Mesas")
        .then((res) => {
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
        })
        .then((data) => {
        setMesas(data);
        })
        .catch((err) => {
        console.error("Error al cargar datos:", err);
        });
    }
    const enviarFormularioMesa = async (e) => {
        e.preventDefault();
        if (!numeroMesa || !idSala) {
            alert("Por favor, completa todos los campos");
            return;
        }
        if (mesas.filter((mesa) => mesa.numero_mesa === parseInt(numeroMesa)).length > 0) {
            alert("El número de mesa ya existe");
            return;
        }

        const nuevaMesa = {
            id_mesa : 0,
            numero_mesa: numeroMesa,
            estado_mesa: false,
            id_sala: parseInt(idSala),
        };
        try {
        const res = await fetch("http://localhost:8080/MesasInsertar", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaMesa),
        });

        if (!res.ok) throw new Error(`Error al crear mesa: ${res.status}`);
        alert("Mesa creada correctamente ✅");
        setNumeroMesa("");
        setIdSala("");

        } catch (err) {
        console.error(err);
        alert("Error al crear la mesa ❌");
        }
    }
    const enviarFormularioSala = async (e) => {
        e.preventDefault();
        if (!nombreSala) {
            alert("Por favor, completa todos los campos");
            return;
        }
        const nuevaSala = {
            id_sala : 0,
            nombre_sala: nombreSala,
        };
        try {
        const res = await fetch("http://localhost:8080/SalasInsertar", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaSala),
        });

        if (!res.ok) throw new Error(`Error al crear sala: ${res.status}`);
        alert("Sala creada correctamente ✅");
        setNombreSala("");
        setIdSala("");
        ObtenerSalas();

        } catch (err) {
        console.error(err);
        alert("Error al crear la sala ❌");
        }
    }
    useEffect(() => {
       ObtenerSalas()
       ObtenerMesas()
    }, [])

    return(
        <div className="contenedorFormulario">
            <div className="encabezadoMesas">
                <div></div>
                <h3>Crear Mesa</h3>
            </div>
            <form className="formMesas" action="" onSubmit={enviarFormularioMesa}>
                <div className="NumeroMesa">
                    <label>Numero de mesa</label>
                    <input type="number" name="numeroMesa" id="mesaNumero" placeholder="Ej: 4" value={numeroMesa} onChange={(e) => setNumeroMesa(e.target.value)}/>
                </div>
                <div className="SalaMesa">
                    <label>Sala</label>
                    <select name="miCombo" id="miCombo" className="comboBoxSalas" value={idSala} onChange={(e) => setIdSala(e.target.value)}>
                        {salas.map((sala) => (
                            <option key={sala.id_sala} value={sala.id_sala}>{sala.nombre_sala}</option>
                        ))}
                    </select>
                </div>
                <input type="submit" value="Crear" className="botonCrear"/>
            </form>
            <div className="encabezadoMesas">
                <div></div>
                <h3>Crear Sala</h3>
            </div>
            <form action="" className="formMesas" onSubmit={enviarFormularioSala}>
                <div className="NombreSala">
                    <label>NombreSala</label>
                    <input type="text" name="nombreSala" id="SalaNumero" placeholder="Ej: Segundo Piso" value={nombreSala} onChange={(e) => setNombreSala(e.target.value)}/>
                </div>
                <input type="submit" value="Crear" className="botonCrear"/>
            </form>
        </div>
    )
}