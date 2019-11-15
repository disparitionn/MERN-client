import { combineReducers } from "redux";
import authReducer from "./authReducer";
import houseReducer from "./houseReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
    auth: authReducer,
    houses: houseReducer,
    errors: errorReducer
});