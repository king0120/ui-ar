import React, {FC, useCallback} from 'react';
import {Column} from 'primereact/column';
import moment from 'moment';
import {Button, Modal, Radio} from 'semantic-ui-react';
import {DataTable} from 'primereact/datatable';
import AuditionTimeSlotActionColumn from '../AuditionTimeSlotActionColumn';
import {ActorSearch} from '../../pages/ActorSearchPage';
import {useDispatch, useSelector} from 'react-redux';
import {inviteToAudition} from '../../actions/audition/auditionThunkActions';

function OpenTimeSlot(props: any) {
    const projectId = useSelector((state: any) => state.projects.project.id);
    const auditionId = useSelector((state: any) => state.auditions.audition.id);
    const dispatch = useDispatch();
    const invite = useCallback(
        (id, timeSlotId) => {
            dispatch(inviteToAudition(projectId, auditionId, id, timeSlotId));
        },
        [dispatch, projectId, auditionId],
    );
    return (
        <>
            <em>Available</em>
            <Modal trigger={<Button>Invite Actor</Button>}>
                <Modal.Header>Invite Actor</Modal.Header>
                <Modal.Content>
                    <ActorSearch handleClickTalent={(id: string) => invite(id, props.timeSlotId)}/>
                </Modal.Content>
            </Modal>

        </>
    );
}

const TimeSlotTable: FC<any> = ({allSlots, editable = false, header}) => {
    return (
        <>
            <h1>Times</h1>
            <DataTable
                responsive={true}
                sortField={'startTime'}
                defaultSortOrder={1}
                emptyMessage={'No Timeslots Available. Please Create A Timeslot.'}
                value={allSlots} header={header}>
                <Column field='startTime' body={(data: any) => moment(data.startTime).format('h:mm a')}
                        header={'Start Time'}/>
                <Column field='endTime' body={(data: any) => moment(data.endTime).format('h:mm a')}
                        header={'End Time'}/>
                <Column field='talentInstance'
                        body={(data: any) => {
                            if (data.talent) {
                                const {displayName} = data.talent.user;
                                return <p>{displayName}</p>;
                            } else {
                                return <OpenTimeSlot timeSlotId={data.id}/>;
                            }
                        }} header={'Actor'}
                />
                <Column body={(data: any) => (
                    <>
                        <div>
                            Confirmed || Denied
                        </div>
                        <div>
                            Conflicts
                        </div>
                    </>
                )} header={'Status'}/>
                <Column body={(data: any) => (
                    <>
                        Any || List of Characters
                    </>
                )} header={'For Roles'}/>
                <Column body={(data: any) => (
                    <>
                        Send Message || Remove Actor ||
                    </>
                )} header={'Actions'}/>
                {editable ? (
                      <Column body={
                        (data: any) => <AuditionTimeSlotActionColumn data={data}/>
                    } header='Actions'/>
                ) : <div style={{display: 'none'}}></div>}
            </DataTable>
        </>
    );
};

export default TimeSlotTable;
