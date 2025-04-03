import express from 'express';
import JsonWebToken from 'jsonwebtoken';
import https from 'https';
import * as fs from 'fs';

const options = {
    key: fs.readFileSync('./key_nopass.pem'),
    cert: fs.readFileSync('./cert.pem')
};

const PORT = 3000;
const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
    const token = JsonWebToken.sign(req.body, "secret", { expiresIn: '1h' });
    res.status(200).json({ "access-token": token });
});

app.get("/saludo", ValidarToken, (req, res) => {
    res.json({ message: "Mensaje enviado" });
});

https.createServer(options, app).listen(PORT, () => {
    console.log("Servidor en línea en el puerto: " + PORT);
});

function ValidarToken(req, res, next) {
    if (typeof req.headers.authorization === "undefined") {
        return res.status(401).json({ "error": "Acceso no autorizado" });
    }

    let token = req.headers.authorization.substring(7);

    JsonWebToken.verify(token, "secret", (err, decoded) => {
        if (err) {
            return res.status(401).json({ "error": "Acceso no autorizado" });
        }
        req.user = decoded; // Puedes almacenar los datos del usuario en req
        next();
    });
}