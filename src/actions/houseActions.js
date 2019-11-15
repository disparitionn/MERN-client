import axios from "axios";
import {
    GET_ERRORS,
    SET_CURRENT_HOUSE,
    SET_HOUSE_DATA,
} from "./types";


export const updateHouse = houseData => dispatch => {
    axios
        .post("/api/houses/update", houseData)
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const getAllHouses = () => dispatch => {
    axios
        .get('/api/houses/getAllHouses')
        .then(resp => dispatch({
            type: SET_HOUSE_DATA,
            payload: resp.data
        }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const setCurrentHouse = decoded => {
    return {
        type: SET_CURRENT_HOUSE,
        payload: decoded
    };
};
