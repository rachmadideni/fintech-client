/**
 *
 * FormDocument
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import makeSelectFormDocument from './selectors';
import {
  makeSelectDocuments
} from '../FormSubmissionStep/selectors';

import {
  changeDokumenKtpAction,
  changeDokumenIdcardAction,
  // uploadDokumenAction,
  addDokumenAction
} from './actions'

import messages from './messages';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
// import InputLabel from '@material-ui/core/InputLabel';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import Webcam from 'react-webcam';

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

const CardMediaStyled = styled(CardMedia)`
&& {
  height:120px;
}
`;

class FormDocument extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selfieImageName:"",
      selfieImage:null,
      imageKTPName:"",
      imageKTP:null,
      imageIdCardName:"",
      imageIdCard:null
    }
    this.onSingleUpload = this.onSingleUpload.bind(this);
  }

  componentDidMount(){
    // navigator.mediaDevices.enumerateDevices().then(result=>console.log(result))
    // navigator.mediaDevices.getUserMedia({video: true}).then(result=>console.log(result))
  }

  setSelfie = webcam => {
    this.webcam = webcam;
  }

  captureSelfie = () => {
    const selfieImage = this.webcam.getScreenshot();
    this.setState({
      selfieImage
    });
    
    // console.log('selfieSrc',selfieSrc);
  }

  onSingleUpload( evt, statename, statefile){
    let file = evt.target.files[0];
    let filename = evt.target.files[0].name;

    this.getAsBase64(file).then(base64=>{
      this.setState({
        [statename]:filename,
        [statefile]:base64
      });
    })
  }

  handleFileUpload = (event, key) => {
    const { addDokumen } = this.props;    
    if(!!event.target.files && !!event.target.files[0]){
      const localImageUrl = URL.createObjectURL(event.target.files[0]);
      return addDokumen(key,  localImageUrl);
    }
    return false;
    
  } 

   getAsBase64 = (file) => {
    return new Promise((resolve,reject)=>{
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  render(){

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    const { 
      intl,
      documents,
      changeDokumenKtp,
      changeDokumenIdcard
    } = this.props;

    return (
      <Wrapper 
        container 
        wrap="nowrap"
        direction="column"
        alignItems="flex-end"
        justify="flex-end">
          <Grid item>
            <form 
              autoComplete="off">
              {/* <FormControl margin="dense" fullWidth>
                <InputLabel shrink>Foto Selfie</InputLabel>                
                <Webcam 
                  ref={this.setSelfie}
                  audio={false}                
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  width={350}
                  height={150}
                  style={{
                    display:'flex',
                    marginTop:25,
                  }}  
                  />                
              </FormControl> */}
              <FormControl 
                margin="dense" 
                fullWidth>
                <Button 
                  color="primary"
                  fullWidth
                  variant="outlined" 
                  component="label"                
                  onChange={ 
                    // evt => this.onSingleUpload(evt,'imageKTPName','imageKTP')
                    evt => this.handleFileUpload(evt,'ktp')
                  }>
                  {intl.formatMessage(messages.uploadKtp)}
                  <input 
                    id="ktp" 
                    name="ktp" 
                    type="file" 
                    accept="image/x-png,image/jpeg" 
                    style={{ display:'none' }} />
                </Button>
              </FormControl>

              <FormControl 
                margin="dense" 
                fullWidth>
                <Button 
                  color="primary"
                  fullWidth
                  variant="outlined" 
                  component="label"                
                  onChange={
                    // evt=>this.onSingleUpload(evt,'imageIdCardName','imageIdCard')
                    evt => this.handleFileUpload(evt,'idcard')
                  }>
                  {intl.formatMessage(messages.uploadIdCard)}
                  <input 
                    id="idcard" 
                    name="idcard" 
                    type="file" 
                    accept="image/x-png,image/jpeg" 
                    style={{ display:'none' }} />
                </Button>
              </FormControl>
              
              <FormControl 
                margin="dense" 
                fullWidth>
                <Button 
                  color="primary"
                  fullWidth
                  variant="outlined" 
                  component="label"                
                  onChange={
                    // evt=>this.onSingleUpload(evt,'imageIdCardName','imageIdCard')
                    evt => this.handleFileUpload(evt,'npwp')
                  }>
                  {intl.formatMessage(messages.uploadNPWP)}
                  <input 
                    id="npwp" 
                    name="npwp" 
                    type="file" 
                    accept="image/x-png,image/jpeg" 
                    style={{ display:'none' }} />
                </Button>
              </FormControl>

              <Grid 
                container 
                wrap="wrap" 
                direction="row"
                justify="space-between"
                alignItems="flex-start">
                <Grid item style={{ marginBottom:15 }}>
                  {this.props.documents.ktp &&
                  <Grid style={{ marginTop:12, width:'130px',height:'120px' }}> 
                    <Card raised={false}>
                      <CardActionArea disableRipple>
                        <CardMediaStyled 
                          image={`${this.props.documents.ktp}`} />                    
                          {/* <div 
                            style={{ 
                              display:'flex',
                              width:'100%',
                              backgroundColor:'#000000',
                              position:'absolute',
                              opacity:0.6,
                              zIndex:40000,
                              right:0,
                              bottom:0,
                            }}>
                            <IconButton 
                              size="small" 
                              color="primary"
                              variant="contained"
                              style={{                            
                                color:'red'
                              }}>                            
                                <CloseRoundedIcon/>
                              </IconButton>
                          </div>                     */}
                      </CardActionArea>
                    </Card>
                    </Grid>              
                  }
                  </Grid>
                  <Grid item>
                  {
                    this.props.documents.idcard &&
                    <Grid style={{ marginTop:12, width:'130px',height:'120px' }}> 
                      <Card raised={false}>
                        <CardActionArea disableRipple>
                          <CardMediaStyled 
                            image={`${this.props.documents.idcard}`} />                    
                            {/* <div 
                              style={{ 
                                display:'flex',
                                width:'100%',
                                backgroundColor:'#000000',
                                position:'absolute',
                                opacity:0.7,
                                zIndex:40000,
                                right:0,
                                bottom:0,
                              }}>
                              <IconButton size="small" color="primary"
                                style={{                            
                                  color:'red'
                                }}>                            
                                  <CloseRoundedIcon/>
                                </IconButton>
                            </div>                     */}
                        </CardActionArea>
                      </Card>
                      </Grid>
                  }
                </Grid>                  
                
                <Grid item>
                  {
                    this.props.documents.npwp &&
                    <Grid style={{ marginTop:0, width:'130px',height:'120px' }}> 
                      <Card raised={false}>
                        <CardActionArea disableRipple>
                          <CardMediaStyled 
                            image={`${this.props.documents.npwp}`} />                    
                            {/* <div 
                              style={{ 
                                display:'flex',
                                width:'100%',
                                backgroundColor:'#000000',
                                position:'absolute',
                                opacity:0.7,
                                zIndex:40000,
                                right:0,
                                bottom:0,
                              }}>
                              <IconButton size="small" color="primary"
                                style={{                            
                                  color:'red'
                                }}>                            
                                  <CloseRoundedIcon/>
                                </IconButton>
                            </div>                     */}
                        </CardActionArea>
                      </Card>
                    </Grid>              
                  }
                </Grid>                  
              </Grid>
              {/* <Grid>
              <Button 
                variant="contained" 
                color="primary"
                fullWidth
                disabled={(!this.props.documents.ktp || !this.props.documents.idcard || !this.props.documents.npwp) ? true : false }>
                  submit
              </Button>
              </Grid>                           */}
              
              {/* 
              <Button 
                variant="outlined"
                color="primary"
                fullWidth
                onClick={this.captureSelfie}>
                  Capture Selfie
              </Button> */}
              {/* <img src={`${this.state.selfieImage}`} width="150px" height="115px" />               */}
            </form>
          </Grid>          
      </Wrapper>
    )
  }
}

// FormDocument.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  // formDocument: makeSelectFormDocument(),
  documents: makeSelectDocuments()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    changeDokumenKtp: value => dispatch(changeDokumenKtpAction(value)),
    changeDokumenIdcard: value => dispatch(changeDokumenIdcardAction(value)),
    addDokumen: (key, file) => dispatch(addDokumenAction(key, file))
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
)(FormDocument);
