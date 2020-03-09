/**
 *
 * PerhitunganAngsuran
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
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
} from 'containers/FormSubmissionStep/selectors';

import {
  changeGajiAction,
  changePlafonAction,
  changeTenorAction,
  changeAngsuranAction  
} from './actions';

import messages from './messages';
import { PLAFON, TENOR } from './constants';

// helpers function
import { calc_installment } from './helpers';

import Grid from '@material-ui/core/Grid';
import numeral from 'numeral';

// components
import NumberInput from '../../components/NumberInput';
import InstallmentSlider from 'components/InstallmentSlider';
import { FormItemHeaderText, FormItemText } from './components';

const valueText = value => 'test'

class PerhitunganAngsuran extends React.Component {
  constructor(props){
    super(props);    
  }
  
  componentDidMount(){
    this.hitungAngsuran(this.props.plafon,this.props.margin,this.props.tenor);
  }

  componentDidUpdate(prevProps){
    if(prevProps.plafon !== this.props.plafon || prevProps.tenor !== this.props.tenor){
      this.hitungAngsuran(this.props.plafon,this.props.margin,this.props.tenor);
    }
  }

  hitungAngsuran = (plafon,margin,tenor) => {
    let angsuran = calc_installment(plafon,margin,tenor);
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

  render(){
    const { intl } = this.props;
    return (
      <Grid 
        container 
        wrap="nowrap"
        direction="column"
        alignItems="center">
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
              min={Math.min(...PLAFON)}
              max={Math.max(...PLAFON)}
              step={5000000}
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
              min={Math.min(...TENOR)}
              max={Math.max(...TENOR)}
              step={12}
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

            {/* <Button
              fullWidth 
              variant="contained" 
              color="primary"
              disabled={this.props.gaji < 1 || this.isMaxAngsReached(this.props.plafon,this.props.margin,this.props.tenor)}              
              style={{
                marginTop:20,
                fontWeight:'bold',
                textTransform:'capitalize'
              }}
              onClick={this.handleSubmit}>
              Submit
            </Button> */}
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
  angsuran: makeSelectAngsuran()  
});

function mapDispatchToProps(dispatch) {
  return {
    changeGaji: value => dispatch(changeGajiAction(value)),
    changePlafon: value => dispatch(changePlafonAction(value)),
    changeTenor: value => dispatch(changeTenorAction(value)),
    changeAngsuran: value => dispatch(changeAngsuranAction(value))    
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
