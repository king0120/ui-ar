import React, {FC} from 'react';
import NewTimeSlot from "../../components/audition/NewTimeSlot";
import TimeSlotTable from "../../components/audition/TimeSlotTable";
import SearchTalent from "../../components/audition/SearchTalent";
import TalentList from "../../components/shared/TalentList";
import AddSingleTimeSlot from '../../components/audition/AddSingleTimeSlot';

const AuditionManagerConfiguration: FC<any> = ({allSlots, changeAllSlots, editable, audition = []}) => {

    return (
        <div>
            <h2>Audition Schedule:</h2>
            <NewTimeSlot allSlots={allSlots} changeAllSlots={changeAllSlots}/>
            <AddSingleTimeSlot />
            <TimeSlotTable allSlots={allSlots} editable={editable}/>
            <h3>Invite Talent</h3>
            <SearchTalent />
            <TalentList talent={audition.talent}/>
        </div>
    );
};

export default AuditionManagerConfiguration;
