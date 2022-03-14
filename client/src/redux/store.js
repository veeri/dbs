import { createStore, combineReducers, applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk'
import homeReducer from './reducer'

const All_reducers = combineReducers({
    home: homeReducer,
});

const store = createStore(All_reducers, 
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

export default store;