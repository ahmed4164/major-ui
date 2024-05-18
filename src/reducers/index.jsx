// reducers/index.js
import { combineReducers } from 'redux';
import classroomReducer from './classroomReducer';

const rootReducer = combineReducers({
  classroom: classroomReducer,
  // Add more reducers here if needed
});

export default rootReducer;
