/*
 *
 * FormAkadStep actions
 *
 */

import {
  GET_OPSI_DOKUMEN_ACTION,
  GET_OPSI_DOKUMEN_SUCCESS_ACTION,
  SUBMIT_FORM_AKAD_ACTION,
  SUBMIT_FORM_AKAD_SUCCESS_ACTION, 
  CHANGE_STSKWN_ACTION,
  CHANGE_NMPSGN_ACTION,
  CHANGE_TGLHRP_ACTION,
  CHANGE_NOKTPP_ACTION,
  CHANGE_JMLANK_ACTION,
  ADD_UPLOADED_ACTION,
  RESET_FORM_ACTION,
  RESET_FORM_SUCCESS_ACTION
} from './constants';

export function resetFormAction(){
  return {
    type: RESET_FORM_ACTION
  }
}

export function resetFormSuccessAction(initialState){
  return {
    type: RESET_FORM_SUCCESS_ACTION,
    payload:initialState
  }
}

export function getOpsiDokumenAction() {
  return {
    type: GET_OPSI_DOKUMEN_ACTION,
  };
}

export function getOpsiDokumenSuccessAction(opsi) {
  return {
    type: GET_OPSI_DOKUMEN_SUCCESS_ACTION,
    payload:opsi
  };
}

export function submitFormAkadAction(data) {
  return {
    type: SUBMIT_FORM_AKAD_ACTION,
    payload:data
  };
}

export function submitFormAkadSuccessAction() {
  return {
    type: SUBMIT_FORM_AKAD_SUCCESS_ACTION,
  };
}

export function addUploadedAction(idberk, file, objectURL){
  return {
    type:ADD_UPLOADED_ACTION,
    payload:{
      idberk,
      file,
      objectURL
    }
  }
}

export function changeStskwnAction(data) {
  return {
    type: CHANGE_STSKWN_ACTION,
    payload:data
  };
}

export function changeNmpsgnAction(data) {
  return {
    type: CHANGE_NMPSGN_ACTION,
    payload:data
  };
}

export function changeTglhrpAction(data) {
  return {
    type: CHANGE_TGLHRP_ACTION,
    payload:data
  };
}

export function changeNoktppAction(data) {
  return {
    type: CHANGE_NOKTPP_ACTION,
    payload:data
  };
}

export function changeJmlankAction(data) {
  return {
    type: CHANGE_JMLANK_ACTION,
    payload:data
  };
}
