/*
 *
 * Login actions
 *
 */

import { 
  CHANGE_EMAIL, 
  CHANGE_PASSWORD 
} from './constants';

export function changeEmailAction(payload){
  return {
    type:CHANGE_EMAIL,
    payload
  }
}

export function changePasswordAction(payload){
  return {
    type:CHANGE_PASSWORD,
    payload
  }
}
