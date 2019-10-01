import React, { FC, useState } from 'react';
import Flex from 'styled-flex-component'
import { Container } from '../../components/project/CommonStyledComponents';
import { Header } from 'semantic-ui-react';
import { Button } from '@material-ui/core'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import AddAuditionModal from './CreateAudition';
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Typography, Divider } from '@material-ui/core';

const DELETE_AUDITION = require('../../../graphql/mutations/DELETE_AUDITION.gql');
const GET_AUDITIONS_FOR_PROJECT = require('../../../graphql/queries/auditions/GET_AUDITIONS_FOR_PROJECT.gql');

const RowExpansion = () => <h1>stuff here</h1>

const Auditions: FC<any> = ({ location, match, history, projectId, projectName }) => {
    const { loading, data } = useQuery(GET_AUDITIONS_FOR_PROJECT, { variables: { projectId } })
    const [expandedRows, setExpandedRows] = useState();
    const [deleteAudition] = useMutation(DELETE_AUDITION, {
        refetchQueries: [{
            query: GET_AUDITIONS_FOR_PROJECT,
            variables: { projectId }
        }]
    });

    const auditions = data ? data.getAuditionsForProject : [];
    if (loading) {
        return <h1>Loading</h1>
    }
    const openAuditions = auditions.filter((a: any) => a.open);
    const closedAuditions = auditions.filter((a: any) => !a.open);
    return (
        <Container>
            <div className='role-header'>
                <Typography variant="h6">Upcoming Auditions for {projectName}</Typography>
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => history.push(`/organization/${match.params.organizationId}/projects/${projectId}/createAudition`)}>
                        Create Audition
                </Button>
            </div>
            <DataTable
                emptyMessage={'No Auditions Available. Please Create An Audition.'}
                value={openAuditions}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={RowExpansion}
            >
                <Column expander={true} style={{ width: '2em' }} />
                <Column field='name' header='Audition Name' />
                <Column field='startDate' header='Start Date' />
                <Column field='auditionType' header='Audition Type' />
                <Column
                    field='showInAuditionSearch'
                    body={(rowData: any) => rowData.private ? 'Private' : 'Public'} header='Status' />

                <Column
                    body={
                        (data: any) => (
                            <Flex spaceBetween>
                                <Link
                                    to={`/organization/${match.params.organizationId}/projects/${projectId}/auditions/${data.id}`}>
                                    <Button color="primary">Start Audition</Button>
                                </Link>
                                <Link to={`/projects/${projectId}/audition-manager/${data.id}`}>
                                    <Button color="primary">Manage Audition</Button>
                                </Link>
                                <ConfirmationModal
                                    onConfirm={() => deleteAudition({ variables: { auditionId: data.id } })} />
                            </Flex>
                        )
                    } />
            </DataTable>

            <Divider className="mt-10 mb-10" />
            <Typography variant="h6">Previous Auditions</Typography>
            <DataTable
                emptyMessage={'No Auditions have been Closed.'}
                value={closedAuditions}
            >
                <Column field='name' header='Audition Name' />
                <Column field='startDate' header='Start Date' />
                <Column field='auditionType' header='Audition Type' />
            </DataTable>

        </Container>
    );
};

export default Auditions;
