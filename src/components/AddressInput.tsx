import React from 'react';
import * as places from 'places.js';
import {Input} from 'semantic-ui-react';

class AddressInput extends React.Component<any> {
    static defaultProps = {
        handleChange: () => {}
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
            countries: ['us'],
        });

        placeInstance.on('change', (e: any) => {
            console.log(e.suggestion)
            this.props.handleChange(e.suggestion);
            this.setState({value: e.suggestion.value})
        });

        if (this.props.defaultValue) {
            this.setState({value: this.props.defaultValue})
        }
    }

    render() {
        return <Input fluid type='search' id='address-input' value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} placeholder='Where are we going?'/>;
    }
}

export default AddressInput;
