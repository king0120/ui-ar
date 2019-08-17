import React, {FC} from 'react';
import {Button} from 'semantic-ui-react';

const HomePage: FC<any> = ({history}) => {
    return (
        <div>
            <h1>Audition Revolution</h1>
            <h1>V2</h1>

            <Button onClick={() => history.push('/profile')}>Go To Profile</Button>
            <Button onClick={() => history.push('/organization')}>Go To Casting</Button>
        </div>
    );
};

export default HomePage;
