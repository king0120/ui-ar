import React, {FC} from 'react';
import Flex from 'styled-flex-component';
import {Container} from '../../components/project/CommonStyledComponents';
import {
    Button,
    Divider, IconButton,
    Menu, MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom';
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {format} from 'date-fns';

const DELETE_AUDITION = require('../../../graphql/mutations/DELETE_AUDITION.gql');
const GET_AUDITIONS_FOR_PROJECT = require('../../../graphql/queries/auditions/GET_AUDITIONS_FOR_PROJECT.gql');

export const AuditionsContent: FC<any> = ({match, history, projectId, projectName}) => {
    const {loading, data} = useQuery(GET_AUDITIONS_FOR_PROJECT, {variables: {projectId}});
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [deleteAudition] = useMutation(DELETE_AUDITION, {
        refetchQueries: [{
            query: GET_AUDITIONS_FOR_PROJECT,
            variables: {projectId}
        }]
    });

    const auditions = data ? data.getAuditionsForProject : [];
    if (loading) {
        return <h1>Loading</h1>;
    }
    const openAuditions = auditions.filter((a: any) => a.open);
    const closedAuditions = auditions.filter((a: any) => !a.open);
    return (
        <>
            <div className='flex justify-between align-baseline'>
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
                                <TableCell
                                    align="right">{format(new Date(audition.startDate), 'MMMM do yyyy, h:mm:ss a')}</TableCell>
                                <TableCell align="right">{audition.auditionType}</TableCell>
                                <TableCell align="right">{audition.showInAuditionSearch}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Link
                                                to={`/organization/${match.params.organizationId}/projects/${projectId}/auditions/${audition.id}`}>
                                                Start Audition
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to={`/projects/${projectId}/audition-manager/${audition.id}`}>
                                                Manage Times
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to={`/audition/${audition.id}/checkin`}>
                                                Check In Page
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <ConfirmationModal
                                                trigger={<p>Delete Audition</p>}
                                                onConfirm={() => deleteAudition({variables: {auditionId: audition.id}})}/></MenuItem>
                                    </Menu>
                                    <Flex spaceBetween>

                                    </Flex>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Divider className="mt-10 mb-10"/>
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
                                <TableCell
                                    align="right">{format(new Date(audition.startDate), 'MMMM do yyyy, h:mm:ss a')}</TableCell>
                                <TableCell align="right">{audition.auditionType}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
};

export default (props: any) => (
    <Container>
        <AuditionsContent {...props} />
    </Container>
);
