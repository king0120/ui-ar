import React from 'react';
import * as places from 'places.js';
import { TextField } from '@material-ui/core';

class AddressInput extends React.Component<any> {
    static defaultProps = {
        handleChange: () => { },
        variant: 'outlined',
        type: 'city',
        label: 'City, State',
        required: true
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
            type: this.props.type,
            countries: ['us'],
        });

        placeInstance.on('change', (e: any) => {
            const {name: city, administrative: state} = e.suggestion

            if (this.props.type === 'address') {
                this.props.handleChange(e.suggestion);
            } else {
                this.props.handleChange(city, state);
            }

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
            label={this.props.label}
            fullWidth
            autoFocus
            type="cityState"
            name="cityState"
            variant={this.props.variant}
            required={this.props.required}
            {...this.props}
        />
    }
}

export default AddressInput;
