import React, {FC, useCallback, useEffect, useState} from 'react';
import {createProjectRole, deleteRole, fetchRolesForProject} from '../../actions/roleActions';
import {connect} from 'react-redux';
import {Header, Label} from 'semantic-ui-react';
import styled from 'styled-components';
import {IRole} from '../../types/IRole';
import AddRoleBreakdownModal from '../shared/AddRoleBreakdownModal';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import RoleBreakdownActionColumn from './RoleBreakdownActionColumn';
import {Container} from './CommonStyledComponents';
import {Link} from 'react-router-dom';

const LabelsContainer = styled.div`
  max-width: 40%;
  .role-badge {
    display: flex;
    align-items: center;
    margin: 10px;
    .label {
      margin: 0 5px;
    }
  }
`;

const RowExpansion = (role: IRole) => {
    const ageRange = role.breakdown.ageRange || ['None'];
    const gender = role.breakdown.gender || ['None'];
    const unions = role.breakdown.unions || ['None'];
    const ethnicity = role.breakdown.ethnicity || ['None'];
    const vocalRange = role.breakdown.vocalRange || ['None'];
    return (
        <>
            <LabelsContainer>
                <div className='role-badge'>
                    Age Range: {ageRange.map((a: string, i: number) => a && <Label key={`${i}${a}`}>{a}</Label>)}
                </div>
                <div className='role-badge'>
                    Gender: {gender.map((a: string, i: number) => a && <Label key={`${i}${a}`}>{a}</Label>)}
                </div>
            </LabelsContainer>
            <LabelsContainer>
                <div className='role-badge'>
                    Ethnicity: {ethnicity.map((a: string, i: number) => a && <Label key={`${i}${a}`}>{a}</Label>)}
                </div>
                <div className='role-badge'>
                    Unions: {unions.map((a: string, i: number) => a && <Label key={`${i}${a}`}>{a}</Label>)}
                </div>
                <div className='role-badge'>
                    Vocal Range: {vocalRange.map((a: string, i: number) => a && <Label key={`${i}${a}`}>{a}</Label>)}
                </div>
            </LabelsContainer>
        </>
    );
};

const RoleBreakdowns: FC<any> = ({roles, projectId, projectName, fetchRolesForProject, createProjectRole, deleteRole}) => {
    const [expandedRows, setExpandedRows] = useState();
    useEffect(() => {
        fetchRolesForProject(projectId);
    }, [projectId, fetchRolesForProject]);

    const handleCreateRow = async (role: any) => {
        await createProjectRole(projectId, role);
        await fetchRolesForProject(projectId);
    };

    const handleDeleteRow = async (id: number) => {
        await deleteRole(projectId, id);
        await fetchRolesForProject(projectId);
    };
    return (
        <Container>
            <div className='role-header'>
                <Header as='h1'>Role Breakdown for {projectName}</Header>
                <AddRoleBreakdownModal handleSubmit={(role) => handleCreateRow(role)}/>
            </div>

            <DataTable
                emptyMessage={'No Roles Available. Please Create A Role.'}
                value={roles}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={RowExpansion}
            >
                <Column expander={true} style={{width: '2em'}}/>
                <Column header='Character Name' body={(data: any) => (
                    <Link to={`/projects/${projectId}/roles/${data.id}`}>{data.characterName}</Link>
                )}/>
                <Column field='characterSummary' header='Character Summary'/>
                <Column header='Cast To' body={
                    (data: any) => data.castTo && data.castTo.displayName || "Not Cast"
                }/>
                <Column body={
                    (data: any) => <RoleBreakdownActionColumn projectId={projectId} data={data} deleteRole={() => handleDeleteRow(data.id)}/>
                } header='Actions'/>
            </DataTable>
        </Container>
    );
};

const mapStateToProps = (state: any) => {
    return {
        roles: state.roles.roles,
    };
};

export default connect(mapStateToProps, {fetchRolesForProject, createProjectRole, deleteRole})(RoleBreakdowns);
