import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class Avatar extends Component {

    render() {
        return (
            <div className={"row justify-content-center avatar-div h-100 align-items-center"}>
                    <span className="align-middle">
                        <div className="avatar row justify-content-center">
                            <FontAwesomeIcon icon={this.props.icon} size="3x"/>
                        </div>
                    </span>
            </div>
        );
    }
}

export default Avatar;