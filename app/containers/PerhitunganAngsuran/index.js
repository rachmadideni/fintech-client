/**
 *
 * PerhitunganAngsuran
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  makeSelectGaji,
  makeSelectPlafon,
  makeSelectTenor,
  makeSelectMargin,
  makeSelectAngsuran,
  makeSelectParameter,
  makeSelectStepProgress
} from 'containers/FormSubmissionStep/selectors';

import {
  changeGajiAction,
  changePlafonAction,
  changeTenorAction,
  changeAngsuranAction,
  getParamAction  
} from './actions';

import {
  setSimulasiTourAction
} from '../FormSubmissionStep/actions'

import messages from './messages';

// helpers function
import { calc_installment } from './helpers';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import numeral from 'numeral';
import {
  ArrowRightAlt,
  ArrowRightSharp
} from '@material-ui/icons';


// components
import NumberInput from '../../components/NumberInput';
import InstallmentSlider from 'components/InstallmentSlider';
import { FormItemHeaderText, FormItemText } from './components';

import { color, typography } from '../../styles/constants';
// Tour 
import { TOUR_STEPS } from './constants';
import Tour from 'reactour';

const valueText = value => 'test'

class PerhitunganAngsuran extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen:true
    }    
  }
  
  componentDidMount(){
    this.props.getParam();
    this.hitungAngsuran(this.props.plafon,this.props.margin,this.props.tenor);
    // this.showBackDrop();
  }

  componentDidUpdate(prevProps){
    if(prevProps.plafon !== this.props.plafon || prevProps.tenor !== this.props.tenor){
      this.hitungAngsuran(this.props.plafon,this.props.margin,this.props.tenor);
    }
  }

  showBackDrop = () => {
    console.log('showBackdrop is called!');
    return (
      <Backdrop 
        open={this.state.isOpen} 
        onClick={this.handleBackdrop}>
          <Typography
            align="center">
              gunakan tombol panah di sebelah kanan atas untuk berpindah layar berikutnya dan 
              tombol panah sebelah kiri untuk kembali ke layar sebelumnya 
          </Typography>
      </Backdrop>
    )
  }

  handleBackdrop = () => {
    this.setState(state=>({
      ...state,
      isOpen:!state.isOpen
    }))
  }

  hitungAngsuran = (plafon, margin, tenor) => {
    let angsuran = calc_installment(plafon, margin, tenor);
    // this.props.setSimulasiTour(open, 1);
    return this.props.changeAngsuran(angsuran);
  }  

  // handleChangeGaji = (gaji) => {

  //   /** TODO : plafon,tenor,margin akan diambil melalui api */
  //   // let plafon = [10000000,15000000,20000000,25000000,30000000,35000000,40000000,50000000];
  //   // let tenor = [12,24,36];
  //   // let margin = [10,11,12];

  //   // maximum angsuran yang boleh diajukan adalah 30 % dari gaji
  //   let maximal_angsuran = calc_acceptable_installment(gaji);
    
  //   this.setState({
  //     gaji,
  //     maxAngsuran:maximal_angsuran
  //   });

  // }

  // isMaxAngsReached = (plafon,margin,tenor) => {
  //   const { maxAngsuran } = this.state;
  //   const { limit_angsuran } = this.props;
  //   // return check_max_installment(maxAngsuran,plafon,margin,tenor);
  //   return check_max_installment(limit_angsuran,plafon,margin,tenor);
  // }

  // hitungAngsuranAnuitas = (pokok,tenor,margin) => {
  //   /*
  //   Perhitungan:
  //   Angsuran bulanan = Rp 12.000.000×12%/12×1/1-(1/(1+12%/12)12 )
  //   = Rp 1.066.183,519
  //   */
  //   let cicilan = pokok*(margin/100)/12*1/1 - (1/(1+(margin/100)/12)/tenor);
  //   return cicilan;
  // }

  // handleSubmit = (e) => {    
  //   e.preventDefault();
  //   const { history } = this.props;
  //   return history.replace('/pinjaman/pengajuan');
  // }

  // handleTour = () => {
  //   this.setState({
  //     isOpen:!isOpen
  //   })
  // }

  render(){
    const { 
      intl,
      parameter
    } = this.props;
    
    return (
      <Grid         
        container 
        wrap="nowrap"
        direction="column"
        alignItems="center">
          {
            this.props.stepProgress === 0 ? 
            <Backdrop 
              open={this.state.isOpen}             
              onClick={this.handleBackdrop}
              style={{
                zIndex:50000,
                backgroundColor:color.subtleBlack,
                opacity:0.9
              }}>
                <Grid 
                  container 
                  wrap="nowrap"               
                  justify="center"
                  alignItems="flex-start">                 
                    <Grid item style={{
                      width:'200px',
                      position:'absolute',
                      top:100
                    }}>                    
                      <Typography
                        align="center"
                        style={{
                          fontFamily:typography.fontFamily,
                          fontWeight:'bold',
                          fontSize:12,
                          color:color.white
                        }}>
                          {`gunakan tombol panah sebelah kanan dan kiri atas untuk berpindah layar`}
                      </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography
                      align="center"
                      style={{
                        fontFamily:typography.fontFamily,
                        fontWeight:'normal',
                        fontSize:10,
                        color:color.white
                      }}>
                        klik sembarang untuk menutup pesan ini
                    </Typography>
                  </Grid>
                </Grid>
            </Backdrop>            
            : null
          }

          <Grid item xs 
            style={{ 
              marginTop:20
          }}>
          <Grid             
            container 
            wrap="nowrap"
            direction="column">
              <FormItemHeaderText 
                gutterBottom>
                {intl.formatMessage(messages.pendapatanNet)}
              </FormItemHeaderText>
                        
              <NumberInput 
                id="gaji"
                name="gaji"
                value={this.props.gaji || 0}
                label="gaji"                
                allowNegative={false}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={ value => {
                  this.props.changeGaji(parseInt(value));
                }} />
          </Grid>

            <Grid               
              container 
              wrap="nowrap"
              justify="center"
              alignItems="center"
              style={{ 
                marginTop:10
              }}>
                <Grid item xs>
                  <FormItemHeaderText 
                    gutterBottom>
                  {intl.formatMessage(messages.plafon)}
                  </FormItemHeaderText>                
                </Grid>
                <Grid item xs> 
                  {/* Plafon */}
                    <FormItemText>
                      {`${numeral(this.props.plafon).format('0,0')} ${intl.formatMessage(messages.juta)}`}
                    </FormItemText>                  
                </Grid>
            </Grid>          
          
            <InstallmentSlider 
              color="secondary"                            
              value={this.props.plafon}
              min={parameter ? parameter.MIN_PLAFON : 10000000}
              max={parameter ? parameter.MAX_PLAFON : 50000000}
              step={parameter ? parameter.STEP_PLAFON : 5000000}
              valueLabelDisplay="off"
              getAriaValueText={valueText}
              marks={false}
              onChangeCommitted={ (e,val) => {
                  return this.props.changePlafon(val);
                }}
              disabled={this.props.gaji > 0 ? false:true} />

            <Grid 
              container 
              wrap="nowrap"
              justify="center"
              alignItems="center">
                <Grid item xs>
                  {/* Tenor */}
                  <FormItemHeaderText 
                    gutterBottom>
                      {intl.formatMessage(messages.tenor)}
                  </FormItemHeaderText>                
                </Grid>
                <Grid item xs>
                  <FormItemText>
                    {`${this.props.tenor} ${intl.formatMessage(messages.bulan)}`}
                  </FormItemText>                
                </Grid>
            </Grid>

            <InstallmentSlider              
              color="secondary"                             
              value={this.props.tenor}                           
              min={parameter ? parameter.MIN_TENOR : 12}
              max={parameter ? parameter.MAX_TENOR : 36}
              step={parameter ? parameter.STEP_TENOR : 12}
              valueLabelDisplay="off"
              getAriaValueText={valueText}
              marks={false}
              onChangeCommitted={(e,val)=>{
                return this.props.changeTenor(val);
              }}
              disabled={ this.props.gaji > 0 ? false : true } />

            <Grid 
              container 
              wrap="nowrap"
              justify="center"
              alignItems="center">
                <Grid item xs>
                  <FormItemHeaderText 
                    gutterBottom>
                    {intl.formatMessage(messages.angsuran)}
                  </FormItemHeaderText>                
                </Grid>
                <Grid item xs>
                  <FormItemText>
                    {`${intl.formatMessage(messages.rp)} `}
                    {numeral(this.props.angsuran).format('0,0')}                    
                  </FormItemText>                
                </Grid>
            </Grid>
          </Grid>
          
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  gaji: makeSelectGaji(),
  plafon: makeSelectPlafon(),
  tenor: makeSelectTenor(),
  margin: makeSelectMargin(),
  angsuran: makeSelectAngsuran(),
  parameter: makeSelectParameter(),
  stepProgress: makeSelectStepProgress()  
});

function mapDispatchToProps(dispatch) {
  return {
    changeGaji: value => dispatch(changeGajiAction(value)),
    changePlafon: value => dispatch(changePlafonAction(value)),
    changeTenor: value => dispatch(changeTenorAction(value)),
    changeAngsuran: value => dispatch(changeAngsuranAction(value)),
    getParam: () => dispatch(getParamAction()),
    setSimulasiTour: (open, count) => dispatch(setSimulasiTourAction(open, count))
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
)(PerhitunganAngsuran);