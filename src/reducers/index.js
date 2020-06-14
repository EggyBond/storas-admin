import { combineReducers } from 'redux';

// Import custom components
import userReducer from './user';


const rootReducer = combineReducers({
    user: userReducer
});

export default rootReducer;