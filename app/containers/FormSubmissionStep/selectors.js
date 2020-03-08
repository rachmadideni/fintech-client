import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formSubmissionStep state domain
 */

const selectFormSubmissionStepDomain = state => state.formSubmissionStep || initialState;

const makeSelectFormSubmissionStep = () =>
  createSelector(
    selectFormSubmissionStepDomain,
    substate => substate,
  );

const makeSelectCompletedStep = () => createSelector(selectFormSubmissionStepDomain, substate => substate.completedStep);

const makeSelectActiveStep = () => createSelector(selectFormSubmissionStepDomain, substate => substate.activeStep);
const makeSelectStepProgress = () => createSelector(selectFormSubmissionStepDomain, substate=>substate.stepProgress);
const makeSelectGaji = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.angsuran.pendapatan);
const makeSelectPlafon = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.angsuran.plafon);
const makeSelectTenor = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.angsuran.tenor);
const makeSelectMargin = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.angsuran.margin);
const makeSelectAngsuran = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.angsuran.angsuran);
const makeSelectLimitAngsuran = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.angsuran.limit_angsuran);


const makeSelectNasabah = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah);
const makeSelectFullname = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.fullname);
const makeSelectBirthplace = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.birthplace);
const makeSelectBirthdate = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.birthdate);
const makeSelectAddress = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.address);
const makeSelectGender = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.gender);

const makeSelectErrorFullname = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.error.fullname);
const makeSelectErrorBirthplace = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.error.birthplace);
const makeSelectErrorBirthdate = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.error.birthdate);
const makeSelectErrorAddress = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.error.address);
const makeSelectErrorGender = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.error.gender);

const makeSelectTriggered = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.isSubmitTriggered);

const makeSelectWorkData = () => createSelector(selectFormSubmissionStepDomain, 
  substate => substate.data.work);

const makeSelectDocuments = () => createSelector(selectFormSubmissionStepDomain, 
  substate => substate.data.documents);

const makeSelectPengajuan = () => createSelector(selectFormSubmissionStepDomain,
  substate => substate.data.pengajuan);

export { 
  makeSelectCompletedStep,
  makeSelectActiveStep,
  makeSelectStepProgress,
  makeSelectGaji,
  makeSelectPlafon,
  makeSelectTenor,
  makeSelectMargin,
  makeSelectAngsuran,
  makeSelectLimitAngsuran,
  makeSelectFullname,
  makeSelectBirthplace,
  makeSelectBirthdate,
  makeSelectAddress,
  makeSelectGender,
  makeSelectErrorFullname,
  makeSelectErrorBirthplace,
  makeSelectErrorBirthdate,
  makeSelectErrorAddress,
  makeSelectErrorGender,
  makeSelectTriggered,
  makeSelectNasabah,
  makeSelectWorkData,
  makeSelectDocuments,
  makeSelectPengajuan
};
