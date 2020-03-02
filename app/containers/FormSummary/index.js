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
  makeSelectDocuments
} from '../FormSubmissionStep/selectors';
import messages from './messages';
import {
  color,
  typography
} from '../../styles/constants';


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styled from 'styled-components';

const StyledRow = styled(Grid)`
&& {
  margin-left:12px;
}
`;

const HeadTypo = styled(Typography)`
&& {
  font-size:13px;
  font-weight:bold;
  text-transform:capitalize;
  font-family:${typography.fontFamily};
}`;

const HeadData = styled(Typography)`
&& {
  font-family:${typography.fontFamily};
  font-size:12px;
  font-weight:normal;
  text-transform:capitalize;
}`;

function Row(props){
  const { head, data, image, ...otherProps } = props;
  return (
    <StyledRow 
      {...otherProps}>
      <Grid 
        item>
        <HeadTypo>
        {head}
        </HeadTypo>
        <hr />
      </Grid>
      <Grid 
        item>
        <HeadData>
        {data || null}
        </HeadData>
      </Grid>
      <Grid item>
        <Grid 
          container 
          wrap="nowrap">
            <Grid item>
              <img 
                src={image} 
                width={image ? 100 : null} 
                height={image ? 120 : null}
                style={{ marginBottom:5 }} />
            </Grid>
            <Grid item>
              <img 
                src={image} 
                width={image ? 100 : null} 
                height={image ? 120 : null}
                style={{ marginBottom:5 }} />
            </Grid>
        </Grid>        
      </Grid>
    </StyledRow> 
  );
}

class FormSummary extends React.Component {
  render(){
    const { intl } = this.props;
    return (
      <Grid
        container
        wrap="nowrap"
        direction="column"
        justify="center"
        alignItems="flex-start"
        style={{
          minHeight:'80%',
          overflowY:'auto',
          marginBottom:100
        }}>
          <Grid item xs>
            <Typography 
              style={{
                fontFamily:typography.fontFamily,
                fontSize:14,
                color:color.grey,
                fontWeight:'bold'
              }}
              gutterBottom>
              {intl.formatMessage(messages.thankyou)}
            </Typography>
            <Typography
              style={{
                fontFamily:typography.fontFamily,
                fontSize:15,
                fontWeight:'bold'
              }} 
              gutterBottom>
              {intl.formatMessage(messages.summary)}
            </Typography>
          </Grid>
          {/* Summary */}                    
          <Row head="nama lengkap" data={this.props.nasabah.fullname} />
          <Row head="alamat" data={this.props.nasabah.address} />
          <Row head="tempat kelahiran" data={this.props.nasabah.birthplace} />
          <Row head="tanggal lahir" data={this.props.nasabah.birthdate} />
          <Row head="jenis kelamin" data={this.props.nasabah.gender} />
          
          <Row head="perusahaan" data={this.props.work.company} />
          <Row head="tanggal mulai bekerja" data={this.props.work.companyJoinDate} />
          {/* <Row head="Dokumen" image={this.props.documents} /> */}
          {/* <Row head="Id Card" image={this.props.documents.idcard} /> */}
            
          
      </Grid>  
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
  documents:makeSelectDocuments()
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
