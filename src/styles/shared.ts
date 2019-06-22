import styled from 'styled-components';
import {Card} from 'semantic-ui-react';

export const CardPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
`;

export const LoginCard = styled(Card)`
    &&& {
        padding: 10px 20px;
        width: 30vw;
        margin: 0 auto;
    }
`;
