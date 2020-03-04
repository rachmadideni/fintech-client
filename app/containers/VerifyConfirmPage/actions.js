/*
 *
 * VerifyConfirmPage actions
 *
 */

import { 
  DEFAULT_ACTION,
  CHANGE_KODE_AKTIFASI_ACTION,
  KONFIRMASI_KODE_ACTION,
  KONFIRMASI_KODE_SUCCESS_ACTION,
  KONFIRMASI_KODE_ERROR_ACTION
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeKodeAktifasiAction(kode){
  return {
    type: CHANGE_KODE_AKTIFASI_ACTION,
    payload:kode
  }
}

export function konfirmasiKodeAction(){
  return {
    type:KONFIRMASI_KODE_ACTION
  }
}

export function konfirmasiKodeSuccessAction(){
  return {
    type:KONFIRMASI_KODE_SUCCESS_ACTION
  }
}

export function konfirmasiKodeErrorAction(error){
  return {
    type:KONFIRMASI_KODE_ERROR_ACTION,
    payload:error
  }
}