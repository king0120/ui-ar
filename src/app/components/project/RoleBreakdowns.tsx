import React, { FC, useEffect, useState } from 'react';
import { createProjectRole, deleteRole } from '../../../redux/actions/roleActions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AddRoleBreakdownModal from '../shared/AddRoleBreakdownModal';
import RoleBreakdownActionColumn from './RoleBreakdownActionColumn';
import { Container } from './CommonStyledComponents';
import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/react-hooks";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Badge, List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, Divider, Paper, Typography, Collapse, makeStyles } from '@material-ui/core';
import {v1 as uuid} from 'uuid'

const GET_ALL_ROLES = require('graphql/queries/roles/GET_ALL_ROLES.gql');

const LabelsContainer = styled.div`
  max-width: 40%;
  .role-badge {
    display: flex;
    align-items: flex-start;
    margin: 10px;
    .label {
      margin: 0 5px;
    }
  }
`;

const useStyles = makeStyles(() => ({
    root: {
        width: '200px'
    }
}));

const RowExpansion = ({ role }: any) => {
    const ageRange = role.breakdown.ageRange || ['None'];
    const gender = role.breakdown.gender || ['None'];
    const unions = role.breakdown.unions || ['None'];
    const ethnicity = role.breakdown.ethnicity || ['None'];
    const vocalRange = role.breakdown.vocalRange || ['None'];
    return (
        <>
            <LabelsContainer>
                <div className='role-badge'>
                    Age Range: {ageRange.map((a: string, i: number) => a ? <Badge key={`${uuid()}${i}${a}`}>{a},  </Badge> : null)}
                </div>
                <div className='role-badge'>
                    Gender: {gender.map((a: string, i: number) => a ? <Badge key={`${uuid()}${i}${a}`}>{a},  </Badge> : null)}
                </div>
            </LabelsContainer>
            <LabelsContainer>
                <div className='role-badge'>
                    Ethnicity: {ethnicity.map((a: string, i: number) => a ? <Badge key={`${uuid()}${i}${a}`}>{a},  </Badge> : null)}
                </div>
                <div className='role-badge'>
                    Unions: {unions.map((a: string, i: number) => a ? <Badge key={`${uuid()}${i}${a}`}>{a},  </Badge> : null)}
                </div>
                <div className='role-badge'>
                    Vocal Range: {vocalRange.map((a: string, i: number) => a ? <Badge key={`${uuid()}${i}${a}`}>{a},  </Badge> : null)}
                </div>
            </LabelsContainer>
        </>
    );
};

const RoleBreakdowns: FC<any> = ({ projectId, projectName, createProjectRole, deleteRole }) => {
    const { data, loading, refetch } = useQuery(GET_ALL_ROLES, { variables: { projectId } });
    const classes = useStyles();

    useEffect(() => { refetch() }, [refetch]);
    const handleCreateRow = async (role: any) => {
        await createProjectRole(projectId, role);
        await refetch()
    };

    const handleDeleteRow = async (id: number) => {
        await deleteRole(projectId, id);
        await refetch()
    };
    if (loading) {
        return <h1>Loading</h1>
    }
    const roles = data && data.getAllRoles
    return (
        <Container>
            <Paper>
                <div className='flex p-10 justify-between align-baseline'>
                    <Typography variant='h5'>Role Breakdown for {projectName}</Typography>
                    <AddRoleBreakdownModal handleSubmit={(role) => handleCreateRow(role)} />
                </div>
                <List>
                    <ListItem alignItems="flex-start">
                        <ListItemText classes={classes} primary={"Character Name"} />
                        <ListItemText primary={"Cast Status"} />
                        <ListItemSecondaryAction>
                            Actions
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    {roles.map((role: any, i: number) => {
                        return <RoleBreakdownItem key={role.id} roles={roles} role={role} projectId={projectId} handleDeleteRow={handleDeleteRow} i={i} />
                    })}
                </List>
            </Paper>
        </Container>
    );
};


const RoleBreakdownItem = ({ roles, role, projectId, handleDeleteRow, i }: any) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false)
    return (
        <>
            <ListItem alignItems="flex-start" key={role.id}>
                <ListItemIcon onClick={() => setExpanded(!expanded)}>
                    <ExpandMoreIcon />
                </ListItemIcon>
                <ListItemText classes={classes} primary={<Link to={`/projects/${projectId}/roles/${role.id}`}>{role.characterName}</Link>} />
                <ListItemText classes={classes} primary={role.castTo ? role.castTo.displayName : "Not Cast"} />
                <ListItemSecondaryAction>
                    <RoleBreakdownActionColumn projectId={projectId} data={role}
                        deleteRole={() => handleDeleteRow(role.id)} />
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <RowExpansion role={role} />
            </Collapse>
            {i !== roles.length - 1 && <Divider />}
        </>
    )
}

export default connect(null, { createProjectRole, deleteRole })(RoleBreakdowns);
