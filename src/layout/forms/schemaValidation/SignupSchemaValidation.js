import * as yup from "yup";

const SignupSchema = yup.object().shape({
    email: yup.string()
        .email("Invalid email address")
        .required("Required"),
    username: yup.string()
        .min(3, "Must be longer than 2 characters")
        .required("Required"),
    password: yup.string()
        .min(8, "Must be longer than 8 characters")
        .required("Required"),
    repeated_password: yup.string()
        .required("Required")
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        }),
    /*age: yup.number()
        .max(2, "Max 2 characters, you can't be so old"),*/
});
export default SignupSchema;