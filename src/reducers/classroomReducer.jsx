// reducers/classroomReducer.js
import { FETCH_CLASSROOMS_SUCCESS, FETCH_CLASSROOMS_FAILURE } from '../actions/actionTypes';

const initialState = {
  classrooms: [],
  error: null,
};

const classroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLASSROOMS_SUCCESS:
      return {
        ...state,
        classrooms: action.payload,
        error: null,
      };
    case FETCH_CLASSROOMS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default classroomReducer;
