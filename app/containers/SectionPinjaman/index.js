/**
 *
 * SectionPinjaman
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectSectionPinjaman from './selectors';
import { makeSelectStatusAplikasi } from '../MainPage/selectors';
import messages from './messages';
import Grid from '@material-ui/core/Grid';

import { 
  HeaderText,
  GridWrapper,
  ContentText,
  ActionButton } from './components';

import {
  DAFTAR_DOKUMEN
} from './constants';

import {
  downloadAKadAction,
  downloadSpnAction,
  downloadSrpAction,
  downloadSpgkAction
} from '../MainPage/actions';

class SectionPinjaman extends React.Component {
  
  
  handleFormTahap1 = () => {
    const {
      history,
      statusAplikasi
    } = this.props;

    if(statusAplikasi === 0){      
      return history.replace('/application-form/step/customer/installment');
    }
  }

  handleFormTahap2 = () => {    
    const {
      history,
      statusAplikasi
    } = this.props;

    if(statusAplikasi === 2){
      return history.replace('/akad');
    }
  }

  handleDownloadDokumen = (type) => {    
    if(type === "akad"){
      this.props.downloadAKad();
    } else if(type ==="spn"){
      this.props.downloadSpn();
    } else if(type === "srp"){
      this.props.downloadSrp();    
    } else if(type === "spgk"){
      this.props.downloadSpgk();
    }
  }

  render(){
    
    const { 
      intl,
      statusAplikasi
    } = this.props;
    
      return (
      <Grid 
        container 
        wrap="nowrap"
        direction="column">
          <HeaderText gutterBottom>
            {intl.formatMessage(messages.header)}
          </HeaderText>
          
          <GridWrapper>
          {
            statusAplikasi === 0 && 
            <React.Fragment>
            <ContentText
              align="left">
              {intl.formatMessage(messages.tidakAdaPinjaman)}
            </ContentText>
            <Grid 
              item
              style={{
                paddingTop:10,              
              }}>
                <ActionButton 
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={this.handleFormTahap1}>
                  {intl.formatMessage(messages.actionButton)}
                </ActionButton>
            </Grid>
            </React.Fragment>
          }

          {
            statusAplikasi === 1 && 
            <React.Fragment>
              <ContentText
                align="left">
                {intl.formatMessage(messages.tahapPengajuan)}
              </ContentText>
            </React.Fragment>
          }

          {
            statusAplikasi === 2 && 
            <React.Fragment>
              <ContentText
                align="left">
                {intl.formatMessage(messages.tahapPaskaApproval)}
              </ContentText> 
              <Grid 
                item
                style={{
                  paddingTop:10,              
                }}>
                  <ActionButton 
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={statusAplikasi > 0 && statusAplikasi === 1}
                    onClick={this.handleFormTahap2}>
                    {intl.formatMessage(messages.actionButtonStep2)}
                  </ActionButton>
              </Grid>             
            </React.Fragment>
          }

          {
            statusAplikasi === 3 && 
            <React.Fragment>
              <ContentText
                align="left">
                {intl.formatMessage(messages.tahapDownloadDokumen)}
              </ContentText>
              <Grid 
                item
                style={{
                  paddingTop:10,              
                }}>
                {
                  DAFTAR_DOKUMEN.map((item,i)=>(
                    <ActionButton
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={ evt => this.handleDownloadDokumen(item.type) }                      
                      style={{
                        marginBottom:4,
                        fontSize:11,
                      }}>                        
                        {item.name}
                    </ActionButton>
                  ))
                }
              </Grid>
            </React.Fragment>
          }
          </GridWrapper>
      </Grid>
    );
  }
}

SectionPinjaman.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sectionPinjaman: makeSelectSectionPinjaman(),
  statusAplikasi: makeSelectStatusAplikasi()
});

function mapDispatchToProps(dispatch) {
  return {
    downloadAKad: () => dispatch(downloadAKadAction()),
    downloadSpn: () => dispatch(downloadSpnAction()),
    downloadSrp: () => dispatch(downloadSrpAction()),
    downloadSpgk: () => dispatch(downloadSpgkAction())
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
)(SectionPinjaman);