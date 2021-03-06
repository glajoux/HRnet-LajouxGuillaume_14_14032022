import React, { useState, Suspense } from "react";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import states from "../data/states";
// import Select from "../components/Select";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/actions/actionEmployed";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "modal-gl-component/dist/index";

const Select = React.lazy(() => import("../components/Select"));

/**
 * It creates a form to create an employee.
 * @returns The return is a div with a form and a button. The form is used to create a new employee.
 * The button is used to submit the form.
 */
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
  const [zipCode, setZipCode] = useState("");
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

  /**
   * It sets the department value to the value of the target.
   */
  const handleChangeDepartment = (e) => {
    setDepartment(e.target.value);
  };

  /**
   * It sets the state of the component to the value of the input.
   */
  const handleChangeState = (e) => {
    setState(e.target.value);
  };

  /**
   * *This function is used to toggle the modal on and off.*
   */
  const closeModal = () => {
    setModal(!modal);
  };

  /**
   * Reset the form by removing all the values from the input fields
   */
  const resetFormulaire = () => {
    document.getElementById("create-employee").reset();
  };

  /**
   * * Set the errorFormulaire to false.
   * * Dispatch the addEmployee action to the store.
   * * Set the id to a new uuid.
   * * Set the modal to false.
   * * Reset the form.
   * * Set the startDate to an empty string.
   * * Set the birthDate to an empty string.
   */
  const submitFormulaire = () => {
    setErrorFormulaire(false);
    dispatch(addEmployee(employeeToSaved));
    setId(uuidv4());
    setModal(!modal);
    resetFormulaire();
    setStartDate("");
    setBirthDate("");
  };

  return (
    <div>
      <Suspense fallback={<div>Chargement...</div>}>
        <h1 className="title">HRnet</h1>
        <div className="main-container">
          <NavLink to="/liste">View Current Employees</NavLink>
          <h2>Create Employee</h2>
          <form action="#" id="create-employee">
            <label className="label" htmlFor="first-name">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />

            <label className="label" htmlFor="last-name">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />

            <label className="label" htmlFor="date-of-birth">
              Date of birth
            </label>
            <DatePicker
              selected={dateOfBirth}
              onChange={(date) => setBirthDate(date)}
              id="date-of-birth"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />

            <label className="label" htmlFor="start-date">
              Start date
            </label>
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
              <label className="label" htmlFor="street">
                Street
              </label>
              <input
                id="street"
                type="text"
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />

              <label className="label" htmlFor="city">
                City
              </label>
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

              <label className="label" htmlFor="zip-code">
                Zip Code
              </label>
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
      </Suspense>
    </div>
  );
}

export default CreateEmployee;
