import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'environments';
import { 
  LOGIN_ACTION,
  TEST_TOKEN_LOGIN
} from './constants';

import {
  REMOVE_AUTH_TOKEN_ACTION
} from '../App/constants';

import {
  makeSelectCredential
} from '../Login/selectors';

import { 
  setAuthTokenAction, 
  removeAuthTokenAction,
  setNikAction,
  setEmailAction,
  setNotelpAction
} from '../App/actions';

import {
  loginSuccessAction,
  loginErrorAction
} from './actions';

import { 
  setTokenInStorage,  
  removeTokenInStorage
} from './helpers';

import messages from './messages'

export function* login(){
  
    const { nik, password } = yield select(makeSelectCredential());
    const metadata = JSON.stringify({
      userAgent: navigator.userAgent,
      isAndroid: /(android)/i.test(navigator.userAgent)
    });

    // call login api
    const endpoint = `${api.host}/api/login`;
    const requestOpt = {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        nik,
        password,
        metadata
      })
    };

  try {  
    // response dari login api
    const response = yield call(request, endpoint, requestOpt);  
    if(response.status){
      yield call(setTokenInStorage, response.token);// store token di local storage
      yield put(setAuthTokenAction(response.token));// store token di state
      yield put(setNikAction(nik));
      yield put(setEmailAction(response.email));
      yield put(setNotelpAction(response.notelp));
      yield put(loginSuccessAction()); // beritahu store 
    } else {
      // jika response status false
      let errorMsg = messages.user_not_exists.defaultMessage;
      yield put(loginErrorAction(errorMsg));
    }
    
  } catch(err){
    let errorMsg = messages.userLoginFailed.defaultMessage;
    yield put(loginErrorAction(errorMsg));
  }
}

export function* logout(){
  try {
    yield call(removeTokenInStorage, 'token');
  } catch(err){
    console.log(err);
  }
}

export default function* loginSaga() {
  yield all([
    takeLatest(LOGIN_ACTION, login),
    takeLatest(REMOVE_AUTH_TOKEN_ACTION, logout)
  ]);
}