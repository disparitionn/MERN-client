import React, {Component} from 'react';
import '../App.css';
import {faHome} from "@fortawesome/free-solid-svg-icons";
import Avatar from "./UI/AvatarComponent";
import {Link} from "react-router-dom";
import SubmitButton from "./UI/SubmitButtonComponent";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../actions/authActions";

class Home extends Component {

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        return (
            <div className="App">
                <Avatar icon={faHome}/>
                <span className="row justify-content-center"><h1>Home Page</h1></span>
                <span className="row justify-content-center"><h3>This is React app</h3></span>

                <span className="row justify-content-center">
                        {this.props.auth.isAuthenticated
                            ? '' : <Link to="/login" className="nav-link"><SubmitButton buttonText={"Login"}/></Link> }
                </span>
            </div>
        );
    }
}

Home.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    {logoutUser}
)(Home);
