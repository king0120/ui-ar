import React, {useState} from 'react';
import {Button, Form, Input, List} from "semantic-ui-react";
import {useLazyQuery} from "@apollo/react-hooks";
import {Container} from '../../components/project/CommonStyledComponents';
const SEARCH_AUDITIONS = require('../../graphql/queries/SEARCH_AUDITIONS.gql');

const AuditionSearchPage = () => {
    const [value, changeValue] = useState('')
    const [searchAuditions, {loading, data}] = useLazyQuery(SEARCH_AUDITIONS);
    const results = data && data.searchForAuditions;

    return (
        <Container>
            <h1>Audition Search</h1>
            <Form onSubmit={() => {
            }}>
                <Input
                    fluid
                    action={<Button type='submit'
                    onClick={() => searchAuditions({variables: {query: value}})}>Search</Button>}
                    icon='search'
                    iconPosition='left'
                    placeholder='Search for Auditions...'
                    value={value}
                    onChange={(e) => changeValue(e.target.value)}
                />
            </Form>
            {
                !loading && results && (
                    <>
                        <h3>{results.length} results: </h3>
                        <List size={'medium'} relaxed={true}>
                            {results.map((result: any) => (
                                <List.Item key={result.id} onClick={() => console.log('clicked')}>
                                    {/*<Image size={'tiny'} rounded src={result.profilePicture}/>*/}
                                    <List.Content>
                                        <List.Header as='a'>{result.name}</List.Header>
                                        <List.Description>
                                            {result.address}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>
                    </>
                )
            }
        </Container>
    );
};

export default AuditionSearchPage;
