/*
 *
 * VerifyConfirmPage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_KODE_AKTIFASI_ACTION,
  LOG_ERROR_ACTION
} from './constants';

export const initialState = {
  kodeAktifasi:"",
  fromServer_activation_code:"123456",
  fromUser_activation_code:"",
  error:{
    message:null
  }

};

/* eslint-disable default-case, no-param-reassign */
const verifyConfirmPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {      
      case CHANGE_KODE_AKTIFASI_ACTION:{
        // draft.kodeAktifasi = action.payload;
        draft.fromUser_activation_code = action.payload;
        draft.error.message = null;
        return draft;
      }
      case LOG_ERROR_ACTION:
      draft.error.message = action.payload;  
      return draft;
    }
    return draft;
  });

export default verifyConfirmPageReducer;