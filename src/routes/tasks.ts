import express, { Request, Response } from "express";

const router = express.Router();

router.get('/', (req: Request, res: Response) =>{
    res.json({message: 'List of tasks'});
});

router.post('/', (req: Request, res: Response) =>{
    res.json({message: 'Task created'});
});

router.put('/:taskId', (req: Request, res: Response) =>{
    res.json({message: 'Task updated'});
});

router.delete('/:taskId', (req: Request, res:Response) =>{
    res.json({message: 'Task deleted'});
});

export default router;