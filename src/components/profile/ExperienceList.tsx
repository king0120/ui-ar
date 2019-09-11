import React, {FC, useContext} from 'react';
import {Button, Card, Item} from 'semantic-ui-react';
import styled from 'styled-components';
import {useMutation} from "@apollo/react-hooks";
import {GlobalContext} from "../../context/globalContext";

const REMOVE_EXPERIENCE = require('../../graphql/mutations/profile/REMOVE_EXPERIENCE.gql')
const GET_USER = require('../../graphql/queries/user/GET_USER.gql')

const ItemHeaderStyle = styled(Item.Header)`
    &&&&&& {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        div{
            width: 50%;
            p {
               padding: 0;
            }
            .smaller {
                color: rgba(0,0,0,.6);
                font-size: 1rem;
            }
        }
    }
`;

const ExperienceList: FC<any> = ({experiences = [], value, type, readOnly}) => {
    const {userId} = useContext(GlobalContext);
    const [removeExperience] = useMutation(REMOVE_EXPERIENCE, {
        refetchQueries: [{
            query: GET_USER,
            variables: {id: userId}
        }]
    });
    if (!experiences.length) {
        return null;
    }

    return (
        <Card fluid>
            <Card.Header><h1>{type}</h1></Card.Header>
            <Card.Content>
                <Item.Group divided>
                    {experiences.map((exp: any) => (
                        <Item key={exp.id}>
                            <Item.Content>
                                <ItemHeaderStyle>
                                    <div>
                                        <p>Role: {exp.role}</p>
                                        <p className={'smaller'}>Project: {exp.project}</p>
                                    </div>
                                    {!readOnly &&
                                    <Button onClick={() => removeExperience({
                                        variables: {
                                            data: {
                                                experienceType: value,
                                                experienceId: exp.id
                                            }
                                        }
                                    })
                                    }
                                            icon='trash' color={'red'} floated='right'/>}
                                </ItemHeaderStyle>
                                <Item.Description>
                                    {exp.description || 'No Description Provided'}
                                </Item.Description>
                                <Item.Extra>
                                    <p>Company: {exp.company} Director: {exp.director}</p>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            </Card.Content>
        </Card>
    );
};

export default ExperienceList;
