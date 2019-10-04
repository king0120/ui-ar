import React, { FC } from 'react';
import Flex from 'styled-flex-component'
import { Container } from '../../components/project/CommonStyledComponents';
import { Paper, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Typography, Divider } from '@material-ui/core';
import moment from 'moment';

const DELETE_AUDITION = require('../../../graphql/mutations/DELETE_AUDITION.gql');
const GET_AUDITIONS_FOR_PROJECT = require('../../../graphql/queries/auditions/GET_AUDITIONS_FOR_PROJECT.gql');

const Auditions: FC<any> = ({ match, history, projectId, projectName }) => {
    const { loading, data } = useQuery(GET_AUDITIONS_FOR_PROJECT, { variables: { projectId } })
    const [deleteAudition] = useMutation(DELETE_AUDITION, {
        refetchQueries: [{
            query: GET_AUDITIONS_FOR_PROJECT,
            variables: { projectId }
        }]
    });

    const auditions = data ? data.getAuditionsForProject : [];
    if (loading) {
        return <h1>Loading</h1>
    }
    const openAuditions = auditions.filter((a: any) => a.open);
    const closedAuditions = auditions.filter((a: any) => !a.open);
    return (
        <Container>
            <div className='role-header'>
                <Typography variant="h6">Upcoming Auditions for {projectName}</Typography>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => history.push(`/organization/${match.params.organizationId}/projects/${projectId}/createAudition`)}>
                    Create Audition
                </Button>
            </div>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Start Date</TableCell>
                            <TableCell align="right">AuditionType</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {openAuditions.map((audition: any) => (
                            <TableRow key={audition.name}>
                                <TableCell component="th" scope="audition">
                                    {audition.name}
                                </TableCell>
                                <TableCell align="right">{moment(audition.startDate).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                                <TableCell align="right">{audition.auditionType}</TableCell>
                                <TableCell align="right">{audition.showInAuditionSearch}</TableCell>
                                <TableCell align="right">
                                    <Flex spaceBetween>
                                        <Link
                                            to={`/organization/${match.params.organizationId}/projects/${projectId}/auditions/${audition.id}`}>
                                            <Button color="primary">Start Audition</Button>
                                        </Link>
                                        <Link to={`/projects/${projectId}/audition-manager/${audition.id}`}>
                                            <Button color="primary">Manage Times</Button>
                                        </Link>
                                        <ConfirmationModal
                                            onConfirm={() => deleteAudition({ variables: { auditionId: audition.id } })} />
                                    </Flex>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Divider className="mt-10 mb-10" />
            <Typography variant="h6">Previous Auditions</Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Start Date</TableCell>
                            <TableCell align="right">AuditionType</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {closedAuditions.map((audition: any) => (
                            <TableRow key={audition.name}>
                                <TableCell component="th" scope="audition">
                                    {audition.name}
                                </TableCell>
                                <TableCell align="right">{moment(audition.startDate).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                                <TableCell align="right">{audition.auditionType}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default Auditions;
