import React, { FC } from 'react';
import NewTimeSlot from "../../components/audition/NewTimeSlot";

import { Typography } from '@material-ui/core';

const AuditionManagerConfiguration: FC<any> = ({ allSlots, changeAllSlots, editable, audition = [] }) => {

    return (
        <div>
            <Typography variant="h5">Audition Schedule:</Typography>
            <NewTimeSlot startDate={audition.startDate} allSlots={allSlots} changeAllSlots={changeAllSlots} />
            {/* <TimeSlotTable  allSlots={allSlots} editable={editable} /> */}
            
        </div>
    );
};

export default AuditionManagerConfiguration;
