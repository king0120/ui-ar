import React, {FC} from 'react';
import {Button, Card, Item} from 'semantic-ui-react';
import {removeExperience} from '../../actions/talentActions';
import {connect} from 'react-redux';
import styled from 'styled-components';

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

const ExperienceList: FC<any> = ({experiences = [], value, type, removeExperience, readOnly}) => {
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
                                    <Button onClick={() => removeExperience(value, exp.id)} icon='trash' color={'red'} floated='right'/>}
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

export default connect(null, {removeExperience})(ExperienceList);
