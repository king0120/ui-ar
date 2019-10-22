import React, { useState, FC } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import AddProjectModal from '../project/AddProjectModal';
import { format } from 'date-fns';
import { createProject, deleteProject } from '../../../redux/actions/projectActions';
import { useQuery } from '@apollo/react-hooks';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Paper, Typography, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Popup } from 'semantic-ui-react';
import EditProjectModal from '../project/EditProjectModal';
import ConfirmationModal from '../shared/ConfirmationModal';
import { AuditionsContent } from 'app/pages/Audition/Auditions';

const GET_PROJECTS_FOR_ORG = require('../../../graphql/queries/projects/GET_PROJECTS_FOR_ORG.gql')

const useStyles = makeStyles(() => ({
    root: {
        width: '20%'
    }
}));

const ProjectListItem = ({ project, organizationId }: any) => {
    const [expanded, setExpanded] = useState(false)
    const classes = useStyles();
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
                    <Typography variant="body1">{format(project.rehearsalDateStart, 'MMM Do, YYYY')} to {format(project.rehearsalDateEnd, 'MMM Do, YYYY')}</Typography>
                }
                />
                <ListItemText primary={<Typography variant="body1">Performance: </Typography>} secondary={
                    <Typography variant="body1">{format(project.performanceDateStart, 'MMM Do, YYYY')} to {format(project.performanceDateEnd, 'MMM Do, YYYY')}</Typography>
                }
                />
                <ListItemIcon>
                    <Popup
                        inverted
                        trigger={
                            <EditProjectModal project={project} />
                        }
                        content='Edit This Project'
                    />
                </ListItemIcon>
                <ListItemIcon>
                    <Popup
                        inverted
                        trigger={
                            <ConfirmationModal id={project.id} onConfirm={() => deleteProject(project.id)} />
                        }
                        content='Delete This Project'
                    />
                </ListItemIcon>
                <ListItemIcon>
                    <ExpandMoreIcon />
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
        <AuditionsContent match={match} history={history} projectId={data.id} projectName={data.name} />
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
            <AddProjectModal handleSubmit={async (data) => {
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

export default connect(null, { createProject, deleteProject })(withRouter(ProjectTable));
