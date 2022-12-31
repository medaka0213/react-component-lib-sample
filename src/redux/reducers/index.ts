import { combineReducers } from '@reduxjs/toolkit';
import itemReducer from './itemReducer';

const appReducer = combineReducers({
  itemReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
