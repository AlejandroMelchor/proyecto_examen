import { pool } from '../db.js'

// API PARA OBTENER TODOS LOS REGISTROS DE LA TABLA CLIENTES
export const listarClientes = async (req, res) => {
    const [rows] = await pool.query("CALL listarClientes()")
    res.json(rows)
}

// API PARA OBTENER UN REGISTRO EN ESPECIFICO DE LA TABLA CLIENTES
export const obtenerCliente = async (req, res) => {
    const {id} = req.params
    const [rows] = await pool.query(`CALL obtenerCliente(?)`, [id])
    res.json(rows[0])
}

// API PARA GUARDAR UN NUEVO REGISTRO EN LA TABLA CLIENTES
export const guardarCliente = async (req, res) => {
    const {nombre} = req.body
    const {apellido_paterno} = req.body
    const {apellido_materno} = req.body
    const {rfc} = req.body
    const {curp} = req.body
    const {fecha_alta} = req.body

    const [rows] = await pool.query(`CALL guardarCliente(?, ?, ?, ?, ?, ?)`, 
        [nombre, apellido_paterno, apellido_materno, rfc, curp, fecha_alta])

    res.send({
        id_cliente: rows.insertId,
        nombre: nombre,
        apellido_paterno: apellido_paterno,
        apellido_materno: apellido_materno,
        rfc: rfc,
        curp: curp,
        fecha_alta: fecha_alta
    })
}

// API PARA EDITAR UN REGISTRO EN ESPECIFICO DE LA TABLA CLIENTES
export const editarCliente = async (req, res) => {
    const {id} = req.params
    const {nombre} = req.body
    const {apellido_paterno} = req.body
    const {apellido_materno} = req.body
    const {rfc} = req.body
    const {curp} = req.body
    const {fecha_alta} = req.body

    const [result] = await pool.query( `CALL editarCliente(?, ?, ?, ?, ?, ?, ?)`,
        [nombre, apellido_paterno, apellido_materno, rfc, curp, fecha_alta, id])
    
    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Employee not found'
    })
    
    res.sendStatus(200)
}

// API PARA ELIMINAR UN REGISTRO DE LA TABLA CLIENTES
export const eliminarCliente = async (req, res) => {
    const {id} = req.params
    const [result] = await pool.query(`CALL eliminarCliente(?)`, [id])

    if(result.affectedRows < 0){
        res.status(404).json({
            message: 'Employee not found'
        })
    }
    res.sendStatus(204)
}
