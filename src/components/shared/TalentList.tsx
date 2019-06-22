import React, {FC} from 'react';
import {List, Image} from 'semantic-ui-react';

interface ITalentList {
    talent: any[]
}

const TalentList: FC<ITalentList> = ({talent = []}) => {
    return (
        <List>
            { talent.map((actor) => {
                return (
                    <List.Item key={actor.id}>
                        <Image avatar src='https://www.fillmurray.com/100/100' />
                        <List.Content>
                            <List.Header as='a'>{actor.user.displayName}</List.Header>
                            <List.Description>
                                <p>{actor.user.email}</p>
                            </List.Description>
                        </List.Content>
                    </List.Item>
                )
            }) }
        </List>
    );
};

export default TalentList;
