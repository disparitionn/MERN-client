import * as yup from "yup";

const HousesSchema = yup.object().shape({
    edit_house: yup.string()
        .min(1, "Must be longer than 1 characters"),
    edit_room: yup.string()
        .min(1, "Must be longer than 1 character")
});
export default HousesSchema;