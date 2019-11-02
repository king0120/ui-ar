import React, { FC } from 'react';
import NewTimeSlot from "../../components/audition/NewTimeSlot";
import TimeSlotTable from "../../components/audition/TimeSlotTable";
import TalentList from "../../components/shared/TalentList";
import AddSingleTimeSlot from '../../components/audition/AddSingleTimeSlot';
import { Typography } from '@material-ui/core';
import CalendarApp from 'app/main/apps/calendar/CalendarApp';

const AuditionManagerConfiguration: FC<any> = ({ allSlots, changeAllSlots, editable, audition = [] }) => {

    return (
        <div>
            <Typography variant="h5">Audition Schedule:</Typography>
            <NewTimeSlot startDate={audition.startDate} allSlots={allSlots} changeAllSlots={changeAllSlots} />
            <TimeSlotTable  allSlots={allSlots} editable={editable} />
            <h3>Invite Talent</h3>
            {/* <SearchTalent />
            <ActorSearch /> */}
            <TalentList talent={audition.talent} />
        </div>
    );
};

export default AuditionManagerConfiguration;
