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

import {
  makeSelectOpsiDokumenTahap1,
  makeSelectUploadedFiles
} from '../FormSubmissionStep/selectors';

import {
  // addDokumenAction,
  getOpsiDokumenTahap1Action,
  uploadAction
} from './actions'

import messages from './messages';
import { color, typography } from '../../styles/constants';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

import {
  createBlob,
  createObjectURL
} from 'blob-util';


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
}`;

const Overlay = styled.div`
  display:flex;
  width:100%;
  background-color:#000000;
  position:absolute;
  opacity:0.7;
  z-index:0;
  right:0px;
  bottom:0px;
  padding-left:10px;
  padding-top:5px;
  padding-bottom:5px;
`;

const TextOverlay = styled(Typography)`
&& {
  font-family:${typography.fontFamily};
  font-weight:bold;
  font-size:10px;
  color:${color.white};
  text-transform:capitalize;
}`;

class FormDocument extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      // selfieImageName:"",
      // selfieImage:null,
      // imageKTPName:"",
      // imageKTP:null,
      // imageIdCardName:"",
      // imageIdCard:null,
      // files:[]
    }
    // this.onSingleUpload = this.onSingleUpload.bind(this);
  }

  componentDidMount(){
    this.props.getOpsiDokumenTahap1();
    // navigator.mediaDevices.enumerateDevices().then(result=>console.log(result))
    // navigator.mediaDevices.getUserMedia({video: true}).then(result=>console.log(result))
  }

  // onSingleUpload( evt, statename, statefile){
  //   let file = evt.target.files[0];
  //   let filename = evt.target.files[0].name;

  //   this.getAsBase64(file).then(base64=>{
  //     this.setState({
  //       [statename]:filename,
  //       [statefile]:base64
  //     });
  //   })
  // }  
  
  
  getAsBase64 = (file) => {
    return new Promise((resolve,reject)=>{
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  
  handleFile = (event, idberk) => {
    if(!!event.target.files && !!event.target.files[0])
    {
      console.log(event.target.files);
      const objectURL = URL.createObjectURL(event.target.files[0]);      
      const file = event.target.files[0];
      return this.props.upload(idberk, file, objectURL);
      // const base64Img = this.getAsBase64(event.target.files[0]).then(base64 => base64);
    }
    return false;
  }

  render(){

    const { 
      // intl,
      // documents,
      // changeDokumenKtp,
      // changeDokumenIdcard,
      opsiDokumenTahap1
    } = this.props;

    // console.log(this.state.files);

    return (
      <Wrapper 
        container 
        wrap="nowrap"
        direction="column"
        alignItems="flex-end"
        justify="flex-end">
          <Grid item>
            <form autoComplete="off"> 
              {
                opsiDokumenTahap1.map((item,index) => (
                <FormControl 
                  margin="dense" 
                  fullWidth>
                  
                  <Button
                    key={`item-${index}`} 
                    color="primary"
                    fullWidth
                    variant="outlined" 
                    component="label"                
                    onChange={ 
                      evt => this.handleFile(evt, item.IDBERK)
                      }>
                    {item.NMBERK}
                    <input 
                      id={item.IDBERK}
                      name={item.NMBERK} 
                      type="file"
                      multiple 
                      accept="image/x-png,image/jpeg" 
                      style={{ display:'none' }} />
                  </Button>
                </FormControl>
              ))}

              {/* 
                RENDER FILE SETELAH USER PICK DOKUMEN (dari storage atau hasil jepret kamera)
              */}

              <Grid 
                container 
                wrap="wrap" 
                direction="row"
                justify="space-between"
                alignItems="flex-start">
                
                {/* display uploaded files */}

                {this.props.uploadedFiles.map((item,index)=>(
                  <Grid 
                    item 
                    style={{ marginBottom:15 }}>                   
                    
                    <Grid style={{ marginTop:12, width:'130px',height:'120px' }}> 
                      <Card raised={false}>
                        <CardActionArea >
                          <CardMediaStyled image={`${item.objectURL}`} />
                          <Overlay>
                              <TextOverlay>
                                {opsiDokumenTahap1[index].NMBERK}                                
                              </TextOverlay>
                          </Overlay>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  </Grid>  
                ))}
              </Grid>
            </form>
          </Grid>          
      </Wrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({  
  // documents: makeSelectDocuments(),
  opsiDokumenTahap1: makeSelectOpsiDokumenTahap1(),
  uploadedFiles: makeSelectUploadedFiles()
});

function mapDispatchToProps(dispatch) {
  return {
    // changeDokumenKtp: value => dispatch(changeDokumenKtpAction(value)),
    // changeDokumenIdcard: value => dispatch(changeDokumenIdcardAction(value)),
    // addDokumen: (key, file) => dispatch(addDokumenAction(key, file)),
    getOpsiDokumenTahap1: () => dispatch(getOpsiDokumenTahap1Action()),
    upload: (idberk, file, objectURL) => dispatch(uploadAction(idberk, file, objectURL))
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
