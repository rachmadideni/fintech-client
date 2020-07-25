/*
 *
 * ForgotPassword actions
 *
 */

import {   
  CEK_NIK_DAN_EMAIL,
  CEK_NIK_DAN_EMAIL_RESULT,
  LOG_SUCCESS_MESSAGE,
  MINTA_KODE_RESET,
  MINTA_KODE_RESET_SELESAI,
  KIRIM_EMAIL,
  KIRIM_EMAIL_RESULT
} from './constants';

export function kirimEmail(){
  return {
    type:KIRIM_EMAIL
  }
}

export function kirimEmailResult(){
  return {
    type:KIRIM_EMAIL_RESULT
  }
}

export function mintaKodeReset(){
  return {
    type:MINTA_KODE_RESET
  }
}

export function mintaKodeResetSelesai(kodeReset){
  return {
    type:MINTA_KODE_RESET_SELESAI,
    payload:kodeReset
  }
}

export function logSuccessMessage(successMessage){
  return {
    type:LOG_SUCCESS_MESSAGE,
    payload:{
      successMessage
    }
  }
}

export function cekNikDanEmail(nik, email) {
  return {
    type: CEK_NIK_DAN_EMAIL,
    payload:{
      nik,
      email
    }
  };
}

export function cekNikDanEmailResult(status, errorMessage) {
  return {
    type: CEK_NIK_DAN_EMAIL_RESULT,
    payload:{
      status,
      errorMessage
    }
  };
}
