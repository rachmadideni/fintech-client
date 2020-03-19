import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formAkadStep state domain
 */

const formAkadDomain = state => state.formAkadStep || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FormAkadStep
 */

const makeSelectFormAkadStep = () => createSelector(formAkadDomain, substate => substate);
const formAkadData = () => createSelector(formAkadDomain, substate => substate.data);

const opsi_dokumen = () => createSelector(formAkadDomain, substate => substate.opsi.dokumen);
const stskwn = () => createSelector(formAkadDomain, substate => substate.data.stskwn);
const nmpsgn = () => createSelector(formAkadDomain, substate => substate.data.nmpsgn);
const noktpp = () => createSelector(formAkadDomain, substate => substate.data.noktpp);
const tglhrp = () => createSelector(formAkadDomain, substate => substate.data.tglhrp);
const jmlank = () => createSelector(formAkadDomain, substate => substate.data.jmlank);
const uploaded = () => createSelector(formAkadDomain, substate => substate.data.uploaded);

export default makeSelectFormAkadStep;
export {
  formAkadData,
  opsi_dokumen, 
  stskwn,
  nmpsgn,
  noktpp,
  tglhrp,
  jmlank,
  uploaded
};
