/**
 *
 * FormPengajuan
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFormPengajuan from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  Grid,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button
} from '@material-ui/core';

import { color } from '../../styles/constants';
import { Scrollbars } from 'react-custom-scrollbars';

class FormPengajuan extends React.Component {
  render(){
    return (
      <Grid 
        container 
        wrap="nowrap"
        direction="column"
        alignItems="center"
        style={{
          backgroundColor:'transparent',
          paddingLeft:20,
          paddingRight:20,
          paddingTop:10
          // overflow:'auto',
          // maxHeight:'70vh'
            // height:'500px'          
        }}>
          <Grid item xs>
            <form>
            {/* <Typography               
              align="left"
              color="secondary"              
              style={{
                fontSize:14,
                fontWeight:'bold',
                
              }}>
                Form Pengajuan
            </Typography>
            <Typography style={{ paddingBottom:10, fontSize:11, fontWeight:'thin', color:color.grey }}>
              Kelengkapan Informasi tahap awal
            </Typography>             */}
            <Scrollbars 
              renderTrackVertical={props=><div {...props} className="track-vertical" />}
              renderThumbVertical={props=> <div {...props} className="thumb-vertical" />}
              style={{ width:'80vw',height:'61vh'}}>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <TextField 
                id="nmlgkp" 
                name="nmlgkp"
                color="secondary" 
                fullWidth
                InputLabelProps={{ shrink: true }} 
                variant="outlined"
                label="nama lengkap"               
                margin="dense" />
            </FormControl>            
            
            <FormControl variant="outlined" margin="dense" fullWidth>
              <TextField 
                id="tptlhr" 
                name="tptlhr" 
                fullWidth
                color="secondary"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="tempat lahir"                                                
                margin="dense" />
            </FormControl>            
            
            <FormControl variant="outlined" fullWidth>
              <TextField 
                id="alamt1" 
                name="alamt1" 
                fullWidth
                color="secondary"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="alamat"                                              
                margin="dense" />
            </FormControl>            
            
            <FormControl variant="outlined" margin="dense" fullWidth>
              <TextField                 
                id="tgllhr" 
                name="tgllhr"
                type="date" 
                fullWidth
                color="secondary"
                InputLabelProps={{ shrink: true }}
                label="tanggal lahir"
                labelWidth={110} 
                variant="outlined"                                               
                margin="dense" />
            </FormControl>            
            
            <FormControl 
              variant="outlined" 
              fullWidth>
              <TextField                 
                id="tgmukr" 
                name="tgmukr"
                type="date" 
                fullWidth
                color="secondary"
                InputLabelProps={{ shrink: true }}
                label="tanggal mulai kerja"
                labelWidth={110} 
                variant="outlined"                               
                margin="dense" />
            </FormControl>            
            
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel color="secondary" shrink>Jenis pengajuan</InputLabel>
              <Select 
                id="jenpeng" 
                name="jenpeng"
                variant="outlined" 
                margin="dense"
                color="secondary"
                labelWidth={120}
                style={{ fontSize:14 }}>
                  <MenuItem value="PB" style={{ fontSize:14 }}>Pembelian Barang</MenuItem>                  
                  <MenuItem value="PJ" style={{ fontSize:14 }}>Pemanfaatan Jasa</MenuItem>                  
              </Select>
            </FormControl>            
            
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel color="secondary" shrink>sub pengajuan</InputLabel>
              <Select 
                id="subpeng" 
                name="subpeng"
                variant="outlined" 
                margin="dense"
                color="secondary"
                labelWidth={120}
                style={{ fontSize:14 }}>
                  <MenuItem value="PB1" style={{ fontSize:14 }}>Pembelian Kendaraan Roda dua (sepeda)</MenuItem>                  
                  <MenuItem value="PB2" style={{ fontSize:14 }}>Pembelian Kendaraan Roda dua (motor)</MenuItem>                  
                  <MenuItem value="PB3" style={{ fontSize:14 }}>Pembelian Kendaraan Roda Empat (mobil)</MenuItem>                  
                  <MenuItem value="PB4" style={{ fontSize:14 }}>Pembelian Barang Elektronik (HP)</MenuItem>                                    
              </Select>
            </FormControl>            
            
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel color="secondary" shrink>Jenis Kelamin</InputLabel>
              <Select 
                id="jenkel" 
                name="jenkel"
                variant="outlined" 
                margin="dense"
                color="secondary"
                labelWidth={110}>
                  <MenuItem value="L">Laki Laki</MenuItem>
                  <MenuItem value="P">Perempuan</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel color="secondary" shrink>asal perusahaan</InputLabel>
              <Select 
                id="aslprsh" 
                name="aslprsh"
                variant="outlined" 
                margin="dense"
                color="secondary"
                labelWidth={110}>
                  <MenuItem value="BJU">BJU</MenuItem>
                  <MenuItem value="HSI">HSI</MenuItem>
              </Select>
            </FormControl>            
            </Scrollbars>
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
      </Grid>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  formPengajuan: makeSelectFormPengajuan(),
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

export default compose(withConnect)(FormPengajuan);
