import React, {FC, SyntheticEvent, useState} from 'react';
import {Button, Dropdown, Form, Image, Input, List} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {searchUsers} from '../actions/searchActions';
import {withRouter} from 'react-router-dom';

function NoReduxActorSearch(props: any) {
    const [value, changeValue] = useState('');
    const [type, changeType] = useState('displayName');
    const handleDropdownChange = (e: SyntheticEvent, {value}: any) => changeType(value);
    const options = [
        {key: 'email', text: 'E-mail', value: 'email'},
        {key: 'displayName', text: 'Name', value: 'displayName'},
    ];
    return (
        <>
            <Form onSubmit={() => props.searchUsers({value, type})}>
                <Input
                    fluid
                    action={
                        <>
                            <Dropdown onChange={handleDropdownChange} button basic floating options={options} defaultValue='displayName'/>
                            <Button type='submit'>Search</Button>
                        </>}
                    icon='search'
                    iconPosition='left'
                    placeholder='Search for Talent...'
                    value={value}
                    onChange={(e) => changeValue(e.target.value)}
                />
            </Form>
            {
                props.results.length && (
                    <>
                        <h3>{props.results.length} results: </h3>
                        <List size={'medium'} relaxed={true}>
                            {props.results.map((result: any) => (
                                <List.Item key={result.id} onClick={() => props.handleClickTalent(result.id)}>
                                    <Image size={'tiny'} rounded src={result.profilePicture}/>
                                    <List.Content>
                                        <List.Header as='a'>{result.displayName}</List.Header>
                                        <List.Description>

                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>
                    </>
                )
            }
        </>
    );
}

const mapStateToProps = (state: any) => ({
    results: state.search.data || [],
});

export const ActorSearch = connect(mapStateToProps, {searchUsers})(NoReduxActorSearch);

const ActorSearchPage: FC<any> = (props) => {
    const handleClickTalent = (id: string) => props.history.push(`/profile/${id}`);

    return (
        <div>
            <h1>Actor Search</h1>
            <ActorSearch handleClickTalent={handleClickTalent}/>
        </div>
    );
};

export default withRouter(ActorSearchPage);
