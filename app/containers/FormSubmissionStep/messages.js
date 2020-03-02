/*
 * FormSubmissionStep Messages
 *
 * This contains all the text for the FormSubmissionStep container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FormSubmissionStep';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the FormSubmissionStep container!',
  },
  step1Title:{
    id:`${scope}.step1Title`,
    defaultMessage:'Perhitungan Angsuran'
  },
  step1Subtitle:{
    id:`${scope}.step1Subtitle`,
    defaultMessage:'ini akan menghitung angsuran ta'
  },
  step2Title:{
    id:`${scope}.step2Title`,
    defaultMessage:'Data Pribadi'
  },
  step2Subtitle:{
    id:`${scope}.step2Subtitle`,
    defaultMessage:'ini pengisian data pribadi ta'
  },
  step3Title:{
    id:`${scope}.step3Title`,
    defaultMessage:'Data Pekerjaan'
  },
  step3Subtitle:{
    id:`${scope}.step3Subtitle`,
    defaultMessage:'ini pengisian data pekerjaan ta'
  },
  step4Title:{
    id:`${scope}.step4Title`,
    defaultMessage:'upload dokumen'
  },
  step4Subtitle:{
    id:`${scope}.step4Subtitle`,
    defaultMessage:'ini upload dokumen ta'
  },
});
