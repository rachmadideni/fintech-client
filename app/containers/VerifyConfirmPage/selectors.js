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
  substate => substate.kodeAktifasi)

export default makeSelectVerifyConfirmPage;
export { 
  selectVerifyConfirmPageDomain,
  makeSelectKodeAktifasi
};
