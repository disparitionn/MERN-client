import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCat} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";

class ProfileNavLink extends Component {

    render() {
        const {user} = this.props.auth;
        return (
            <div className={"row nav-avatar-div h-100 align-items-center"}>
                        <div className="nav-avatar row justify-content-center">
                            <FontAwesomeIcon icon={faCat} size="1x"/>
                        </div>
                <Link to="/profile" className="nav-avatar-link">user {user.username}</Link>
            </div>
        );
    }
}

ProfileNavLink.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    {logoutUser}
)(ProfileNavLink);
