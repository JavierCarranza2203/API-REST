import express from 'express';
import JsonWebToken from 'jsonwebtoken'

const PORT = 3000;
const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
    const token = JsonWebToken.sign(req.body, "secret");

    res.status(200).json({ "access-token": token });
});

app.get("/saludo", (req, res) => {
    res.json({ message: "Mensaje enviado" });
});

app.listen(PORT, ()=>{
    console.log("Servidor en linea en el puerto: " + PORT);
});

function ValidarToken(req, res, next) {
    if(typeof(req.header.authorization) == "undefined") {
        res.status(401).json({ "error": "Acceso no autorizado" });
    }
    else {
        let token = req.headers.authorization.substring(7, req.headers.authorization.Length);

        JsonWebToken.verify(token, "secret", (err, decoded) => {
            if(err) {
                res.status(401).json({ "error": "Acceso no autorizado" });
            }
            else {
                next();
            }
        });
    }
}