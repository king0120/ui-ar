import React, { FC } from 'react';
import { format } from 'date-fns';
import { Button, Modal, TableBody } from 'semantic-ui-react';
import AuditionTimeSlotActionColumn from './AuditionTimeSlotActionColumn';
import { ActorSearch } from '../../pages/Search/ActorSearchPage';
import { Link, withRouter } from 'react-router-dom';
import { useMutation } from "@apollo/react-hooks";
import { Table, TableCell, TableHead, TableRow, Paper, Typography } from '@material-ui/core';

const INVITE_TO_AUDITION = require('../../../graphql/mutations/INVITE_TO_AUDITION.gql')
const GET_AUDITION = require('../../../graphql/queries/auditions/GET_AUDITION.gql');

function OpenTimeSlot(props: any) {
    const { projectId, auditionId, timeSlotId } = props;
    const [inviteToAudition] = useMutation(INVITE_TO_AUDITION)
    const invite = async (userId: string) => {
        await inviteToAudition({
            variables: {
                projectId,
                auditionId,
                userId: userId,
                timeSlotId
            },
            refetchQueries: [{
                query: GET_AUDITION,
                variables: { auditionId }
            }]
        });
    };
    return (
        <>
            
            <Modal trigger={<Button><em>Available</em></Button>}>
                <Modal.Header>Invite Actor</Modal.Header>
                <Modal.Content>
                    <ActorSearch handleClickTalent={invite} />
                </Modal.Content>
            </Modal>

        </>
    );
}

const TimeSlotTable: FC<any> = ({ match, allSlots, editable = false, header }) => {
    return (
        <Paper>
            <Typography className="p-5" variant="h4">Times</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                        <TableCell>Actor</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>For Roles</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allSlots.map((data: any) => (
                        <TableRow key={data.id}>
                        <TableCell>
                                {format(new Date(data.startTime), 'h:mm a')}
                            </TableCell>
                            <TableCell>
                                {format(new Date(data.endTime), 'h:mm a')}
                            </TableCell>
                            <TableCell>
                                {
                                    data.talent ?
                                        <Link to={`/profile/${data.talent.user.id}`}>{data.talent.user.displayName}</Link>
                                        :
                                        <OpenTimeSlot
                                            auditionId={match.params.auditionId}
                                            projectId={match.params.projectId}
                                            timeSlotId={data.id} />
                                }
                            </TableCell>
                            <TableCell>
                                {data.talent && data.talent.status}
                            </TableCell>
                            <TableCell>
                                Any || List of Characters
                            </TableCell>
                            <TableCell>
                                Send Message || Remove Actor ||
                            </TableCell>
                            <TableCell>
                                <AuditionTimeSlotActionColumn data={data} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default withRouter(TimeSlotTable);
