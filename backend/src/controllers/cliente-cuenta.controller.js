import { pool } from "../db.js";

// API PARA OBTNER TODOS LOS REGISTROS DE LA TABLA CUENTAS-CIENTE
export const obtenerCuentasCliente = async (req, res) => {
    const {id} = req.params
    const [rows] = await pool.query("CALL obtenerCuentasCliente(?)", [id])
    res.json(rows)
}

// API PARA GUARDAR REGISTROS DE LA TABLA CUENTAS-CIENTE
export const guardarCuentaCliente = async (req, res) => {
    const {id_cliente} = req.body
    const {id_cuenta} = req.body
    const {saldo_actual} = req.body
    const {fecha_contratacion} = req.body
    const fecha_ultimo_movimiento = new Date()

    const [result] = await pool.query("CALL guardarCuentaCliente(?, ?, ?, ?, ?)", 
        [id_cliente, id_cuenta, saldo_actual, fecha_contratacion, fecha_ultimo_movimiento])
    res.json(result)    
}

// API PARA ELIMINAR TODOS LOS REGISTROS DE LA TABLA CUENTAS-CIENTE
export const eliminarCuentaCliente = async (req, res) => {
    const {id} = req.params
    const [rows] = await pool.query("CALL eliminarCuentaCliente(?)", [id])
    res.json(rows)
}