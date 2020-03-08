import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';

function StepNextButton(props){
    const { 
        isDisabled, 
        onClickNext 
    } = props;
    
    return (
        <Grid>
            <IconButton 
                edge="start"
                size="medium" 
                color="primary" 
                disabled={isDisabled}
                onClick={onClickNext}>
                <ChevronRight />
            </IconButton>
        </Grid>
    )
}

export default StepNextButton;