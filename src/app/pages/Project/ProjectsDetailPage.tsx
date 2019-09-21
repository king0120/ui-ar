import React, {FC} from 'react';
import ProjectSidebar from '../../components/project/ProjectSidebar';
import styled from 'styled-components';
import {Route} from 'react-router-dom';
import RoleBreakdowns from '../../components/project/RoleBreakdowns';
import Auditions from '../../components/project/Auditions';
import {Dashboard} from '../../components/project/ProjectsDetailDashboard';
import {useQuery} from "@apollo/react-hooks";

const GET_PROJECT = require('../../../graphql/queries/projects/GET_PROJECT.gql');
const DetailPageStyles = styled.div`
  display: flex;
  width: 100%;
  position: relative;

  .displayDashboard {
    margin: 10px;
  }
`;

const ProjectsDetailPage: FC<any> = ({match}) => {
    const {
        loading,
        data
    }: any = useQuery(GET_PROJECT, {variables: {projectId: match!.params.projectId}})

    if (loading) {return <></>}
    const project = data.getOneProject
    return (
        <DetailPageStyles>
            {loading && <h1>Loading</h1>}
            {!loading && (
                <>
                    <ProjectSidebar/>
                    <div className='detail-view'>
                        <Route path={`${match!.path}/dashboard`}
                               component={(props: any) => <Dashboard projectId={match.params.projectId} {...props}/>}/>
                        <Route path={`${match!.path}/roles`}
                               component={(props: any) => <RoleBreakdowns projectName={project.name}
                                                                          projectId={match.params.projectId} {...props}/>}/>
                        <Route path={`${match!.path}/auditions`}
                               component={(props: any) => <Auditions projectName={project.name}
                                                                     projectId={match.params.projectId} {...props}/>}/>
                        <Route path={`${match!.path}/teams`} component={(props: any) => <h1>Cast</h1>}/>
                        <Route path={`${match!.path}/messaging`} component={(props: any) => <h1>Messaging</h1>}/>
                    </div>

                </>
            )}
        </DetailPageStyles>
    );
};

export default ProjectsDetailPage;
