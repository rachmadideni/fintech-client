/*
 *
 * ForgotPassword reducer
 *
 */
import produce from 'immer';
import {
  CEK_NIK_DAN_EMAIL,
  CEK_NIK_DAN_EMAIL_RESULT,
  LOG_SUCCESS_MESSAGE,
  MINTA_KODE_RESET_SELESAI,
  KIRIM_EMAIL_RESULT
} from './constants';

export const initialState = {
  isLoading:false,
  isNikDanEmailExist:false,
  error:{
    message:null
  },
  success:{
    message:null
  },
  kodeReset:null
};

/* eslint-disable default-case, no-param-reassign */
const forgotPasswordReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {      
      case CEK_NIK_DAN_EMAIL:        
        draft.isLoading = true;  
        return draft;
      case CEK_NIK_DAN_EMAIL_RESULT:        
        draft.isNikDanEmailExist = action.payload.status;
        draft.error.message = action.payload.errorMessage;  
        return draft;
      case LOG_SUCCESS_MESSAGE:
        draft.success.message = action.payload.successMessage;
        return draft;
      case MINTA_KODE_RESET_SELESAI:
        draft.kodeReset = action.payload;
        return draft;
      case KIRIM_EMAIL_RESULT:
        draft.isLoading = false;                
        return draft;
    }
  });

export default forgotPasswordReducer;
