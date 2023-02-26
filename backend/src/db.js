import {createPool} from "mysql2/promise";

// conexion a la base de datos
export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    port: 3306,
    database: "prueba_examen_db"
  })