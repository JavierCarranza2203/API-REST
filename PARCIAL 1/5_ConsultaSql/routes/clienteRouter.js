import { Router } from "express";
import { AgregarCliente, ObtenerClientes } from '../controllers/clienteController.js';
import { errorInit } from "../controllers/errorController.js";
import halson from 'halson';

export const clienteRouter = Router()

clienteRouter.get('/clientes', async (req, res, next) => {
    try {
        return next(errorInit(404, "Error en el GET", 'GET Clientes'));
        const rows = await ObtenerClientes(req)

        if(rows.length == 0)
            return next(errorInit(404, "No encontrado"));
        else {
            const resource = halson({
                "clientes": rows
            })
            .addLink('self', 'http://localhost:3000/clientes')
            .addLink('pedidos', {
                title: 'Pedidos',
                href: 'http://localhost:3000/pedidos'
            });

            res.json(resource);
        }
    }
    catch(error) {
        next(error);
    }
});

clienteRouter.post('/clientes', async (req, res, next) => {
    try {
        await AgregarCliente(req)

        res.status(200).json({ message: 'El cliente se ha agregado' });
    }
    catch(error) {
        next(error);
    }
});