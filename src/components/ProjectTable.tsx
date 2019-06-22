import React from 'react';
import {Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Link} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import AddProjectModal from './AddProjectModal';
import ProjectActionColumn from './ProjectActionColumn';
import {IProject} from '../types/IProject';
import {format} from 'date-fns';
import {createProject, deleteProject} from '../actions/project/projectThunkActions';
import {fetchOrganization} from '../actions/organization/organizationThunkActions';

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

interface IProjectTableProps {
    createProject: (data: any, orgId: number) => {};
    deleteProject: (data: any) => {};
    fetchOrganization: (id: number) => {};
    projects: IProject[];
    organizationId: number;
}

interface IProjectTableState {
    expandedRows: any[];
}

export class ProjectTable extends React.Component<IProjectTableProps, IProjectTableState> {
    state = {
        expandedRows: [],
    };

    rowExpansionTemplate(data: IProject) {
        return (
            <Link to={`/projects/${data.id}/dashboard`}>
                <div className='p-grid p-fluid' style={{padding: '1em'}}>
                    <Header as={'h2'}>{data.name}</Header>
                    <Header as={'h3'}>aka: {data.shortName}</Header>
                    <div>
                        <h4>Summary</h4>
                        <p>{data.projectSummary}</p>
                        <hr></hr>
                        <h4>Notes</h4>
                        <div>
                            <p>{data.projectNotes}</p>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    render() {
        return (
            <>
                <TableHeader>
                    <Header as='h2'>Upcoming Projects</Header>
                    <AddProjectModal handleSubmit={async (data) => {
                        await this.props.createProject(data, this.props.organizationId);
                        await this.props.fetchOrganization(this.props.organizationId);
                    }}/>
                </TableHeader>
                <DataTable
                    emptyMessage={'No Projects Available. Please Create A Project.'}
                    value={this.props.projects}
                    expandedRows={this.state.expandedRows}
                    onRowToggle={(e) => this.setState({expandedRows: e.data})}
                    rowExpansionTemplate={this.rowExpansionTemplate}>
                    <Column expander={true} style={{width: '2em'}}/>
                    <Column field='name' header='Project Name' body={(data: any) => <Link
                        to={`/organization/${this.props.organizationId}/projects/${data.id}/dashboard`}>{data.name}</Link>}/>
                    <Column field='director' header='Director'/>
                    <Column
                        field='auditionDate'
                        header='Audition Dates'
                        body={(rowData: IProject) => (
                            format(rowData.auditionDate, 'MMM Do, YYYY')
                        )}
                    />
                    <Column
                        field='callbackDate'
                        header='Callback Dates'
                        body={(rowData: IProject) => (
                            format(rowData.callbackDate, 'MMM Do, YYYY')
                        )}
                    />
                    <Column body={
                        (data: any) => <ProjectActionColumn data={data} deleteProject={this.props.deleteProject}/>
                    } header='Actions'/>
                </DataTable>
            </>
        );
    }
}

const mapStateToProps = (state: any) => ({
    projects: state.projects.projects,
    organizationId: state.organization.organization.id
});
export default connect(mapStateToProps, {createProject, fetchOrganization, deleteProject})(ProjectTable);
