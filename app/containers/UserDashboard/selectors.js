import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userDashboard state domain
 */

const selectUserDashboardDomain = state => state.userDashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserDashboard
 */

const makeSelectUserDashboard = () =>
  createSelector(
    selectUserDashboardDomain,
    substate => substate,
  );

export default makeSelectUserDashboard;
export { selectUserDashboardDomain };
