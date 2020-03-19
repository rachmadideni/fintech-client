/*
 *
 * CreatePassword reducer
 *
 */
import produce from 'immer';
import { 
  DEFAULT_ACTION,
  CHANGE_PASSWORD_ACTION,
  CHANGE_PASSWORD_CONFIRM_ACTION,
  LOGIN_ERROR_ACTION
} from './constants';

export const initialState = {
  password:"",
  password_confirm:"",
  error:{
    message:null
  }
};

/* eslint-disable default-case, no-param-reassign */
const createPasswordReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_PASSWORD_ACTION:{
        draft.password = action.payload
        break;
      }        
      case CHANGE_PASSWORD_CONFIRM_ACTION:{
        draft.password_confirm = action.payload
        break;
      }        
      case LOGIN_ERROR_ACTION:{
        draft.error.message = action.payload
        break;
      }        
    }    
    return draft;
  });

export default createPasswordReducer;
