import React, {FC, useState} from 'react';
import Flex from 'styled-flex-component'
import {Container} from './CommonStyledComponents';
import {Button, Header} from 'semantic-ui-react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Link} from 'react-router-dom';
import AddAuditionModal from '../audition/CreateAuditionModal';
import ConfirmationModal from '../shared/ConfirmationModal';
import {useMutation, useQuery} from "@apollo/react-hooks";

const DELETE_AUDITION = require('../../graphql/mutations/DELETE_AUDITION.gql');
const GET_AUDITIONS_FOR_PROJECT = require('../../graphql/queries/auditions/GET_AUDITIONS_FOR_PROJECT.gql');

const RowExpansion = () => <h1>stuff here</h1>

const Auditions: FC<any> = ({match, projectId, projectName}) => {
    const {loading, data} = useQuery(GET_AUDITIONS_FOR_PROJECT, {variables: {projectId}})
    const [expandedRows, setExpandedRows] = useState();
    const [deleteAudition] = useMutation(DELETE_AUDITION, {
        refetchQueries: [{
            query: GET_AUDITIONS_FOR_PROJECT,
            variables: {projectId}}]
    });

    const auditions = data ? data.getAuditionsForProject : [];
    if (loading) {
        return <h1>Loading</h1>
    }
    return (
        <Container>
            <div className='role-header'>
                <Header as='h1'>Upcoming Auditions for {projectName}</Header>
                <AddAuditionModal projectId={projectId}/>
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
                                <Link
                                    to={`/organization/${match.params.organizationId}/projects/${projectId}/auditions/${data.id}`}>
                                    <Button primary>Start Audition</Button>
                                </Link>
                                <Link to={`/projects/${projectId}/audition-manager/${data.id}`}>
                                    <Button primary>Manage Audition</Button>
                                </Link>
                                <ConfirmationModal
                                    onConfirm={() => deleteAudition({variables: {auditionId: data.id}})}/>
                            </Flex>
                        )
                    }/>
            </DataTable>
        </Container>
    );
};

export default Auditions;
