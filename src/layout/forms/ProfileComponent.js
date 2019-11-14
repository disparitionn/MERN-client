import React, {Component} from 'react';
import ProfileSchema from "./schemaValidation/ProfileSchemaValidation";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";
import UserInput from "../UI/UserInputComponent";
import Avatar from "../UI/AvatarComponent";
import {Form, Field, Formik} from "formik";
import SubmitButton from "../UI/SubmitButtonComponent";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {updateUser, getUser} from "../../actions/authActions";
import {withRouter} from "react-router-dom";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: '',
            loading: true,
            user: {
                name: '',
                age: '',
                gender: '',
            },
            newValue: '',
        };
    }

    componentDidMount() {
        this.props.getUser();
        setTimeout(()=>{
            this.setState({test: '4564545'})
        }, 2000)

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let userData = nextProps.auth.userData;
        this.setState({user: userData});

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onSubmit = (message) => {
        console.log(message)
        this.props.updateUser(message);
    };

    render() {
        let userData = this.props.auth.userData;
        const loading = !!userData._id ? false : true;
        userData = userData || {name: '', age: ''};
        console.log('AAAAAAAAAA', userData, loading)
        const name = userData.name ;
        return (
            <div className="center-block">
                <h1>{loading ? "LOADING....." : ""}</h1>
                {!loading && <Avatar icon={faUserEdit}/>}
                {!loading && <Formik
                    validationSchema={ProfileSchema}
                    validateOnChange={false}
                    onSubmit={this.onSubmit}
                    initialValues={{name: name , age: userData.age || '', gender: userData.gender || 'Not Specified' }}
                >
                    <Form className="form-container form-control login-form col-md-6 col-lg-5">
                        <span className="row justify-content-center"><h2 className="login-h2">Personal data</h2></span>

                        <UserInput type={"text"}
                                   placeholder={"Name"}
                                   name="name"
                        />
                        <UserInput type={"number"}
                                   placeholder={"Age"}
                                   name="age"
                        />

                        <div className="row justify-content-center radio-check">
                            <div className="form-check  form-check-inline">
                                <Field type="radio" className="form-check-input" name="gender" id="Not-Specified"
                                       value="Not Specified"
                                />
                                <label className="form-check-label" htmlFor="Not-Specified">Not Specified</label>
                            </div>
                            <div className="form-check  form-check-inline">
                                <Field type="radio" className="form-check-input" id="Female" name="gender" value="Female"/>
                                <label className="form-check-label" htmlFor="Female">Female</label>
                            </div>
                            <div className="form-check  form-check-inline">
                                <Field type="radio" className="form-check-input" name="gender" id="Male" value="Male"/>
                                <label className="form-check-label" htmlFor="Male">Male</label>
                            </div>
                        </div>

                        <hr/>
                        <UserInput type={"password"} placeholder={"Password"} name="password"/>
                        <UserInput type={"password"} placeholder={"New password"} name="new_password"/>
                        <SubmitButton buttonText={"Edit"}/>
                    </Form>
                </Formik>}
            </div>
        )
    }
}

Profile.propTypes = {
    updateUser: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

function mapDispatchToProps(dispatch) {
    return {
        updateUser: message => dispatch(updateUser(message)),
        getUser: () => dispatch(getUser())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Profile));