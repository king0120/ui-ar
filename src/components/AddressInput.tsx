import React from 'react';
import * as places from 'places.js';
import {Input} from 'semantic-ui-react';

class AddressInput extends React.Component<any> {
    static defaultProps = {
        handleChange: () => {}
    }
    componentDidMount(): void {
        const placeInstance = places({
            appId: 'plL5W1957CCG',
            apiKey: '8f309db6542eab1fb7c18b83fcff357c',
            container: document.querySelector('#address-input'),
        });

        placeInstance.configure({
            language: 'en',
            countries: ['us'],
        });

        placeInstance.on('change', (e: any) => {
            console.log(e.suggestion)
            this.props.handleChange(e.suggestion);
        });
    }

    render() {
        return <Input fluid type='search' id='address-input' placeholder='Where are we going?'/>;
    }
}

export default AddressInput;
