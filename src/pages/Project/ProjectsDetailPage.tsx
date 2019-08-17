import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {IProject} from '../../types/IProject';
import ProjectSidebar from '../../components/project/ProjectSidebar';
import styled from 'styled-components';
import {fetchProject} from '../../actions/projectActions';
import {match, Route} from 'react-router-dom';
import RoleBreakdowns from '../../components/project/RoleBreakdowns';
import Auditions from '../../components/project/Auditions';
import {Dashboard} from '../../components/project/ProjectsDetailDashboard';

const DetailPageStyles = styled.div`
  display: flex;
  width: 100%;
  position: relative;

  .displayDashboard {
    margin: 10px;
  }
`;

export interface IProjectsDetailPage {
    project: IProject & { [key: string]: string };
    match?: match<{ projectId: string }>;
    fetchProject: (projectId: string) => {};
}

const ProjectsDetailPage: FC<IProjectsDetailPage> = ({project, match, fetchProject}) => {
    useEffect(() => {
        if (match) {
            fetchProject(match.params.projectId);
        }
    }, [match, fetchProject]);

    if (!project) {
        return <h1>Loading</h1>;
    }

    return (
        <DetailPageStyles>
            <ProjectSidebar/>
            <div className='detail-view'>
                <Route path={`${match!.path}/dashboard`} component={(props: any) => <Dashboard project={project} {...props}/>}/>
                <Route path={`${match!.path}/roles`} component={(props: any) => <RoleBreakdowns project={project} {...props}/>}/>
                <Route path={`${match!.path}/auditions`} component={(props: any) => <Auditions project={project} {...props}/>}/>
                <Route path={`${match!.path}/teams`} component={(props: any) => <h1>Cast</h1>}/>
                <Route path={`${match!.path}/messaging`} component={(props: any) => <h1>Messaging</h1>}/>
            </div>

        </DetailPageStyles>
    );
};

const mapStateToProps = (state: any, props: any) => {
    return {
        project: state.projects.project,
    };
};
export default connect(mapStateToProps, {fetchProject})(ProjectsDetailPage);
