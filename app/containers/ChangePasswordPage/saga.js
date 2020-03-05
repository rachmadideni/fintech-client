import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
// import request from 'utils/request';
import { SUBMIT_CHANGED_PASSWORD_ACTION } from './constants'

import {
  submitChangePasswordSuccessAction,
  submitChangePasswordErrorAction,  
} from './actions'

import {
  makeSelectOldPassword,
  makeSelectNewPassword
} from './selectors'

export function* submitChangePassword(){
  
  const oldPassword = yield select(makeSelectOldPassword());
  const newPassword = yield select(makeSelectNewPassword());
  const metaData = JSON.stringify({
    userAgent: navigator.userAgent
  });

  const requestOpt = {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      // 'APPLICATION-ID':apps['mps_pwa'].id
    },
    body: JSON.stringify({
      oldPassword,
      newPassword,      
      metaData
    })
  };

  try {
    // const response = yield call(request, endpoint, requestOpt);
    yield put(submitChangePasswordSuccessAction());
    // yield put(push('/dashboard'));
  } catch(err){
    yield put(submitChangePasswordErrorAction(err))
  }
}

export default function* changePasswordPageSaga() {  
  yield takeLatest(SUBMIT_CHANGED_PASSWORD_ACTION, submitChangePassword)
}
