import {Icon} from 'semantic-ui-react';
import React from 'react';
import {withRouter} from 'react-router';

const GoBackButton = (props: any) => {
    return (
        <div onClick={props.history.goBack}>
            <Icon name='arrow left'/>
            <span>Go Back</span>
        </div>
    );
};

export default withRouter(GoBackButton);
