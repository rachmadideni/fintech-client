/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { 
  SET_AUTH_TOKEN_ACTION,
  REMOVE_AUTH_TOKEN_ACTION
 } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  auth:{
    token:null
  }
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_AUTH_TOKEN_ACTION:{
        draft.auth.token = action.payload;
        return draft;
      }
      case REMOVE_AUTH_TOKEN_ACTION:{
        draft.auth.token = null;
        return draft;
      }
    }
    return draft;
  });

export default appReducer;
