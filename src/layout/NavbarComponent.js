import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../img/logo.svg';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../actions/authActions";
import ProfileNavLink from "./UI/ProfileNavLink";
import {Navbar, Nav} from 'react-bootstrap';


class NavbarApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.setState({isAuth: true});
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.setState({isAuth: true});
        } else {
            this.setState({isAuth: false});
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>
                        <Link exact='true' to="/" className="nav-link navbar-brand">
                            <img src={logo} className="d-inline-block align-top logo-img" alt="Home Page"/>
                            MERN app
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">

                        {this.state.isAuth
                            ?
                            <>
                                <Nav className="mr-auto">
                                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                    <Link to="/edit-houses" className="nav-link">Edit houses</Link>
                                </Nav>
                                <ProfileNavLink/>
                                <button onClick={this.props.logoutUser} className="nav-btn btn">Logout</button>
                            </>
                            :
                            <Nav className="mr-auto">
                                <Link to="/sign-up" className="nav-link">Sign Up</Link>
                                <Link to="/login" className="nav-link">Login</Link>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }
}

NavbarApp.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    {logoutUser}
)(NavbarApp);
