import React, {Component} from 'react';
import HousesSchema from "./schemaValidation/HousesSchemaValidation";
import Select from 'react-select'
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import UserInput from "../UI/UserInputComponent";
import Avatar from "../UI/AvatarComponent";
import {Form, Formik} from "formik";
import SubmitButton from "../UI/SubmitButtonComponent";

class Houses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHouse: {value: "", label: ""},
            selectedRoom: {value: "", label: ""},
            optionsHouses: [],
            optionsRooms: [],
            newValue: {name: '', value: ''},
            newHouseValue: '',
            newRoomValue: '',
        };
        this.handleHouseChange = this.handleHouseChange.bind(this);
        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.editHouse = this.editHouse.bind(this);
        this.getNewValue = this.getNewValue.bind(this);
    };
    componentDidMount() {
        this.setHouses();

        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    updateDB = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        parseInt(idToUpdate);
        this.state.data.forEach((dat) => {
            if (dat.id === idToUpdate) {
                objIdToUpdate = dat._id;
            }
        });

        axios.post('http://localhost:3001/api/updateData', {
            id: objIdToUpdate,
            update: { message: updateToApply },
        });
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

    getNewRoomValue = e => {
        if (this.state.selectedRoom.value !== '') {
            this.setState({newRoomValue: e.target.value});
        }
    };

    editHouse = e => {
        let arr = this.state.home;
        let indexOfHouse = arr.findIndex(
            item => item.id === this.state.selectedHouse.value);
        arr[indexOfHouse].id = this.state.newValue.value;

        this.editRoom(arr, indexOfHouse);
        this.setState({home: arr});
        console.log('home', this.state.home);
        this.updateSelector();
    };

    editRoom = (arr, indexOfHouse) => {
        if (this.state.selectedRoom.value !== '') {
            let room = arr[indexOfHouse].rooms.findIndex(
                item => item.roomName === this.state.selectedRoom.value);
            arr[indexOfHouse].rooms[room].roomName = this.state.newRoomValue;
        }
    };

    updateSelector = async () => {
        await this.setState((state) => ({selectedHouse: {value: state.newValue.value, label: state.newValue.value}}));
        await this.setState((state) => ({selectedRoom: {value: state.newRoomValue, label: state.newRoomValue}}));

        //this.clearHouses();
        this.setHouses();
        this.setRooms();
    };

    onValChange = e => {
        this.setState({newValue: {value: e.target.value}});
        console.log('newValue', this.state.newValue)
    };

    setHouses = () => {
        let houses = this.state.home.map(item => {
            return {value: item.id, label: item.id};
        });
        this.setState({optionsHouses: houses});
    };

    handleHouseChange = async selectedHouse => {
        this.clearRooms();
        await this.setState({selectedHouse});
        this.setRooms();
    };

    clearHouses = () => {
        this.setState({selectedHouse: {value: "", label: ""}});
        this.setState({optionsHouses: []});
    };

    clearRooms = () => {
        this.setState({selectedRoom: {value: "", label: ""}});
        this.setState({optionsRooms: []});
    };

    setRooms = () => {
            let house = this.state.home.find(item => item.id === this.state.selectedHouse.value);
            let rooms = house.rooms.map(item => {
                return {value: item.roomName, label: item.roomName}
            });
            this.setState({optionsRooms: rooms});

    };

    handleRoomChange = selectedRoom => {
        this.setState({selectedRoom});
    };

    render() {

        return (

            <div className="center-block">
                <Avatar icon={faEdit}/>
                <Formik
                    validationSchema={HousesSchema}
                    validateOnChange={false}
                    onSubmit={this.putDataToDB}
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
                </Formik>
            </div>
        )
    }
}

export default Houses;