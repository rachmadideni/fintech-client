import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  KONFIRMASI_KODE_ACTION
} from './constants'
import {
  konfirmasiKodeSuccessAction,
  konfirmasiKodeErrorAction
} from './actions';

export function* konfirmasiKode(){
  try {
    yield put(konfirmasiKodeSuccessAction());
  } catch(err){
    yield put(konfirmasiKodeErrorAction(err));
  }
}

// Individual exports for testing
export default function* verifyConfirmPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(KONFIRMASI_KODE_ACTION, konfirmasiKode)
}
