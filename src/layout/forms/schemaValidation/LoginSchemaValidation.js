import * as yup from "yup";

const LoginSchema = yup.object().shape({
    username: yup.string()
        .min(3, "Must be longer than 2 characters")
        .required("Required"),
    password: yup.string()
        .min(8, "Must be longer than 8 characters")
        .required("Required"),
});
export default LoginSchema;