/**
 *
 * FormPengajuan
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  makeSelectPengajuan,
  makeSelectOpsiJenisPengajuan,
  makeSelectNasabah,
  makeSelectFormSubmitted
} from '../FormSubmissionStep/selectors';

import messages from './messages';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
// import { Scrollbars } from 'react-custom-scrollbars';

import { color, typography } from '../../styles/constants';
import {
  JENIS_PENGAJUAN,
  SUB_PENGAJUAN
} from './constants'

import {
  changeJenisPengajuanAction,
  changeSubPengajuanAction,
  changePemanfaatanLainAction,
  getOpsiJenisPengajuanAction
} from './actions';

import {
  mapPengajuanAction
} from '../FormSubmissionStep/actions';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Wrapper = styled(props=>{
  return (
    <Grid {...props} />
  )})`
&& {
  background-color:transparent;
  padding-left:20px;
  padding-right:20px;
  padding-top:10px;
}`;

class FormPengajuan extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pemanfaatanLainnyaIsActive:false
    }
    this.renderTujuanPengajuan = this.renderTujuanPengajuan.bind(this);
  }

  componentDidMount(){
    this.props.getOpsiJenisPengajuan();    
  }
  
  renderTujuanPengajuan(){
    const { jenis } = this.props.pengajuan;
    const { opsiJenisPengajuan } = this.props;    
    let filteredSub = jenis === 1 ? opsiJenisPengajuan.filter(item => item.KDPRDK === 1) : opsiJenisPengajuan.filter(item => item.KDPRDK === 2);          
    
    const menuItem = filteredSub.map((item,i) => {      
      return (
        <MenuItem 
          key={`item-${i}`}
          value={item.IDTUJU} 
          style={{ fontSize:14 }}>
          {item.NMTUJU}
        </MenuItem>);      
    });

    return menuItem;
  }

  handlePemanfaatanLainnya = (value) => {
    const { opsiJenisPengajuan } = this.props;
    this.props.changeSubPengajuan(value);

    // cari value di SUB_PENGAJUAN & output label/text
    // let selected = SUB_PENGAJUAN.filter(item => item.value === value);
    let selected = opsiJenisPengajuan.filter(item => item.IDTUJU === value);
    // jika array length > 0
    if(selected.length > 0){
      let text = selected[0].NMTUJU;
      if(text.includes('lainnya')){
        this.setState(state=>({
          ...state,
          pemanfaatanLainnyaIsActive:true
        }));
      } else {
        this.setState(state=>({
          ...state,
          pemanfaatanLainnyaIsActive:false
        }));
        return this.props.changePemanfaatanLain("");
      }
    }
  }

  check_pengajuan_form = pengajuan => {
    if(pengajuan.jenis && pengajuan.tujuan) {
      return false;
    }
    return true;
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.mapPengajuan();
  }

  render(){
    const {
      intl,
      pengajuan,
      changeJenisPengajuan,      
      changePemanfaatanLain,
      formSubmitted
    } = this.props;    

    return (
      <Wrapper 
        container 
        wrap="nowrap"
        direction="column"
        alignItems="center">          
          
          <Backdrop 
            open={formSubmitted}            
            style={{
              zIndex:3000,
              color:color.white
            }}>
              <CircularProgress color="inherit" />
          </Backdrop>

          <Grid item style={{ width:'100%' }}>
            <form autoComplete="off">
                                    
            <FormControl 
              variant="outlined" 
              margin="dense" 
              fullWidth>
              
              <InputLabel 
                color="secondary" 
                shrink>
                  {intl.formatMessage(messages.jenis_manfaat)}
              </InputLabel>
              
              <Select 
                id="jenpeng" 
                name="jenpeng"
                variant="outlined" 
                margin="dense"
                color="secondary"
                labelWidth={115}
                style={{ 
                  fontFamily:typography.fontFamily,
                  fontSize:14,
                }}
                value={pengajuan.jenis}
                onChange={ evt => {
                  return changeJenisPengajuan(evt.target.value);
                }}>                  
                  {
                    JENIS_PENGAJUAN.map((item,i)=>(
                      <MenuItem 
                        value={item.value} 
                        style={{ fontSize:14 }}>
                        {item.text}
                      </MenuItem>
                    ))
                  }
              </Select>
            </FormControl>            
            
            <FormControl 
              variant="outlined" 
              margin="dense" 
              fullWidth>
              <InputLabel 
                color="secondary" 
                shrink>
                  {intl.formatMessage(messages.pemanfaatan)}
              </InputLabel>
              <Select 
                id="subpeng" 
                name="subpeng"
                variant="outlined" 
                margin="dense"
                color="secondary"
                labelWidth={205}
                style={{ 
                  fontFamily:typography.fontFamily,
                  fontSize:14
                }}
                value={pengajuan.tujuan}
                onChange={ evt => {                  
                  this.handlePemanfaatanLainnya(evt.target.value);
                }}>                  
                  {this.renderTujuanPengajuan()}                  
              </Select>
            </FormControl>

            <FormControl 
              margin="dense" 
              fullWidth>
                <TextField 
                  id="lainnya" 
                  name="lainnya"
                  color="secondary" 
                  fullWidth
                  InputLabelProps={{ shrink: true }} 
                  variant="outlined"
                  label={intl.formatMessage(messages.lainnya)}               
                  margin="dense"
                  disabled={!!this.state.pemanfaatanLainnyaIsActive ? false : true}
                  value={pengajuan.pemanfaatan_lain}
                  onChange={ evt => {
                      return changePemanfaatanLain(evt.target.value);
                  }}
                  style={{ 
                    fontFamily:typography.fontFamily,
                    fontSize:12
                  }} />
            </FormControl>

            <Grid 
              item 
              xs 
              style={{ paddingTop:0, justifyContent:'center', alignItems:'center'}}>
              <Button 
                color="primary" 
                variant="contained" 
                fullWidth
                onClick={this.handleSubmit} 
                disabled={this.check_pengajuan_form(pengajuan)}
                style={{
                  fontFamily:typography.fontFamily, 
                  textTransform:'capitalize',
                  fontWeight:'bold'                  
                }}>
                {intl.formatMessage(messages.submit)}
              </Button>
            </Grid>
            </form>
          </Grid>
      </Wrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  pengajuan: makeSelectPengajuan(),
  opsiJenisPengajuan: makeSelectOpsiJenisPengajuan(),
  nasabah: makeSelectNasabah(),
  formSubmitted: makeSelectFormSubmitted()
});

function mapDispatchToProps(dispatch) {
  return {
    changeJenisPengajuan: (jenisPengajuan) => dispatch(changeJenisPengajuanAction(jenisPengajuan)),
    changeSubPengajuan: (tujuanPengajuan) => dispatch(changeSubPengajuanAction(tujuanPengajuan)),
    changePemanfaatanLain: (pemanfaatan) => dispatch(changePemanfaatanLainAction(pemanfaatan)),
    getOpsiJenisPengajuan: () => dispatch(getOpsiJenisPengajuanAction()),
    mapPengajuan: () => dispatch(mapPengajuanAction())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl
)(FormPengajuan);
