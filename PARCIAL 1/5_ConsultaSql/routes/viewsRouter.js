import { Router } from "express";
import { error } from "node:console";

export const viewsRouter = Router();

viewsRouter.get('/saludo', (req, res, next) => {
    try {
        res.render('saludo', {
            saludo: "Hola, mundo desde pug"
        });
    }
    catch (error) {
        next(error);
    }
});