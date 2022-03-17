import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import states from "../data/states";
import Select from "../components/Select";
// import Modal from "../components/modal/Modal";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/actions/actionEmployed";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "modal-gl-component/dist/index";

function CreateEmployee(props) {
  const dispatch = useDispatch();

  const departments = [
    "Sales",
    "Marketing",
    "Engineering",
    "Human Resources",
    "Legal",
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setBirthDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("AL");
  const [zipCode, setZipCode] = useState();
  const [department, setDepartment] = useState("Sales");
  const [id, setId] = useState(uuidv4());
  const [errorForumlaire, setErrorFormulaire] = useState(true);

  const [modal, setModal] = useState(false);

  const employeeToSaved = {
    id,
    firstName,
    lastName,
    dateOfBirth,
    startDate,
    street,
    city,
    state,
    zipCode,
    department,
  };

  const handleChangeDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleChangeState = (e) => {
    setState(e.target.value);
  };

  const closeModal = () => {
    setModal(!modal);
  };

  const resetFormulaire = () => {
    document.getElementById("create-employee").reset();
  };

  const submitFormulaire = () => {
    console.log(errorForumlaire);
    const employeToStore = {
      ...employeeToSaved,
      dateOfBirth: dateOfBirth
        ? `${dateOfBirth.getDate()}/${dateOfBirth.getMonth()}/${dateOfBirth.getFullYear()}`
        : "",
      startDate: startDate
        ? `${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`
        : "",
    };
    if (
      firstName === "" ||
      lastName === "" ||
      dateOfBirth === "" ||
      startDate === "" ||
      street === "" ||
      city === "" ||
      state === "" ||
      zipCode === "" ||
      department === ""
    ) {
      setErrorFormulaire(true);
      setModal(!modal);
    } else {
      setErrorFormulaire(false);
      dispatch(addEmployee(employeToStore));
      setId(uuidv4());
      setModal(!modal);
      resetFormulaire();
      setStartDate("");
      setBirthDate("");
    }
  };

  return (
    <div>
      <h1 className="title">HRnet</h1>
      <div className="main-container">
        <NavLink to="/liste">View Current Employees</NavLink>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />

          <label htmlFor="date-of-birth">Date of birth</label>
          <DatePicker
            selected={dateOfBirth}
            onChange={(date) => setBirthDate(date)}
            id="date-of-birth"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />

          <label htmlFor="start-date">Start date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            id="start-date"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />

          <fieldset className="adress">
            <legend>Adress</legend>
            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              onChange={(e) => {
                setStreet(e.target.value);
              }}
            />

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />

            <Select
              label="state"
              datas={states}
              change={(e) => handleChangeState(e)}
            />

            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
            />
          </fieldset>

          <Select
            label="department"
            datas={departments}
            change={(e) => handleChangeDepartment(e)}
          />
        </form>
        <button onClick={submitFormulaire}>Save</button>
      </div>
      <Modal state={modal} close={closeModal}>
        {errorForumlaire ? (
          <p>Merci de remplir tout les champs</p>
        ) : (
          <p>Employee Created!</p>
        )}
      </Modal>
    </div>
  );
}

export default CreateEmployee;
