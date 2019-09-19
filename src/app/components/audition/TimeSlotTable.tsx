import React, {FC} from 'react';
import {Column} from 'primereact/column';
import moment from 'moment';
import {Button, Modal} from 'semantic-ui-react';
import {DataTable} from 'primereact/datatable';
import AuditionTimeSlotActionColumn from './AuditionTimeSlotActionColumn';
import {ActorSearch} from '../../pages/Search/ActorSearchPage';
import {Link, withRouter} from 'react-router-dom';
import {useMutation} from "@apollo/react-hooks";

const INVITE_TO_AUDITION = require('../../../graphql/mutations/INVITE_TO_AUDITION.gql')
const GET_AUDITION = require('../../../graphql/queries/auditions/GET_AUDITION.gql');

function OpenTimeSlot(props: any) {
    const {projectId, auditionId, timeSlotId } = props;
    const [inviteToAudition] = useMutation(INVITE_TO_AUDITION)
    const invite = async (userId: string) => {
        await inviteToAudition({
            variables: {
                projectId,
                auditionId,
                userId: userId,
                timeSlotId
            },
            refetchQueries:[{
                query: GET_AUDITION,
                variables: {auditionId}
            }]
        });
    };
    return (
        <>
            <em>Available</em>
            <Modal trigger={<Button>Invite Actor</Button>}>
                <Modal.Header>Invite Actor</Modal.Header>
                <Modal.Content>
                    <ActorSearch handleClickTalent={invite}/>
                </Modal.Content>
            </Modal>

        </>
    );
}

const TimeSlotTable: FC<any> = ({match, allSlots, editable = false, header}) => {
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
                                return (
                                    <Link to={`/profile/${data.talent.user.id}`}>{displayName}</Link>
                                );
                            } else {
                                return <OpenTimeSlot
                                    auditionId={match.params.auditionId}
                                    projectId={match.params.projectId}
                                    timeSlotId={data.id}/>;
                            }
                        }} header={'Actor'}
                />
                <Column body={(data: any) => {
                    if (data.talent) {
                        return <div> {data.talent.status} </div>;
                    }
                }} header={'Status'}/>
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
                <Column body={
                    (data: any) => <AuditionTimeSlotActionColumn data={data}/>
                } header='Actions'/>
            </DataTable>
        </>
    );
};

export default withRouter(TimeSlotTable);
