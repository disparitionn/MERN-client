import * as yup from "yup";

const ProfileSchema = yup.object().shape({
    age: yup.number(),
    new_password: yup.string()
        .min(8, "Must be longer than 8 characters"),
});
export default ProfileSchema;