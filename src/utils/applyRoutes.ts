import { Application, Router } from 'express';

const applyRoutes = (routes: Router, app: Application) =>{
    app.use('/api', routes)
};

export default applyRoutes;