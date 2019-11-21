import React, {Component} from 'react';
import HousesSchema from "./schemaValidation/HousesSchemaValidation";
import Select from 'react-select'
import {faEdit, faSpinner} from "@fortawesome/free-solid-svg-icons";
import HouseInput from "../UI/HouseInputComponent";
import Avatar from "../UI/AvatarComponent";
import {Form, Formik} from "formik";
import SubmitButton from "../UI/SubmitButtonComponent";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {updateHouse, getAllHouses, setCurrentHouse} from "../../actions/houseActions";
import {withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Houses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsHouses: {},
            selectedHouse: {},
            newValue: {name: '', value: ''},
        };
    };

    componentDidMount() {
        this.props.getAllHouses();
        setTimeout(() => {
            this.setHouses();
        }, 2000)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    setHouses = () => {
        let houses = this.props.houses.houseData.map(item => {
            return {value: item.id, label: item.homeName};
        });
        this.setState({optionsHouses: houses});
    };

    handleHouseChange = async selectedHouse => {
        //this.clearRooms();
        await this.setState({selectedHouse: selectedHouse});
        await this.props.setCurrentHouse(selectedHouse);
        //this.setRooms();
    };
    getNewValue = (name, value) => {
        console.log(name, value)
        let {newValue} = this.state;
        console.log('newValue', newValue)
        newValue.name = name;
        newValue.value = value;

        this.setState(newValue);
        console.log('newValue', newValue)
    };

    onValChange = e => {
        this.setState({newValue: {value: e.target.value}});
        console.log('newValue', this.state.newValue)
    };

    onSubmit = () => {
        console.log('777777',this.state.newValue, this.props.houses.house);
        let house = {
            newName: this.state.newValue.value,
            id: this.props.houses.house.value
        };
        this.props.updateHouse(house);
    };

    render() {
        const loading = !this.state.optionsHouses[0];

        return (
            <div className="center-block">
                <h2 className="row justify-content-center login-h2">{loading ?
                    <FontAwesomeIcon icon={faSpinner} spin size="2x"/> : ""}</h2>
                {!loading && <Avatar icon={faEdit}/>}
                {!loading && <Formik
                    validationSchema={HousesSchema}
                    validateOnChange={false}
                    onSubmit={this.onSubmit}
                    initialValues={{}}>

                    <Form className="form-container form-control login-form col-md-6 col-lg-5">
                        <span className="row justify-content-center"><h2 className="login-h2">Edit House</h2></span>

                        <div className="form-group col">
                            <div>
                                <label htmlFor="housesList">Select house:</label>
                                <Select options={this.state.optionsHouses} onChange={this.handleHouseChange}/>

                                <label htmlFor="roomsList">Select room:</label>
                                <Select options={this.state.optionsRooms} onChange={this.handleRoomChange}/>
                            </div>
                            <div>
                                <label htmlFor="editField">Edit house:</label>
                                <HouseInput type={"text"} placeholder={"New house name"} name="edit_house"
                                            //value={this.state.selectedHouse.label}
                                            onValChange={this.getNewValue}
                                />
                                <HouseInput type={"text"} placeholder={"New room name"} name="edit_room"/>
                                <SubmitButton buttonText={"Edit"}/>
                            </div>
                        </div>
                    </Form>
                </Formik>}
            </div>
        )
    }
}


Houses.propTypes = {
    updateHouse: PropTypes.func.isRequired,
    getAllHouses: PropTypes.func.isRequired,
    setCurrentHouse: PropTypes.func.isRequired,
    houses: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    houses: state.houses,
    errors: state.errors,
});

function mapDispatchToProps(dispatch) {
    return {
        updateHouse: message => dispatch(updateHouse(message)),
        setCurrentHouse: selectedHouse => dispatch(setCurrentHouse(selectedHouse)),
        getAllHouses: () => dispatch(getAllHouses())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Houses));