import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { clienteRouter } from './routes/clienteRouter.js';
import { errorHandler } from './controllers/errorController.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { apiReference } from '@scalar/express-api-reference';

config({ path: "./config/.env" });

const app = express();

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Empleados",
            version: "1.0.0"
        },
        servers: [
            { url: "http://localhost:3000" }
        ]
    },
    apis: ["./routes/clienteRouter.js"]
};

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customCssUrl: 'https://unpkg.com/swagger-ui-themes@3.0.0/themes/3.x/theme-feeling-blue.css',
    swaggerOptions: {
        showExtensions: true
    }
}));


app.get('/api-docs-json', (req, res)=>{
    res.json(swaggerDocs)
});

app.use(
    '/reference',
    apiReference({
        // Put your OpenAPI url here:
        url: '/api-docs-json',
    }),
)
app.use('/', clienteRouter);
app.use(errorHandler);

app.listen(process.env.APP_PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.APP_PORT)
});

process.on('unhandledRejection', (error, promise) => {
    console.log('Error en este código: ', promise);
    console.log("==================================");
    console.log('El error fué: ', error );
});