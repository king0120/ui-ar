import React from 'react';
import {Loader, Dimmer} from "semantic-ui-react";

function WithLoading(Component: any) {
    return function WithLoadingComponent(props: any) {
        if (!props.loading) return (<Component {...props} />);
        return (
            <Dimmer active>
                <Loader>Loading</Loader>
            </Dimmer>
        );
    }
}

export default WithLoading
