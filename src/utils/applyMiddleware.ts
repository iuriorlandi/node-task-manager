import { Application } from 'express';

const applyMiddleware = (middlewares: any[], app: Application) =>{
    middlewares.forEach(middleware =>{
        app.use(middleware);
    });
};

export default applyMiddleware
