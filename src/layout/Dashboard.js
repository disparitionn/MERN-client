import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../actions/authActions";
import Avatar from "./UI/AvatarComponent";
import {faCat} from "@fortawesome/free-solid-svg-icons";

class Dashboard extends Component {

    render() {
        const {user} = this.props.auth;
        return (
            <div className="App">
                <Avatar icon={faCat}/>
                <span className="row justify-content-center"><h1>Hey {user.username},</h1></span>
                <span className="row justify-content-center"><h3>You are logged into the full-stack MERN app!</h3></span>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    {logoutUser}
)(Dashboard);