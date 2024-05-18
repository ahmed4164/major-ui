// actions/classroomActions.js
import { getClassrooms } from '../services/api/client';
import { FETCH_CLASSROOMS_SUCCESS, FETCH_CLASSROOMS_FAILURE } from './actionTypes';

export const fetchClassrooms = (userId) => {
  console.log('@@@userid',userId)
  return async (dispatch) => {
    try {
      const apiResponse = await getClassrooms(userId);
      console.log('@@apiResponse',apiResponse)
      if (apiResponse.isSuccess) {
        dispatch({
          type: FETCH_CLASSROOMS_SUCCESS,
          payload: apiResponse.classrooms,
        });
      } else {
        dispatch({
          type: FETCH_CLASSROOMS_FAILURE,
          payload: apiResponse.error,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_CLASSROOMS_FAILURE,
        payload: error.message,
      });
    }
  };
};
