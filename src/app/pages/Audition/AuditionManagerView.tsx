import React, {FC} from 'react';
import styled from 'styled-components';

const AuditionPageContainerStyle = styled.div`
`;

const AuditionManagerView: FC<any> = (props) => {
    if (!props.audition.talent || !props.allSlots) {
        return <></>;
    }
    return (
        <AuditionPageContainerStyle>
            {/* <TimeSlotTable allSlots={props.allSlots}/> */}
        </AuditionPageContainerStyle>
    );
};

export default AuditionManagerView;
