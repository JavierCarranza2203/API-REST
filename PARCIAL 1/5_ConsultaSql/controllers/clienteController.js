import { pool } from "./dbConnection.js";

export async function ObtenerClientes(req) {
    let rows;
    let query = 'SELECT * FROM clientes';

    if(typeof(req.body.id) == 'undefined')
        [rows, ] = await pool.query(query, req.body.id)
    else
        [rows, ] = await pool.query(`${ query } WHERE id = ?`, req.body.id)

    return rows;
}

export async function AgregarCliente(req) {
    const [rows, fields] = await pool.query('INSERT INTO Clientes (nombre, telefono, edad) VALUES(?, ?, ?)', [req.body.nombre, req.body.telefono, req.body.edad]);
}