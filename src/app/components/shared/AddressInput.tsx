import React from 'react';
import * as places from 'places.js';
import { TextField } from '@material-ui/core';

class AddressInput extends React.Component<any> {
    static defaultProps = {
        handleChange: () => { }
    }

    state = {
        value: ''
    };

    componentDidMount(): void {
        const placeInstance = places({
            appId: 'plL5W1957CCG',
            apiKey: '8f309db6542eab1fb7c18b83fcff357c',
            container: document.querySelector('#address-input'),
        });

        placeInstance.configure({
            language: 'en',
            type: 'city',
            countries: ['us'],
        });

        placeInstance.on('change', (e: any) => {
            const {name: city, administrative: state} = e.suggestion
            this.props.handleChange(city, state);
            this.setState({ value: `${city}, ${state}` })
        });

        if (this.props.defaultValue) {
            this.setState({ value: this.props.defaultValue })
        }
    }

    render() {
        return <TextField
            id='address-input'
            className="mb-16"
            label="City, State"
            autoFocus
            type="cityState"
            name="cityState"
            variant="outlined"
            required
        />
    }
}

export default AddressInput;
