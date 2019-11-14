import React, {Component} from 'react';
import {Field, getIn} from "formik";

class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        //this.onChangeHandler = this.onChangeHandler.bind(this);
    };

    /*UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.setState({value: nextProps.value})
    }

    onChangeHandler = (e) => {
        this.setState({value: e.target.value})
    };*/

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
                                  /*value={this.state.value}
                                  onChange={this.onChangeHandler}*/
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