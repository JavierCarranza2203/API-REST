import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { clienteRouter } from './routes/clienteRouter.js';
import { halson } from 'halson';

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.get('/cliente', (req, res) => {
    const resource = 
});

app.listen(3000, ()=>{
    console.log('Servidor corriendo en el puerto ' + 3000)
});

process.on('unhandledRejection', (error, promise) => {
    console.log('Error en este código: ', promise);
    console.log("==================================");
    console.log('El error fué: ', error );
});