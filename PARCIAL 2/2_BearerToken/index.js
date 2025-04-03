import express from 'express';
import bearer from 'express-bearer-token';

const PORT = 3001;
const app = express();

app.use(bearer());

app.use((req, res, next) => {
    console.log(req.access_token)
    if(req.token === "token") {
        next();
    }
    else {
        res.status(401).json({ message: "Acceso no autorizado" })
    }
});

app.get("/saludo", (req, res) => {
    res.json({ message: "Mensaje enviado" });
});

app.listen(PORT, ()=>{
    console.log("Servidor en linea en el puerto: " + PORT);
});