import React, {Component} from 'react';
import {Field, getIn} from "formik";

class HouseInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
    };

    onChangeHandler = (e) => {
        if (!e.target.value) {
            return
        }
        let val = e.target.value;

        this.setState({value: val});
        this.props.onValChange(this.props.name, val);
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        console.log('UNSAFE_componentWillReceiveProps')
        this.setState({value: nextProps.value})
    }

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
                               value={this.state.value}
                               onChange={(e)=>this.onChangeHandler(e)}
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

export default HouseInput;