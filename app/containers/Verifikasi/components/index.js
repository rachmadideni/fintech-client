import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { color, typography } from '../../../styles/constants';
import bggreen01 from '../../../images/bg_green_1.png';

const Wrapper = styled(Grid)`
&& {
  flex:1;
//   padding-top:100px;
  position: relative;
//   background-image: url(${bggreen01});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  justify-content:center;
  align-items:center;
//   padding-left:25px;
//   padding-right:25px;
  opacity: 0.9;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // background-color:${color.lightGrey};
    // background-image: linear-gradient(to right, ${color.lightGrey} 100%, ${
  color.lightGrey
} 40%);
    opacity: 1;
  }  
}`;

const StyledPaper = styled(Paper)`
  && {
    border-radius: 12px;
    padding: 15px 20px 20px 20px;
  }
`;

const AppTitle = styled(Typography)`
  && {
    font-family: ${typography.fontFamily};
    font-size: 16px;
    font-weight: bold;
    color: ${color.subtleBlack};
    padding: 0px 10px 0px 0px;
  }
`;

const PaperTitle = styled(Typography)`
  && {
    font-family: ${typography.fontFamily};
    font-weight: bold;
    color: ${color.subtleBlack};
  }
`;

const PaperSubtitle = styled(Typography)`
  && {
    font-family: ${typography.fontFamily};
    font-size: 12px;
    font-weight: normal;
    color: ${color.subtleBlack};
  }
`;

const CustomTextField = styled(TextField)`
  && {
    font-family: ${typography.fontFamily};
    font-size: 12px;
    background-color: ${color.white};
    border-radius: 4px;
    text-transform: capitalize;
  }
`;

const PaperButton = styled(Button)`
  && {
    margin-top: 10px;
    font-family: ${typography.fontFamily};
    font-weight: bold;
    text-transform: capitalize;
  }
`;

export {
  Wrapper,
  StyledPaper,
  AppTitle,
  PaperTitle,
  PaperSubtitle,
  CustomTextField,
  PaperButton,
};
