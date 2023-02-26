import { pool } from '../db.js'

// API PARA OBTENER TODOS LOS REGISTROS DE LA TABLA CUENTAS
export const listarCuentas = async (req, res) => {
    const [rows] = await pool.query("CALL listarCuentas()")
    res.json(rows)
}

// API PARA OBTENER UN REGISTRO EN ESPECIFICO DE LA TABLA CUENTAS
export const obtenerCuenta = async (req, res) => {
    const {id} = req.params
    const [rows] = await pool.query(`CALL obtenerCuenta(?)`, [id])
    res.json(rows[0])
}

// API PARA GUARDAR UN REGISTRO EN LA TABLA CUENTAS
export const guardarCuenta = async (req, res) => {
    console.log("entre");
    const {nombre_cuenta} = req.body

    const [rows] = await pool.query(`CALL guardarCuenta(?)`, [nombre_cuenta])

    res.send({
        id_cuenta: rows.insertId,
        nombre_cuenta: nombre_cuenta,
    })
}

// API PARA EDIATR UN REGISTRO EN ESPECIFICO DE LA TABLA CUENTAS
export const editarCuenta = async (req, res) => {
    const {id} = req.params
    const {nombre_cuenta} = req.body

    const [result] = await pool.query( `CALL editarCuenta(?, ?)`,[nombre_cuenta, id])
    
    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Employee not found'
    })
    
    res.sendStatus(200)
}

// API PARA ELIMINAR UN REGISTRO DE LA TABLA CUENTAS
export const eliminarCuenta = async (req, res) => {
    const {id} = req.params
    const [result] = await pool.query(`CALL eliminarCuenta(?)`, [id])

    if(result.affectedRows < 0){
        res.status(404).json({
            message: 'Employee not found'
        })
    }
    res.sendStatus(204)
}
