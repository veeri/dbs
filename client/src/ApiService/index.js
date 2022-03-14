import axios from 'axios'

const baseUrl = 'http://localhost:5000/'

export const ApiService = axios.create({
    baseURL : baseUrl
});

export const SetAuthToken = (token) => {
    if(token)
    {
        ApiService.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    else
    {
        delete ApiService.defaults.headers.common['Authorization'];
    }
}

export default ApiService;

