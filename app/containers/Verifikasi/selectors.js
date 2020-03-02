import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the verifikasi state domain
 */

const selectVerifikasiDomain = state => state.verifikasi || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Verifikasi
 */

const makeSelectVerifikasi = () =>
  createSelector(
    selectVerifikasiDomain,
    substate => substate,
  );

export default makeSelectVerifikasi;
export { selectVerifikasiDomain };
