import { Router } from "express"
import { eliminarCuentaCliente, guardarCuentaCliente, obtenerCuentasCliente } from "../controllers/cliente-cuenta.controller.js"
import { editarCliente, eliminarCliente, guardarCliente, listarClientes, obtenerCliente } from "../controllers/cliente.controller.js"
import { editarCuenta, eliminarCuenta, guardarCuenta, listarCuentas, obtenerCuenta } from "../controllers/cuenta.controller.js"

const router = Router()

// se van importando cada una de las urls con sus respectivos metodos para detendiendo delo que se requiera realizar con los registros
// API PARA METODOS DE CLIENTE
router.get("/clientes", listarClientes)
router.get("/clientes/:id", obtenerCliente)
router.post("/clientes", guardarCliente)
router.put("/clientes/:id", editarCliente)
router.delete("/clientes/:id", eliminarCliente)

// API PARA METODOS DE CUENTAS
router.get("/cuentas", listarCuentas)
router.get("/cuentas/:id", obtenerCuenta)
router.post("/cuentas", guardarCuenta)
router.put("/cuentas/:id", editarCuenta)
router.delete("/cuentas/:id", eliminarCuenta)

// API PARA METODOS DE LA TABLA DE RELACION
router.get("/cuentas_cliente/:id", obtenerCuentasCliente)
router.post("/cuentas_cliente", guardarCuentaCliente)
router.delete("/cuentas_cliente/:id", eliminarCuentaCliente)

export default router