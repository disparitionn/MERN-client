import React, {Component} from 'react';
import '../App.css';
import {faHome} from "@fortawesome/free-solid-svg-icons";
import Avatar from "./UI/AvatarComponent";
import {Link} from "react-router-dom";
import SubmitButton from "./UI/SubmitButtonComponent";

class Home extends Component {

    render() {
        return (
            <div className="App">
                <Avatar icon={faHome}/>
                <span className="row justify-content-center"><h1>Home Page</h1></span>
                <span className="row justify-content-center"><h3>This is React app</h3></span>

                <span className="row justify-content-center">
                        <Link to="/login" className="nav-link"><SubmitButton buttonText={"Login"}/></Link>
                </span>
            </div>
        );
    }
}

export default Home;
