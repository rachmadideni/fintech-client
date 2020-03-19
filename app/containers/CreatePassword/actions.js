/*
 *
 * CreatePassword actions
 *
 */

import { 
  DEFAULT_ACTION,
  CHANGE_PASSWORD_ACTION,
  CHANGE_PASSWORD_CONFIRM_ACTION,
  LOGIN_ERROR_ACTION,
  SUBMIT_PASSWORD_ACTION,
  SUBMIT_PASSWORD_SUCCESS_ACTION,
  SUBMIT_PASSWORD_ERROR_ACTION
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function submitPasswordAction() {
  return {
    type: SUBMIT_PASSWORD_ACTION,
  };
}

export function submitPasswordSuccessAction() {
  return {
    type: SUBMIT_PASSWORD_SUCCESS_ACTION,
  };
}

export function submitPasswordErrorAction(err) {
  return {
    type: SUBMIT_PASSWORD_ERROR_ACTION,
    payload:err
  };
}

export function changePasswordAction(data) {
  return {
    type: CHANGE_PASSWORD_ACTION,
    payload:data
  };
}

export function changePasswordConfirmAction(data) {
  return {
    type: CHANGE_PASSWORD_CONFIRM_ACTION,
    payload:data
  };
}

export function loginErrorAction(error){
  return {
    type:LOGIN_ERROR_ACTION,
    payload:error
  }
}
