import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { color, typography } from '../../../styles/constants';

// HEADER
const Header = styled(props=>{
    return (
        <Grid item {...props}>
            <HeaderText align="left">
                quik menu
            </HeaderText>
        </Grid>
    )
})`
&& {
    padding-top:10px;
    padding-left:15px;
    padding-bottom:5px;
}`;

const HeaderText = styled(Typography)`
&& {
    font-family:${typography.fontFamily};
    font-size:13px;
    font-weight:bold;
    color:${color.subtleBlack};
    text-transform:capitalize;
}`;

// GRID WRAPPER
const GridWrapper = styled(props=>{
    return (
      <Grid {...props} />
    )
  })`
  && {
    flex-direction:row;  
    justify-content:flex-start;
    align-items:flex-start;
    width:330px;
    padding-top:5px;
    padding-left:5px;
    padding-bottom:5px;
    background-color:${color.lightGrey};
    border-radius:6px;  
  }`;

// Grid Item
const GridItem = styled(props=>{
  return (
    <Grid {...props} />
  )
})`
&& {  
  // background-color: ${props => props.active ? color.green : color.lightGrey};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${props => props.active ? "linear-gradient(to bottom, #76b852, #8dc26f)" : color.lightGrey};
  width:80px;
  height:70px;
  margin:5px;
  padding:15px 10px;  
  border-radius:6px;
  text-align:center;
  align-items:center;
  justify-content:center;
}`;

// Quick Menu ITem
const MenuType = styled(Typography)`
 && {
  padding-top:2px;
  font-family:${typography.fontFamily};
  font-size:11px;
  font-weight:bold;
  color:${props => props.active ? color.white : color.grey};
  text-transform:capitalize;
 }`;

const QuickMenuItem = ({ item, i, handleMenu }) => (
    <ButtonBase
        key={`item-${i}`} 
        centerRipple
        disabled={!item.active}
        style={{ borderRadius:6 }}
        onClick={ evt => handleMenu(item.step)}>
        <GridItem 
            item
            active={item.active}>
            <item.icon 
                style={{ 
                    color: item.active ? `${color.white}` : `${color.grey}`,
                    fontSize:20
                }} />
                <MenuType 
                    align="center" 
                    gutterBottom
                    active={item.active}>
                    {item.name}
                </MenuType>
        </GridItem>
    </ButtonBase>
);

export {
    Header,
    GridWrapper,
    GridItem,
    QuickMenuItem
}