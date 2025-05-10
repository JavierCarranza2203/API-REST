import { Router } from "express";
import { AgregarCliente, ObtenerClientes } from '../controllers/clienteController.js';
import { errorInit } from "../controllers/errorController.js";
import halson from 'halson';

export const clienteRouter = Router()

/**
*   @swagger
*   /clientes:
*     get:
*       summary: Obtener uno o varios clientes
*       description: Devuelve un arreglo de clientes o un solo cliente obtenido por el ID enviado en el cuerpo
*       requestBody:
*         required: false
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                   description: ID del cliente. Si no se envía, se devuelven todos los clientes.
*       x-code-samples:
*         - lang: javascript
*           source: |
*             fetch("http://localhost:3000/clientes", {
*               method: "GET"
*             })
*             .then(response => response.json())
*             .then(data => console.log(data))
*             .catch(error => console.error('Error:', error));
*       responses:
*         200:
*           description: Cliente(s) encontrado(s)
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                     nombre:
*                       type: string
*                     telefono:
*                       type: string
*                     edad:
*                       type: integer
*/
clienteRouter.get('/clientes', async (req, res, next) => {
    try {
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