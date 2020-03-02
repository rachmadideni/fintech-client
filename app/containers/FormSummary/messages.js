/*
 * FormSummary Messages
 *
 * This contains all the text for the FormSummary container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FormSummary';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the FormSummary container!',
  },
  thankyou:{
    id: `${scope}.thankyou`,
    defaultMessage: 'Terima kasih telah melengkapi pengajuan',
  },
  summary:{
    id: `${scope}.summary`,
    defaultMessage: 'Summary',
  }
});
