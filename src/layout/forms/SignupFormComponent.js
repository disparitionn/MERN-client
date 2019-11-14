import React, {Component} from 'react';
import SignupSchema from "./schemaValidation/SignupSchemaValidation";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons/faUserPlus";
import {Link, withRouter} from "react-router-dom";
import UserInput from "../UI/UserInputComponent";
import {Form, Formik} from "formik";
import SubmitButton from "../UI/SubmitButtonComponent";
import Avatar from "../UI/AvatarComponent";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {registerUser} from "../../actions/authActions";

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onSubmit = (message) => {
        this.setState({user: message});
        this.props.registerUser(message, this.props.history);
    };

    render() {
        return (
            <div className="center-block">
                <Avatar icon={faUserPlus}/>
                <Formik
                    validationSchema={SignupSchema}
                    validateOnChange={false}
                    onSubmit={this.onSubmit}
                    initialValues={{}}>

                    <Form className="form-container form-control login-form col-md-6 col-lg-5">
                        <span className="row justify-content-center"><h2 className="login-h2">Sign Up</h2></span>

                        <UserInput type="text" placeholder="Username" name="username"/>
                        <UserInput type="password" placeholder="Password" name="password"/>
                        <UserInput type={"password"} placeholder={"Repeat Password"} name="repeated_password"/>
                        <UserInput type={"email"} placeholder={"E-mail"} name="email"/>
                        <UserInput type={"text"} placeholder={"Name"} name="name"/>
                        <UserInput type={"number"} placeholder={"Age"} name="age"/>

                        <SubmitButton buttonText={"Sign Up"}/>
                        <span className="row justify-content-center">
                            <p>Have an account? <Link to="/login" className="text-link">Click here.</Link></p>
                        </span>
                    </Form>
                </Formik>
            </div>
        )
    }
}

SignupForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {registerUser}
)(withRouter(SignupForm));
