import React, {Component} from 'react';
import HousesSchema from "./schemaValidation/HousesSchemaValidation";
import Select from 'react-select'
import {faEdit, faSpinner} from "@fortawesome/free-solid-svg-icons";
import UserInput from "../UI/UserInputComponent";
import Avatar from "../UI/AvatarComponent";
import {Form, Formik} from "formik";
import SubmitButton from "../UI/SubmitButtonComponent";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {updateHouse, getAllHouses} from "../../actions/houseActions";
import {withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Houses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsHouses: {},
            selectedHouse: {},
        };
    };

    componentDidMount() {
        this.props.getAllHouses();
        setTimeout(()=>{
            this.setHouses();
        }, 3000)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    setHouses = () => {
        let houseData = this.props.houses.houseData;
        console.log('setHouses houseData', houseData)
        let houses = this.props.houses.houseData.map(item => {
            return {value: item.homeName, label: item.homeName};
        });
        this.setState({optionsHouses: houses});
    };

    handleHouseChange = async selectedHouse => {
        //this.clearRooms();
        await this.setState({selectedHouse: selectedHouse});
        console.log(this.state.selectedHouse)
        //this.setRooms();
    };

    onSubmit = (message) =>{
        console.log(message)
        this.props.updateHouse(message);
    };

    render() {
        let houseData = this.props.houses.houseData;
        const loading = !this.state.optionsHouses[0];
        houseData = houseData || {homeName: ''};

        return (
            <div className="center-block">
                <h2 className="row justify-content-center login-h2">{loading ? <FontAwesomeIcon icon={faSpinner} spin size="2x" /> : ""}</h2>
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
                                <UserInput type={"text"} placeholder={"New house name"} name="edit_house"/>
                                <UserInput type={"text"} placeholder={"New room name"} name="edit_room"/>
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
        getAllHouses: () => dispatch(getAllHouses())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Houses));