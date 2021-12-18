import axios, {Method} from "axios";

export const executeRequest = (endpoint: string, method : Method, body? : any) => {
    const headers = {'Content-Type' : 'application/json'} as any;

    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        headers['Authorization'] = 'Bearer ' + accessToken;
    }

    const URL = 'http://localhost:3000/api/' + endpoint;
    console.log(`executando: ${URL}, metodo: ${method}, body: ${body}, header: ${headers}`);
    return axios.request({
        url: URL,
        method,
        data: body? body : '',
        headers,
        timeout: 30000
    })
}