import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the forgotPassword state domain
 */

const selectForgotPasswordDomain = state =>
  state.forgotPassword || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ForgotPassword
 */

const makeSelectForgotPassword = () =>
  createSelector(
    selectForgotPasswordDomain,
    substate => substate,
  );

const makeSelectUserStatus = () => createSelector(selectForgotPasswordDomain, substate => substate.isNikDanEmailExist);
const makeSelectErrorMessage = () => createSelector(selectForgotPasswordDomain, substate => substate.error.message);
const makeSelectSuccessMessage = () => createSelector(selectForgotPasswordDomain, substate => substate.success.message);
const makeSelectIsLoading = () => createSelector(selectForgotPasswordDomain, substate => substate.isLoading);
const makeSelectKodeReset = () => createSelector(selectForgotPasswordDomain, substate => substate.kodeReset);
export default makeSelectForgotPassword;
export { selectForgotPasswordDomain, makeSelectUserStatus, makeSelectErrorMessage, makeSelectSuccessMessage, makeSelectIsLoading, makeSelectKodeReset };
