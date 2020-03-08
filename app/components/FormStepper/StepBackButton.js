import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

function StepBackButton(props){
    const { 
        active, 
        onClickBack, 
        ...otherProps 
    } = props;
    
    return (
        <Grid 
            {...otherProps}>
            <IconButton 
                edge="start" 
                color={active ? 'primary' : 'default'} 
                disable={active}
                disableRipple={!active ? true : false }
                onClick={onClickBack}>
                <ChevronLeft />
            </IconButton>
        </Grid>
    );
}

export default StepBackButton;