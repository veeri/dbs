import httpService, {SetAuthToken} from '../ApiService'
import { toast } from 'react-toastify';
import {SET_LOGGED_USER, SET_USER_LIST} from './types';


export const register_action = (data) => {
    return dispatch => {
        return httpService.post('register', data).then(response => {
                const {data}  = response;
                if(!data.error)
                {
                    toast.success(data.message);
                }
                else
                {
                    toast.error(data.message);
                }
            })
            .catch(err => {
                toast.error(err)
            })
    }
}

export const login_action = (data) => {
    return dispatch => {
        return httpService.post('login', data).then(response => {
                const {data}  = response;
                if(!data.error)
                {
                    localStorage.setItem('user', JSON.stringify(data.data[0]));
                    SetAuthToken(data.token)
                    localStorage.setItem('auth_token', data.token);
                }
                else
                {
                    toast.error(data.message);
                }
            })
            .catch(err => {
                toast.error(err)
            })
    }
}

export const getUserData_action = (data) => {
    return dispatch => {
        return httpService.get('getUsers', data).then(response => {
                const {data}  = response;
                if(! data.error)
                {
                    dispatch(setUserObject(data));
                }
                else
                {
                    dispatch(setUserObject([]));
                    toast.error(data.message);
                }
            })
            .catch(err => {
                toast.error(err);
            })
    }
}

export const setloggedUser = (data) => {
    return {
        type : SET_LOGGED_USER,
        payload : data
    }
}
export const setUserObject = (data) => {
    return {
        type : SET_USER_LIST,
        payload : data
    }
}