import axios from "axios";
import {
    GET_ERRORS,
    SET_CURRENT_HOUSE,
    SET_HOUSE_DATA,
} from "./types";


export const updateHouse = (house) => dispatch => {
    let request = {
        id: house.id,
        newName: house.newName
    };
    console.log("ddd", request);
    axios
        .post("/api/houses/update", request)
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

export const setCurrentHouse = house => {
    return {
        type: SET_CURRENT_HOUSE,
        payload: house
    };
};
