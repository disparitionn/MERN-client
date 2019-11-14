import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import LoginForm from "./layout/forms/LoginFormComponent";
import SignupForm from "./layout/forms/SignupFormComponent";
import Profile from "./layout/forms/ProfileComponent";
import Navbar from "./layout/NavbarComponent";
import Houses from "./layout/forms/HousesComponent";
import Home from "./layout/HomePageComponent";
import {Provider} from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./layout/PrivateRoute";
import Dashboard from "./layout/Dashboard";
import NotFound from "./layout/NotFoundComponent";


if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);

    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = "./login";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Navbar/>
                    {this.props.children}
                    <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/sign-up" component={SignupForm}/>
                            <Route path="/login" component={LoginForm}/>
                            <PrivateRoute exact path="/profile" component={Profile}/>
                            <PrivateRoute exact path="/edit-houses" component={Houses}/>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            <Route exact path="/404" component={NotFound} />
                            <Redirect to="/404" />
                    </Switch>
                </div>
            </Provider>
        );
    }
}

export default App;
