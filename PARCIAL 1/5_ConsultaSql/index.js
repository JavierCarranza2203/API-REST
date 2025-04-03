import express from 'express';
import cors from 'cors';
import path from 'node:path';
import pug from 'pug';
import { config } from 'dotenv';
import { clienteRouter } from './routes/clienteRouter.js';
import { viewsRouter } from './routes/viewsRouter.js';
import { errorHandler } from './controllers/errorController.js';

config({ path: "./config/.env" });

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.set('view engine', 'pug');
app.set('views', "./views");

app.use('/', clienteRouter);
app.use('/', viewsRouter);

app.use(errorHandler);

app.listen(process.env.APP_PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.APP_PORT)
});

process.on('unhandledRejection', (error, promise) => {
    console.log('Error en este código: ', promise);
    console.log("==================================");
    console.log('El error fué: ', error );
});