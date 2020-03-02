/**
 *
 * Pinjaman
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPinjaman from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Tabs,
  Tab
} from '@material-ui/core'

import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { color, dimensions } from '../../styles/constants'
import PerhitunganAngsuran from '../PerhitunganAngsuran/Loadable';
import FormPengajuan from '../FormPengajuan/Loadable';
import FormNasabah from 'containers/FormNasabah/Loadable';

// import FormSubmissionStep from 'containers/FormSubmissionStep';

// const CustomTabs = styled(Tabs)`
//   &.indicator {
//     display:flex;
//     justify-content:center;
//     background-color:transparent;
//     '& > div':{
//       max-width:40;
//       width:100%;
//       background-color:#635ee7;
//     }
//   }
// `

// const CustomStepper = styled(Stepper)`
// && {    
//       &.root {
//         // background-color:#FF0000;
//         padding-left:0px;
//         padding-top:5px;
//         padding-bottom:0px;  
        
//       }
//       &.label {
//         padding-top:0px;
//       }

//       &.alternativeLabel {
//         padding:0px;
//       }
// }`

// const customStepLabel = styled(StepLabel)`
//   && {

//   }
// `


class Pinjaman extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      activeStep:0
    }
  }
  
  getSteps = () => {
    return ['plafond','berkas','pengajuan']
  }

  render(){
    const { activeStep } = this.state
    const steps = this.getSteps();

    return (
      <Grid 
        container 
        wrap="nowrap"
        direction="column"
        style={{ 
          maxWidth:330,
          height:'100%',
          paddingTop:0,          
        }}>
        
        <Grid item xs 
          style={{ 
            height:'100%',            
          }}>
            
            <Grid 
              item 
              xs 
              style={{
                paddingLeft:10,
                paddingTop:0
            }}>
            
            <Switch>
              <Route path="/application-form/step/customer/installment"
              render={routeProps=>(
                <PerhitunganAngsuran {...routeProps} />
              )} />
            </Switch>

            {/* <Switch>
              <Route path="/application-form/step/customer/personal-details"
              render={routeProps=>(
                <FormNasabah {...routeProps} />
              )} />
            </Switch> */}

            </Grid>
          </Grid>
        </Grid>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  pinjaman: makeSelectPinjaman(),
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
  memo,
)(Pinjaman);
