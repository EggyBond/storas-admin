import {
    LOGIN } from "../constants/ActionTypes";


const initialState = {
    isLoggedin: false,
    email: "",
    type: "",
    fullName:"",
    phoneNo:"",
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log("test", action)
            return { ...state, isLoggedin: true, email: action.payload.email, type: action.payload.type, phoneNo: action.payload.phoneNo};

        default:
            return state;
    }
};
export default userReducer;