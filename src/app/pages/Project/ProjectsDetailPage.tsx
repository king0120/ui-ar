import React, { FC } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import RoleBreakdowns from '../../components/project/RoleBreakdowns';
import Auditions from '../Audition/Auditions';
import { Dashboard } from '../../components/project/ProjectsDetailDashboard';
import { useQuery } from "@apollo/react-hooks";
import CreateAudition from '../Audition/CreateAudition';

const GET_PROJECT = require('../../../graphql/queries/projects/GET_PROJECT.gql');
const DetailPageStyles = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  position: relative;

  .displayDashboard {
    margin: 10px;
  }
`;
// const useStyles = makeStyles((theme: Theme) => ({
//     wrapper: {
//         display: 'flex',
//         flexDirection: 'column',
//         zIndex: 4,
//         [theme.breakpoints.up('lg')]: {
//             width: navbarWidth,
//             minWidth: navbarWidth
//         }
//     },
//     wrapperFolded: {
//         background: theme.palette.secondary.dark,
//         [theme.breakpoints.up('lg')]: {
//             width: 64,
//             minWidth: 64
//         }
//     },
//     navbar: {
//         display: 'flex',
//         overflow: 'hidden',
//         flexDirection: 'column',
//         flex: '1 1 auto',
//         width: navbarWidth,
//         minWidth: navbarWidth,
//         height: '100%',
//         zIndex: 4,
//         transition: theme.transitions.create(['width', 'min-width'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.shorter
//         }),
//         boxShadow: theme.shadows[3]
//     }
// }));
//
// const buildNav = (path: string) => [{
//     'id': 'dashboard',
//     'title': 'Dashboard',
//     'type': 'item',
//     'icon': 'dashboard',
//     'url': `${path}/dashboard`
// }, {
//     'id': 'role',
//     'title': 'Role Breakdown',
//     'type': 'item',
//     'icon': 'face',
//     'url': `${path}/roles`
// }, {
//     'id': 'audition',
//     'title': 'Auditions',
//     'type': 'item',
//     'icon': 'calendar_today',
//     'url': `${path}/auditions`
// }, {
//     'id': 'teams',
//     'title': 'Project Teams',
//     'type': 'item',
//     'icon': 'group',
//     'url': `${path}/teams`
// }, {
//     'id': 'messaging',
//     'title': 'Messaging',
//     'type': 'item',
//     'icon': 'chat',
//     'url': `${path}/messaging`
// }]

const ProjectsDetailPage: FC<any> = ({ match }) => {
    const {
        loading,
        data,
        error
    }: any = useQuery(GET_PROJECT, { variables: { projectId: match!.params.projectId } })

    if (loading) { return <></> }
    if (error) { return <p>error</p> }
    const project = data.getOneProject
    return (
        <DetailPageStyles>
            {loading && <h1>Loading</h1>}
            {!loading && (
                <>
                    <div className='detail-view w-full'>
                        <Route
                            path={`${match!.path}/dashboard`}
                            component={(props: any) => <Dashboard projectId={match.params.projectId} {...props} />}
                        />
                        <Route
                            path={`${match!.path}/roles`}
                            component={(props: any) => (
                                <RoleBreakdowns
                                    projectName={project.name}
                                    projectId={match.params.projectId}
                                    {...props}
                                />
                            )}
                        />
                        <Route
                            path={`${match!.path}/createAudition`}
                            component={(props: any) => (
                                <CreateAudition
                                    projectName={project.name}
                                    projectId={match.params.projectId}
                                    {...props} />
                            )}
                        />
                        <Route
                            path={`${match!.path}/auditions`}
                            component={(props: any) => (
                                <Auditions
                                    projectName={project.name}
                                    projectId={match.params.projectId} {...props}
                                />
                            )}
                        />

                        <Route path={`${match!.path}/teams`} component={(props: any) => <h1>Cast</h1>} />
                        <Route path={`${match!.path}/messaging`} component={(props: any) => <h1>Messaging</h1>} />
                    </div>

                </>
            )}
        </DetailPageStyles>
    );
};

export default ProjectsDetailPage;
