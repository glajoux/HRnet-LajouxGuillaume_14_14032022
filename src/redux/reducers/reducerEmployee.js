import {
  LOAD_EMPLOYEE,
  LOAD_EMPLOYEE_SUCCES,
  LOAD_EMPLOYEE_ERROR,
  ADD_EMPLOYEE,
} from "../constants/constant";
import produce from "immer";

const initialState = {
  isLoading: false,
  employe: [],
  error: null,
};

const reducerEmployee = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_EMPLOYEE: {
        draft.isLoading = true;
        return;
      }
      case LOAD_EMPLOYEE_SUCCES: {
        draft.employe = action.payload;
        draft.isLoading = false;
        return;
      }
      case LOAD_EMPLOYEE_ERROR: {
        draft.isLoading = false;
        draft.employe = [];
        draft.error = action.payload;
        return;
      }
      case ADD_EMPLOYEE: {
        draft.employe.push(action.payload);
        return;
      }
      default:
        return;
    }
  });
};

export default reducerEmployee;
