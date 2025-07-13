import { Request, Response } from "express";
import { AppError } from "./index.js";

export const errorMiddleware = (err:Error,req:Request,res:Response) =>{
    if(err instanceof AppError){
        console.error(`Error: ${req.method} ${req.url} - ${err.message}`);
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            ...(err.details && { details: err.details } )
        })
    }

    console.log(`Unhandled Error: ${req.method} ${req.url} - ${err.message}`);
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        details: err.message
    });
}