/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import { 
  DEFAULT_ACTION,
  CHANGE_EMAIL,
  CHANGE_PASSWORD
} from './constants';

export const initialState = {
  credential:{
    email:"",
    password:""
  }
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EMAIL:
        draft.email = action.payload;
        break;
      case CHANGE_PASSWORD:
        draft.password = action.payload;
        break;
    }
  });

export default loginReducer;
