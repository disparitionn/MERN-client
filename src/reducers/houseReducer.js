import {
    SET_CURRENT_HOUSE,
    SET_HOUSE_DATA,
} from "../actions/types";

const initialState = {
    houseData: {},
    house: {},
};
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_HOUSE:
            console.log('action.payload',action.payload);
            return {
                ...state,
                house: action.payload,
            };
        case SET_HOUSE_DATA:
            return {
                ...state,
                houseData: action.payload,
            };
        default:
            return state;
    }
}