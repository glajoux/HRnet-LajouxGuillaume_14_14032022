import {
  LOAD_EMPLOYEE,
  LOAD_EMPLOYEE_SUCCES,
  LOAD_EMPLOYEE_ERROR,
  ADD_EMPLOYEE,
} from "../constants/constant";

export const loadEmployed = () => ({ type: LOAD_EMPLOYEE });
export const loadEmployedSucces = (data) => ({
  type: LOAD_EMPLOYEE_SUCCES,
  payload: data,
});
export const loadEmployedError = (error) => ({
  type: LOAD_EMPLOYEE_ERROR,
  payload: error,
});

export const addEmployee = (data) => ({ type: ADD_EMPLOYEE, payload: data });
