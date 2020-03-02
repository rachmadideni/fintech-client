import {    
  put, 
  select,   
  all, 
  takeLatest,
  takeEvery
} from 'redux-saga/effects';

import validate from 'validate.js';

// helpers
import { calc_acceptable_installment } from '../PerhitunganAngsuran/helpers';

// selectors
import { makeSelectGaji } from '../FormSubmissionStep/selectors';
import { CHANGE_GAJI_ACTION } from '../PerhitunganAngsuran/constants';

// actions
import { setLimitAngsuranAction } from '../PerhitunganAngsuran/actions';
import { changeValidationMessageAction } from '../FormNasabah/actions';
import { uploadDokumenAction } from '../FormDocument/actions'

import { VALIDATE_INPUT_ACTION } from '../FormNasabah/constants';
import { UPLOAD_DOKUMEN_ACTION } from '../FormDocument/constants'

async function convertToBase64(file){
  try {
    const result = await new Promise((resolve,reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
    return result;
  } catch (e) {
    return file;
  }
}

export function* uploadDocument(action){
  const { key, file } = action.payload;
  // let base64File = yield convertToBase64(file);
  const localImageUrl = URL.createObjectURL(file);
  console.log(localImageUrl);
  yield put(uploadDokumenAction(key, file));
}

export function* setLimitAngsuran(){
  try {
        
    const gaji = yield select(makeSelectGaji());
    const limit_angsuran = calc_acceptable_installment(gaji)    
    yield put(setLimitAngsuranAction(limit_angsuran));

  } catch(err){
    console.log(err);
  }
}

export function* validateInput(action){
  try {
    
    console.log('form nasabah SAGA validasi payload: ', action);
    let isError = false;
    let errorMessage = null;

    const inputName = action.payload.inputName;
    const inputValue = action.payload.inputValue;
    if(validate.isEmpty(inputValue)){
      isError = true;
      switch(inputName){
        case 'fullname':
          errorMessage = 'nama lengkap tidak boleh kosong';
          console.log(errorMessage);
          break;
        case 'birthplace':
            errorMessage = 'tempat lahir tidak boleh kosong';
            break;
        case 'birthdate':
            errorMessage = 'tanggal lahir tidak boleh kosong';
            break;
        case 'address':
            errorMessage = 'Alamat tidak boleh kosong';
            break;
        case 'gender':
            errorMessage = 'jenis kelamin tidak boleh kosong';
            break;
        default:
          errorMessage = null;
          break;
        }
        yield put(changeValidationMessageAction(inputName, errorMessage));
      } else {
        yield put(changeValidationMessageAction(inputName, errorMessage));      
        return !isError;
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* formSubmissionStepSaga() {
  yield all([
    takeLatest(CHANGE_GAJI_ACTION, setLimitAngsuran),
    takeLatest(VALIDATE_INPUT_ACTION, validateInput),
    // takeLatest(UPLOAD_DOKUMEN_ACTION, uploadDocument)
  ]);
}
