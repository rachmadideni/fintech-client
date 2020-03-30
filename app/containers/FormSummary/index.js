/**
 *
 * FormSummary
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import makeSelectFormSummary from './selectors';
import {
  makeSelectNasabah,
  makeSelectWorkData,
  makeSelectDocuments,
} from '../FormSubmissionStep/selectors';

import {
  makeSelectStatusAplikasi
} from '../MainPage/selectors';
import messages from './messages';
import {
  color,
  typography
} from '../../styles/constants';


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styled from 'styled-components';

const Wrapper = styled(props=>{
  return (
    <Grid 
      container 
      wrap="nowrap" 
      direction="column"
      {...props}>
      {props.children}
    </Grid>
  );
})`
  && {
    padding-top:20px;
    background-color:transparent;
    justify-content:center;
    align-items:flex-start;
    margin-top:12px;
    padding-left:20px;
    padding-right:20px;
  }
`;

const MessageWrapper = styled.div`
&& {
  flex:1;
  width:100%;
  border-radius:4px;
  padding:12px;
  background-color:${color.lightGrey};  
  margin-bottom:20px;
}`;

const ThankYouMessage = styled(Typography)`
&& {
  font-family:${typography.fontFamily};
  font-size:12px;
  color:${color.black};
  font-weight:bold;
  line-height:15px;
  white-space: pre-wrap;
}`;


class FormSummary extends React.Component {
  render(){
    const { intl } = this.props;
    return (
      <Wrapper>
          <MessageWrapper>
            <Typography
              align="center" 
              style={{
                fontFamily:typography.fontFamily,
                fontSize:'12px',
                color:color.green,
                fontWeight:'bold'
              }}
              gutterBottom>
              
              { this.props.statusAplikasi === 1 && intl.formatMessage(messages.thankyou)}
              { this.props.statusAplikasi === 2 && intl.formatMessage(messages.successFormTahap2)}
            </Typography>
            <Typography
              align="center" 
              style={{
                fontFamily:typography.fontFamily,
                fontSize:'11px',
                color:color.black,
                fontWeight:'normal'
              }}
              gutterBottom>
              {intl.formatMessage(messages.thankyou_details)}
            </Typography>
          </MessageWrapper>
          <Grid item xs>
            
          </Grid>
          
      </Wrapper>  
    );
  }
}

// FormSummary.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  // formSummary: makeSelectFormSummary(),
  nasabah: makeSelectNasabah(),
  work: makeSelectWorkData(),
  documents:makeSelectDocuments(),
  statusAplikasi: makeSelectStatusAplikasi()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
  memo,
)(FormSummary);
