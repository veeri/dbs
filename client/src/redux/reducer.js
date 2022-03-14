import {
    SET_LOGGED_USER,
    SET_USER_LIST
} from './types';


const initialState = {
    loggedUser: {},
    userData : []
}

const _reducer = (state = initialState, { type, payload }) => {
    switch(type)
    {
        case SET_LOGGED_USER:
            return Object.assign({}, state, { loggedUser: payload });
        case SET_USER_LIST:
            return Object.assign({}, state, { userData: payload });
        default:  
            return state;
    }
}

export default _reducer;