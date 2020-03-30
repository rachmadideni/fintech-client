import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { color, typography } from '../../../styles/constants';

const HeaderText = styled(Typography)`
&& {
    font-family:${typography.fontFamily};
    font-weight:bold;
    font-size:14px;
    padding-left:10px;
}`;

const ContentText = styled(Typography)`
&& {
    font-family:${typography.fontFamily};
    font-weight:normal;
    font-size:12px;
    color:${color.subtleBlack};
}`;

const GridWrapper = styled(props=>{
    return (
        <Grid item {...props}>
            {props.children}
        </Grid>
    )
})`
&& {
    background-color:${color.lightGrey};
    padding:15px;
    border-radius:6px;
}`;

const ActionButton = styled(Button)`
&& {
    font-family:${typography.fontFamily};
    text-transform:capitalize;
    font-weight:bold;
    box-shadow:none;
}`;

export {
    HeaderText,
    GridWrapper,
    ContentText,
    ActionButton
}