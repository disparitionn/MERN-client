import React, {Component} from 'react';
import {Field, getIn} from "formik";

class UserInput extends Component {

    getStyles = (errors, fieldName) => {
        if (getIn(errors, fieldName)) {
            return {
                border: '1px solid red'
            }
        }
    };

    render() {
        return (
            <Field name={this.props.name}>
                   {({field, form: {touched, errors}}) => (
                       <div className={"row justify-content-center"}>
                           <input {...field} className="login-input"
                                  type={this.props.type}
                                  style={this.getStyles(errors, field.name)}
                                  placeholder={this.props.placeholder}
                           />
                           {touched[field.name] &&
                           errors[field.name] &&
                           <div className="error">{errors[field.name]}</div>}
                       </div>
                   )}
            </Field>
        );
    }
}

export default UserInput;