import React, { useState, FC } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import AddProjectModal from '../project/AddProjectModal';
import { format } from 'date-fns';
import { createProject } from '../../../redux/actions/projectActions';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {List, ListItem, ListItemIcon, ListItemText, Collapse, Paper, Typography, makeStyles, Tooltip} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import EditProjectModal from '../project/EditProjectModal';
import ConfirmationModal from '../shared/ConfirmationModal';
import { AuditionsContent } from 'app/pages/Audition/Auditions';
import gql from 'graphql-tag';

const GET_PROJECTS_FOR_ORG = require('../../../graphql/queries/projects/GET_PROJECTS_FOR_ORG.gql')
const DELETE_PROJECT = gql`
    mutation deleteProject($projectId: String!) {
        deleteProject(projectId: $projectId)
    }
`
const useStyles = makeStyles(() => ({
    root: {
        width: '20%'
    }
}));

const ProjectListItem = ({ project, organizationId }: any) => {
    const [expanded, setExpanded] = useState(false)
    const classes = useStyles();
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { projectId: project.id },
        refetchQueries: [{
            query: GET_PROJECTS_FOR_ORG,
            variables: { organizationId }
        }]
    })
    return (
        <Paper>
            <ListItem onClick={() => setExpanded(!expanded)}>
                <ListItemText classes={classes}
                    primary={
                        <Link to={`/organization/${organizationId}/projects/${project.id}/dashboard`}>
                            <Typography variant="h6">{project.name}</Typography>
                        </Link>}
                    secondary={
                        <Link to={`/organization/${organizationId}/projects/${project.id}/dashboard`}>
                            <Typography variant="body1">Directed By: {project.director}</Typography>
                        </Link>}
                />
                <ListItemText primary={<Typography variant="body1">Rehearsals: </Typography>} secondary={
                    <Typography variant="body1">{project.rehearsalDateStart && format(new Date(project.rehearsalDateStart), 'MMM do, yyyy')} to {project.rehearsalDateEnd && format(new Date(project.rehearsalDateEnd), 'MMM do, yyyy')}</Typography>
                }
                />
                <ListItemText primary={<Typography variant="body1">Performance: </Typography>} secondary={
                    <Typography variant="body1">{project.performanceDateStart && format(new Date(project.performanceDateStart), 'MMM do, yyyy')} to {project.performanceDateEnd && format(new Date(project.performanceDateEnd), 'MMM do, yyyy')}</Typography>
                }
                />
                <ListItemIcon>
                    <Tooltip title="Edit This Project" aria-label="edit-project">
                        <EditProjectModal project={project} />
                    </Tooltip>
                </ListItemIcon>
                <ListItemIcon>
                    <Tooltip title="Delete This Project" aria-label="delete-project">
                        <ConfirmationModal id={project.id} onConfirm={() => deleteProject(project.id)} />
                    </Tooltip>
                </ListItemIcon>
                <ListItemIcon>
                    {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon />}
                </ListItemIcon>
            </ListItem>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <RowExpansionTemplate data={project} />
            </Collapse>
        </Paper >)

}

const TableHeader = styled.div`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
        `;

const RowExpansionTemplate = withRouter(({ match, history, data }: any) => {
    return (
        <div className="w-full mt-12 mb-12">
            <AuditionsContent match={match} history={history} projectId={data.id} projectName={data.name} />
        </div>
    );
})

export const ProjectTable: FC<any> = (props) => {
    const organizationId = props.match.params.organizationId;
    const { data, loading } = useQuery(GET_PROJECTS_FOR_ORG, { variables: { organizationId } });
    if (loading) { return <></> }
    const projects = data.getAllProjects;
    return (<>
        <TableHeader>
            <Typography variant='h4'>Upcoming Projects</Typography>
            <AddProjectModal organizationId={organizationId} handleSubmit={async (data) => {
                await props.createProject(data, organizationId);
            }} />
        </TableHeader>
        <List>
            {projects.map((project: any) => (
                <ProjectListItem project={project} organizationId={organizationId} />
            ))}
        </List>
    </>
    )
};

export default connect(null, { createProject })(withRouter(ProjectTable));
