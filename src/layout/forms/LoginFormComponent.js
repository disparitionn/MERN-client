import React, {Component} from "react";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import LoginSchema from "./schemaValidation/LoginSchemaValidation";
import {Link} from "react-router-dom";
import UserInput from "../UI/UserInputComponent";
import Avatar from "../UI/AvatarComponent";
import {Form, Formik} from "formik";
import SubmitButton from "../UI/SubmitButtonComponent";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class LoginForm extends Component {
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
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onSubmit = (message) => {
        this.setState({user: message});
        this.props.loginUser(message);
    };

    render() {
        return (
            <div className="center-block">
                <Avatar icon={faUser}/>
                <Formik
                    validationSchema={LoginSchema}
                    validateOnChange={false}
                    onSubmit={this.onSubmit}
                    initialValues={{}}>

                    <Form className="form-container form-control login-form col-md-6 col-lg-5">
                        <span className="row justify-content-center"><h2 className="login-h2">Login</h2></span>

                        <UserInput name={'username'} placeholder={'Username'} type={'text'}/>
                        <UserInput name="password" placeholder="Password" type="password"/>

                        <SubmitButton buttonText={"Login"}/>
                        <span className="row justify-content-center">
                            <p>Don't have an account? <Link to="/sign-up" className="text-link">Click here.</Link></p>
                        </span>
                    </Form>
                </Formik>
            </div>
        )
    }
}

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(LoginForm);