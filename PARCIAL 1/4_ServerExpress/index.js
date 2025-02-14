import express from 'express'
import cors from 'cors';
import { config } from 'dotenv';
import path from 'node:path'
import process from "node:process";
import xmlparser from 'express-xml-bodyparser';
import multer from 'multer';

config({ path: "./config/.env" });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const app = express();
const upload = multer({ storage: storage});

app.use(express.json());
app.use(express.urlencoded());
app.use(xmlparser());

app.use(cors({
    origin: "http://localhost",
    methods: ["GET", "POST"]
}));

app.get('/alumnos/:control', (req, res)=>{
    console.log(req.params);
    res.json(req.params.control)
});

app.get('/sistemas/alumnos', (req, res)=>{
    console.log(req.query)
    res.json(req.query.control)
})

app.get('/inicio', (_req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
});

app.post('/', (req, res, next) => {
    console.log(req.body);
    res.send('Hello world')
});

app.post('/prefectos', (req, res)=>{
    const xml = req.body
    console.log(xml);
    res.json(xml)
});

app.patch('/prefectos',  upload.single('archivo'), (req, res)=>{
    
    console.log(req.body);

    res.json(`Hola, ${ req.body.nombre } el archivo se ha cargado`)
})

app.use((req, res) => {
    res.status(404).send("Error 404");
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.SERVER_PORT }`);
});