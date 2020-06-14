import {
    LOGIN } from "../constants/ActionTypes";


const initialState = {
    isLoggedin: false,
    user: "test"
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state,
                isLoggedin: action.isLoggedin, user: action.user};

        default:
            return state;
    }
};
export default userReducer;