/*
 *
 * FormDocument actions
 *
 */

import { 
  DEFAULT_ACTION,
  CHANGE_DOKUMEN_KTP_ACTION,
  CHANGE_DOKUMEN_IDCARD_ACTION,
  // UPLOAD_DOKUMEN_ACTION,
  ADD_DOKUMEN_ACTION
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeDokumenKtpAction(dokumen) {
  return {
    type: CHANGE_DOKUMEN_KTP_ACTION,
    payload:dokumen
  };
}

export function changeDokumenIdcardAction(dokumen) {
  return {
    type: CHANGE_DOKUMEN_IDCARD_ACTION,
    payload:dokumen
  };
}

// export function uploadDokumenAction(key, file){
//   return {
//     type: UPLOAD_DOKUMEN_ACTION,
//     payload:{
//       key,
//       file
//     }
//   }
// }

export function addDokumenAction(key, file){
  return {
    type: ADD_DOKUMEN_ACTION,
    payload:{
      key,
      file
    }
  }
}
