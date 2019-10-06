import React, {useState, FC} from 'react';
import {Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Link, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import AddProjectModal from '../project/AddProjectModal';
import ProjectActionColumn from './ProjectActionColumn';
import {format} from 'date-fns';
import {createProject, deleteProject} from '../../../redux/actions/projectActions';
import {useQuery} from '@apollo/react-hooks';

const GET_PROJECTS_FOR_ORG = require('../../../graphql/queries/projects/GET_PROJECTS_FOR_ORG.gql')

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const RowExpansionTemplate = (data: any) => {
    return (
        <div className='p-grid p-fluid' style={{padding: '1em'}}>
            <Header as={'h2'}>{data.name}</Header>
            <Header as={'h3'}>Written By: {data.writer}</Header>
            <Header as={'h3'}>Directed By: {data.director}</Header>

            <div>
                <h4>Summary</h4>
                <p>{data.summary}</p>
                <h4>Notes</h4>
                <div>
                    <p>{data.notes}</p>
                </div>
            </div>
            <hr></hr>
            <div>
                <h4>Rehearsal Dates</h4>
                {format(data.rehearsalDateStart, 'MMM Do, YYYY')} to {format(data.rehearsalDateEnd, 'MMM Do, YYYY')}
            </div>
            <hr></hr>
            <div>
                <h4>Performance Dates</h4>
                {format(data.performanceDateStart, 'MMM Do, YYYY')} to {format(data.performanceDateEnd, 'MMM Do, YYYY')}
            </div>
        </div>
    );
}

export const ProjectTable: FC<any> = (props) => {
    const [expandedRows, setExpandedRows] = useState([])
    const organizationId = props.match.params.organizationId;
    const {data, loading} = useQuery(GET_PROJECTS_FOR_ORG, {variables: {organizationId}});
    if (loading) { return <></> }
    const projects = data.getAllProjects;
    return (<>
            <TableHeader>
                <Header as='h2'>Upcoming Projects</Header>
                <AddProjectModal handleSubmit={async (data) => {
                    await props.createProject(data, organizationId);
                }}/>
            </TableHeader>
            <DataTable
                emptyMessage={'No Projects Available. Please Create A Project.'}
                value={projects}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data as any)}
                rowExpansionTemplate={RowExpansionTemplate}>
                <Column expander={true} style={{width: '2em'}}/>
                <Column field='name' header='Project Name' body={(data: any) => <Link
                    to={`/organization/${organizationId}/projects/${data.id}/dashboard`}>{data.name}</Link>}/>
                <Column field='director' header='Director'/>
                <Column
                    field='rehearsalDateStart'
                    header='Rehearsal Start'
                    body={(rowData: any) => (
                        format(rowData.rehearsalDateStart, 'MMM Do, YYYY')
                    )}
                />
                <Column
                    field='performanceDateStart'
                    header='Performance Start'
                    body={(rowData: any) => (
                        format(rowData.performanceDateStart, 'MMM Do, YYYY')
                    )}
                />
                <Column body={
                    (data: any) => <ProjectActionColumn data={data} deleteProject={props.deleteProject}/>
                } header='Actions'/>
            </DataTable>
        </>

    )
};

export default connect(null, {createProject, deleteProject})(withRouter(ProjectTable));
