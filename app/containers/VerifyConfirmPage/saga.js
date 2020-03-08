import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  replace
} from 'connected-react-router';
import {
  KONFIRMASI_KODE_ACTION
} from './constants'
import {
  konfirmasiKodeSuccessAction,
  konfirmasiKodeErrorAction,
  logErrorAction
} from './actions';

export function* konfirmasiKode(){
  try {
    yield put(konfirmasiKodeSuccessAction());
    yield put(replace('/'));
    // yield put(logErrorAction(null))
  } catch(err){
    // yield put(logErrorAction('kode verifikasi tidak cocok!'))
    yield put(konfirmasiKodeErrorAction(err));
  }
}

// Individual exports for testing
export default function* verifyConfirmPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(KONFIRMASI_KODE_ACTION, konfirmasiKode)
}
