import cors from "cors";
import "./Database"
import 'reflect-metadata'
import "express-async-errors"
import { Rotas } from './routes';
import express, { NextFunction, Request, Response } from "express";

const Api = express();
Api.use(cors());

Api.use(express.json( { limit: "50mb" } ))

Api.use(Rotas)

Api.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        console.log(err.message)
        return response.status(400).json({
            error: err.message
        })
    }
    console.log("ERRO 500")
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

Api.listen(process.env.PORT || 8080, () => console.log(`Servidor Iniciado`));