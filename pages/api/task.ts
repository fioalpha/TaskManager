import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { connectDb } from '../../middlewares/connectDb';
import { jwtValidator } from '../../middlewares/jwtValidator';
import { TaskRequest } from '../../types/TaskRequest';
import moment from 'moment';
import { TaskModel } from '../../models/TaskModel';
import { GetTasksParams } from '../../types/GetTasksParams';

const taskEndpoint = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg | any>) => {

    const { userId } = req?.body || req?.query;

    switch (req.method) {
        case 'POST':
            return await saveTask(req, res, userId);
        case 'PUT':
            return await updateTask(req, res, userId);
        case 'DELETE':
            return await deleteTask(req, res, userId);
        case 'GET':
            return await getTasks(req, res, userId);
        default:
            return res.status(405).json({ error: 'Metodo infomado não é valido' });
    }
}

const validateBody = (body : TaskRequest, userId : string) => {
    if (!userId) {
        return 'Usuario não informado';
    }

    if (!body.name || body.name.length < 2) {
        return 'Nome inválido';
    }

    if (!body.previsionDate) {
        return 'Data inválida';
    }
}

const saveTask = async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
    const body = req.body as TaskRequest;

    const errorMsg = validateBody(body, userId);
    if(errorMsg){
        return res.status(400).json({ error: errorMsg });
    }

    const previsionDate = moment(body.previsionDate);
    const now = moment();
    now.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    if (previsionDate.isBefore(now)) {
        return res.status(400).json({ error: 'Data não pode ser menor que hoje' });
    }

    const task = {
        name: body.name,
        userId,
        previsionDate: previsionDate.toDate()
    }

    await TaskModel.create(task);
    return res.status(200).json({ msg: 'Tarefa Criada' });
}

const updateTask = async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
    const body = req.body as TaskRequest;

    const taskId = req?.query?.id;
    if (!taskId) {
        return res.status(400).json({ error: 'Tarefa não informada' });
    }

    const task = await TaskModel.findById(taskId);
    if(!task || task.userId !== userId){
        return res.status(400).json({ error: 'Tarefa não encontrada' });
    }

    const errorMsg = validateBody(body, userId);
    if(errorMsg){
        return res.status(400).json({ error: errorMsg });
    }

    const previsionDate = moment(body.previsionDate);
    
    task.name = body.name;
    task.previsionDate = previsionDate;
    task.finishDate = body.finishDate ? moment(body.finishDate) : null;

    await TaskModel.findByIdAndUpdate({ _id: task._id}, task);
    return res.status(200).json({ msg: 'Tarefa Alterada' });
}

const deleteTask = async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
    const taskId = req?.query?.id;
    if (!taskId) {
        return res.status(400).json({ error: 'Tarefa não informada' });
    }

    const task = await TaskModel.findById(taskId);
    if(!task || task.userId !== userId){
        return res.status(400).json({ error: 'Tarefa não encontrada' });
    }

    await TaskModel.findByIdAndDelete({ _id: task._id});
    return res.status(200).json({ msg: 'Tarefa Deletada' });
}

const getTasks = async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
   
    const params =  req.query as GetTasksParams;

    const query = {
        userId
    } as any;

    if(params?.previsionDateStart){
        const startDate = moment(params?.previsionDateStart).toDate();
        query.previsionDate = {$gte : startDate};
    }

    if(params?.previsionDateEnd){
        const endDate = moment(params?.previsionDateEnd).toDate();
        
        if(!query.previsionDate){
            query.previsionDate = {}
        }

        query.previsionDate.$lte = endDate;
    }

    if(params?.status){
        const status = parseInt(params?.status);
        switch(status){
            case 1 : query.finishDate = null;
                break;
            case 2 : query.finishDate = {$ne : null};
        }
    }

    const result = await TaskModel.find(query);
    return res.status(200).json(result);
}

export default connectDb(jwtValidator(taskEndpoint));