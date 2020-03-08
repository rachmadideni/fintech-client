import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the verifyConfirmPage state domain
 */

const selectVerifyConfirmPageDomain = state =>
  state.verifyConfirmPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VerifyConfirmPage
 */

const makeSelectVerifyConfirmPage = () =>
  createSelector(
    selectVerifyConfirmPageDomain,
    substate => substate,
  );

const makeSelectKodeAktifasi = () => createSelector(selectVerifyConfirmPageDomain,
  substate => substate.fromUser_activation_code)

const makeSelectKodeFromServer = () => createSelector(selectVerifyConfirmPageDomain,
  substate => substate.fromServer_activation_code)

const makeSelectError = () => createSelector(selectVerifyConfirmPageDomain,
  substate => substate.error.message)



export default makeSelectVerifyConfirmPage;
export { 
  selectVerifyConfirmPageDomain,
  makeSelectKodeAktifasi,
  makeSelectKodeFromServer,
  makeSelectError
};
