import React, {FC, useState} from 'react';
import Flex from 'styled-flex-component'
import {Container} from './CommonStyledComponents';
import {Button, Header} from 'semantic-ui-react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Link} from 'react-router-dom';
import AddAuditionModal from '../audition/CreateAuditionModal';
import ConfirmationModal from '../shared/ConfirmationModal';
import {deleteAudition} from "../../actions/auditionActions";
import {connect} from 'react-redux';

const RowExpansion = () => {
    return (
        <>
            <h1>
                stuff here
            </h1>
        </>
    );
};

const Auditions: FC<any> = ({project, deleteAudition}) => {
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
                <Column field='startDate' header='Start Date'/>
                <Column field='auditionType' header='Audition Type'/>
                <Column
                    field='showInAuditionSearch'
                    body={(rowData: any) => rowData.private ? 'Private' : 'Public'} header='Status'/>

                <Column
                    body={
                        (data: any) => (
                            <Flex spaceBetween>
                                <Link to={`/projects/${project.id}/audition-manager/${data.id}`}>
                                    <Button primary>Manage Audition</Button>
                                </Link>
                                <ConfirmationModal onConfirm={() => deleteAudition(project.id, data.id)}/>
                            </Flex>
                        )
                    }/>
            </DataTable>
        </Container>
    );
};

export default connect(null, {deleteAudition})(Auditions);
