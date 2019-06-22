import React, {FC, useState} from 'react';
import {IProjectsDetailPage} from '../../pages/ProjectsDetailPage';
import {Container} from './CommonStyledComponents';
import {Button, Header} from 'semantic-ui-react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Link} from 'react-router-dom';
import AddAuditionModal from '../audition/AddAuditionModal';

const RowExpansion = () => {
    return (
        <>
            <h1>
                stuff here
            </h1>
        </>
    );
};

const Auditions: FC<IProjectsDetailPage> = ({project}) => {
    const auditions = project.auditions;
    const [expandedRows, setExpandedRows] = useState();
    return (
        <Container>
            <div className='role-header'>
                <Header as='h1'>Upcoming Auditions for {project.name}</Header>
                <AddAuditionModal/>
            </div>

            <DataTable
                emptyMessage={'No Auditions Available. Please Create An Audition.'}
                value={auditions}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={RowExpansion}
            >
                <Column expander={true} style={{width: '2em'}}/>
                <Column field='name' header='Audition Name'/>
                <Column field='auditionStartsOnUTC' header='Start Date'/>
                <Column field='auditionType' header='Audition Type'/>
                {/* <Column field="status" header="Status" /> */}
                <Column
                    field='showInAuditionSearch'
                    body={(rowData: any) => rowData.showInAuditionSearch === 'YES' ? 'Public' : 'Private'} header='Status'/>

                <Column body={
                    (data: any) => (
                        <Link to={`/projects/${project.id}/audition-manager/${data.id}`}>
                            <Button primary>Manage Audition</Button>
                        </Link>
                    )
                }/>
            </DataTable>
        </Container>
    );
};

export default Auditions;
