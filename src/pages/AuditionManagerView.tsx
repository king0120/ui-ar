import React, {FC} from 'react';
import TimeSlotTable from '../components/audition/TimeSlotTable';
import TalentList from '../components/shared/TalentList';
import styled from 'styled-components';

const AuditionPageContainerStyle = styled.div`
`;

const AuditionManagerView: FC<any> = (props) => {
    if (!props.audition.talent || !props.allSlots) {
        return <></>;
    }
    const usersWithTimeslot = props.allSlots.reduce((acc: any, val: any) => {
        if (val.talent) {
            acc.push(val.talent.user.displayName);
        }
        return acc;
    }, []);

    const accepted = props.audition.talent.filter((actor: any) => {
        return usersWithTimeslot.includes(actor.user.displayName);
    });

    const pending = props.audition.talent.filter((actor: any) => {
        return !usersWithTimeslot.includes(actor.user.displayName);
    });

    const panes = [
        {menuItem: 'Accepted', render: () => <TalentList talent={accepted}/>},
        {menuItem: 'Declined', render: () => <TalentList talent={[]}/>},
        {menuItem: 'Pending', render: () => <TalentList talent={pending}/>},
    ];

    return (
        <AuditionPageContainerStyle>
            <TimeSlotTable allSlots={props.allSlots}/>
        </AuditionPageContainerStyle>
    );
};

export default AuditionManagerView;
