import type {NextApiRequest, NextApiResponse} from 'next';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { UserRequest } from '../../types/UserRequest';
import { connectDb} from '../../middlewares/connectDb';
import md5 from 'md5';
import { UserModel } from '../../models/UserModel';

const userEndpoint = async (req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {

    if(req.method === 'POST'){
        const body = req.body as UserRequest;

        if(!body.name || body.name.length < 2 ){
            return res.status(400).json({ error : 'Nome inválido'});
        }

        if(!body.email || body.email.length < 5 ){
            return res.status(400).json({ error : 'Email inválido'});
        }

        if(!body.password || body.password.length < 4 ){
            return res.status(400).json({ error : 'Senha inválida'});
        }

        const existingUserWithEmail = await UserModel.find({email : body.email});
        if(existingUserWithEmail && existingUserWithEmail.length){
            return res.status(400).json({ error : 'Já existe usuário com o email informado'});
        }

        const user = {
            name : body.name,
            email : body.email,
            password : md5(body.password)
        }

        await UserModel.create(user);
        return res.status(200).json({ msg : 'Usuario Criado'});
    }

    return res.status(405).json({ error : 'Metodo infomado não é valido'});
}

export default connectDb(userEndpoint);