import {
    SET_CURRENT_USER,
    SET_USER_DATA,
    USER_LOADING
} from "../actions/types";

const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    user: {},
    userData: {},
    loading: false
};
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}