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
    defaultMessage:'simulasi cicilan'
  },
  step1Subtitle:{
    id:`${scope}.step1Subtitle`,
    defaultMessage:'data sesuai kondisi pada saat pengajuan pinjaman'
  },
  step2Title:{
    id:`${scope}.step2Title`,
    defaultMessage:'data pemohon'
  },
  step2Subtitle:{
    id:`${scope}.step2Subtitle`,
    defaultMessage:'informasi sesuai kartu identitas pemohon'
  },
  step3Title:{
    id:`${scope}.step3Title`,
    defaultMessage:'data pekerjaan'
  },
  step3Subtitle:{
    id:`${scope}.step3Subtitle`,
    defaultMessage:'data sesuai dengan tempat pemohon bekerja'
  },
  step4Title:{
    id:`${scope}.step4Title`,
    defaultMessage:'upload dokumen'
  },
  step4Subtitle:{
    id:`${scope}.step4Subtitle`,
    defaultMessage:'closeup jelas foto dokumen atau dokumen hasil scan'
  },
  step5Title:{
    id:`${scope}.step5Title`,
    defaultMessage:'tujuan & manfaat pinjaman'
  },
  step5Subtitle:{
    id:`${scope}.step5Title`,
    defaultMessage:'informasi sesuai dengan manfaat pinjaman yang diperoleh'
  }
});
