/**
 *
 * FormPengajuan
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFormPengajuan from './selectors';
import {
  makeSelectPengajuan
} from '../FormSubmissionStep/selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { Scrollbars } from 'react-custom-scrollbars';

import { color, typography } from '../../styles/constants';
import {
  JENIS_PENGAJUAN,
  SUB_PENGAJUAN
} from './constants'

import {
  changeJenisPengajuanAction,
  changeSubPengajuanAction
} from './actions';

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
    this.renderTujuanPengajuan = this.renderTujuanPengajuan.bind(this);
  }
  
  renderTujuanPengajuan(){
    const { jenis } = this.props.pengajuan;
    
    // let filteredSub;
    // switch(jenis){
    //   case '1':{
    //     filteredSub = SUB_PENGAJUAN.filter( item => item.jenis == 1 );
    //     return filteredSub;        
    //   }
    //   case '2':{
    //     filteredSub = SUB_PENGAJUAN.filter( item => item.jenis == 2 );
    //     return filteredSub;        
    //   }
    //   default:
    //     filteredSub = SUB_PENGAJUAN.filter( item => item.jenis == 1 );
    //     return filteredSub;
    // }

    // console.log(filteredSub);
    let filteredSub = jenis === 1 ? SUB_PENGAJUAN.filter(item=>item.jenis === 1) : SUB_PENGAJUAN.filter(item=>item.jenis === 2);
    const menuItem = filteredSub.map( (item,i) => {
      return (
        <MenuItem 
          key={`item-${i}`}
          value={item.value} 
          style={{ fontSize:12 }}>
          {item.text}
        </MenuItem>);
    });    
    return menuItem;
  }

  render(){
    const {
      pengajuan,
      changeJenisPengajuan,
      changeSubPengajuan
    } = this.props;

    return (
      <Wrapper 
        container 
        wrap="nowrap"
        direction="column"
        alignItems="center">
          <Grid 
            item 
            style={{ width:'100%' }}>
            <form 
              autoComplete="off">

            {/* <Scrollbars 
              renderTrackVertical={props=><div {...props} className="track-vertical" />}
              renderThumbVertical={props=> <div {...props} className="thumb-vertical" />}
              style={{ width:'80vw',height:'61vh'}}> */}
                                    
            <FormControl 
              variant="outlined" 
              margin="dense" 
              fullWidth>
              <InputLabel 
                color="secondary" 
                shrink>
                  Jenis pengajuan
              </InputLabel>
              
              <Select 
                id="jenpeng" 
                name="jenpeng"
                variant="outlined" 
                margin="dense"
                color="secondary"
                labelWidth={120}
                style={{ 
                  fontFamily:typography.fontFamily,
                  fontSize:12,
                }}
                value={pengajuan.jenis}
                onChange={evt=>{
                  return changeJenisPengajuan(evt.target.value);
                }}>
                  {/* 
                  <MenuItem value="PB" style={{ fontSize:14 }}>Pembelian Barang</MenuItem>                  
                  <MenuItem value="PJ" style={{ fontSize:14 }}>Pemanfaatan Jasa</MenuItem>
                  */}
                  {
                    JENIS_PENGAJUAN.map((item,i)=>(
                      <MenuItem 
                        value={item.value} 
                        style={{ fontSize:12 }}>
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
                  sub pengajuan
              </InputLabel>
              <Select 
                id="subpeng" 
                name="subpeng"
                variant="outlined" 
                margin="dense"
                color="secondary"
                labelWidth={120}
                style={{ 
                  fontFamily:typography.fontFamily,
                  fontSize:12
                }}
                value={pengajuan.tujuan}
                onChange={evt=>{
                  return changeSubPengajuan(evt.target.value)
                }}>
                  {/*
                  <MenuItem value="PB1" style={{ fontSize:14 }}>Pembelian Kendaraan Roda dua (sepeda)</MenuItem>                  
                  <MenuItem value="PB2" style={{ fontSize:14 }}>Pembelian Kendaraan Roda dua (motor)</MenuItem>                  
                  <MenuItem value="PB3" style={{ fontSize:14 }}>Pembelian Kendaraan Roda Empat (mobil)</MenuItem>                  
                  <MenuItem value="PB4" style={{ fontSize:14 }}>Pembelian Barang Elektronik (HP)</MenuItem>
                  */}
                  {/*
                    SUB_PENGAJUAN.map((item,i)=>(
                      <MenuItem 
                        value={item.value} 
                        style={{ fontSize:12 }}>
                        {item.text}
                      </MenuItem>
                    ))
                  */}
                  {this.renderTujuanPengajuan()}
              </Select>
            </FormControl>            
                                  
            {/* </Scrollbars> */}
            <Grid item xs style={{ paddingTop:20, justifyContent:'center', alignItems:'center'}}>
            <Button 
              color="secondary" 
              variant="contained" 
              fullWidth 
              disabled={true}
              style={{ 
                textTransform:'capitalize',
                fontWeight:'bold',
                 
              }}>
              next step
            </Button>
            </Grid>      
            </form>
          </Grid>
      </Wrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  // formPengajuan: makeSelectFormPengajuan(),
  pengajuan: makeSelectPengajuan()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    changeJenisPengajuan: (jenisPengajuan) => dispatch(changeJenisPengajuanAction(jenisPengajuan)),
    changeSubPengajuan: (tujuanPengajuan) => dispatch(changeSubPengajuanAction(tujuanPengajuan))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FormPengajuan);
