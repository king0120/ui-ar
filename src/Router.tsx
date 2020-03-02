import React, {FC, Suspense, useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {GlobalContext} from './context/globalContext';

const ProjectsList = React.lazy(() => import('./app/pages/Organization/OrganizationPage'));
const ProjectsDetailPage = React.lazy(() => import('./app/pages/Project/ProjectsDetailPage'));
const AuditionManagerPage = React.lazy(() => import('./app/pages/Audition/AuditionManagerPage'));
const OrgSelectPage = React.lazy(() => import('./app/pages/Organization/OrgSelectPage'));
const ProfilePage = React.lazy(() => import('./app/pages/Profile/ProfilePage'));
const RegistrationPage = React.lazy(() => import('./app/pages/Auth/RegistrationPage'));
const ActorSearchPage = React.lazy(() => import('./app/pages/Search/ActorSearchPage'));
const PasswordResetPage = React.lazy(() => import('./app/pages/Auth/PasswordResetPage'));
const SettingsPage = React.lazy(() => import('./app/pages/General/SettingsPage'));
const AuditionResponse = React.lazy(() => import('./app/pages/Audition/AuditionResponse'));
const AuditionPage = React.lazy(() => import('./app/pages/Audition/AuditionPage'));
const AuditionSearchPage = React.lazy(() => import('./app/pages/Search/AuditionSearchPage'));
const MyAuditions = React.lazy(() => import('./app/pages/Profile/MyAuditions'));
const LoginPage = React.lazy(() => import('./app/pages/Auth/LogInPage'));
const AuditionRSVPPage = React.lazy(() => import('app/pages/AuditionRSVPPage'));
const CheckInPage = React.lazy(() => import('./app/pages/CheckInPage'));
const MyAuditionInstance = React.lazy(() => import('./app/pages/Profile/MyAuditionInstance'));
const MyNotifications = React.lazy(() => import('./app/pages/Profile/MyNotifications'));
const MyTags = React.lazy(() => import('./app/pages/Profile/MyTags'));
const CompanyRegistrationPage = React.lazy(() => import('./app/pages/Auth/CompanyRegistrationPage'));
const PendingVerificationPage = React.lazy(() => import('./app/pages/PendingVerificationPage'));

const PrivateRoute: FC<any> = ({component: Component, loggedIn, ...rest}) => {
    const {theatreVerified, verified, userType} = useContext(GlobalContext);
    if (userType.includes('theatre') && !theatreVerified) {
        return <Route {...rest} render={(props) => (
            <PendingVerificationPage type={'company'}/>
        )}/>;
    }
    if (userType.includes('actor') && !verified) {
        return <Route {...rest} render={(props) => (
            <PendingVerificationPage type={'actor'}/>
        )}/>;
    }
    console.log('PRIVATE ROUTER', rest);
    return (
        <Route {...rest} render={(props) => (
            loggedIn
                ? <Component {...props} />
                : <Redirect to='/login'/>
        )}/>
    );
};

const RedirectIfLoggedIn: FC<any> = ({component: Component, loggedIn, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            loggedIn
                ? <Redirect to='/profile'/>
                : <Component {...props} />
        )}/>
    );
};

const AppRouter: FC<any> = () => {
    const {userId, theatreVerified} = useContext(GlobalContext);
    const loggedIn = userId !== 'none';
    return (
        <Suspense fallback={<span/>}>
            <Switch>

                <Route exact path='/passwordReset' component={PasswordResetPage}/>
                <Route path='/passwordReset/:token' component={PasswordResetPage}/>
                {/* Login Related */}
                <RedirectIfLoggedIn loggedIn={loggedIn} exact path='/register' component={RegistrationPage}/>
                <RedirectIfLoggedIn loggedIn={loggedIn} exact path='/register-company' component={CompanyRegistrationPage}/>
                <RedirectIfLoggedIn loggedIn={loggedIn} exact path='/login' component={LoginPage}/>


                <Route path='/audition/:auditionId/checkIn' component={CheckInPage}/>
                <Route path='/audition/:auditionId' component={AuditionRSVPPage}/>
                <Route path='/pendingVerification' component={AuditionRSVPPage}/>
                <Route exact path='/auditionResponse' component={AuditionResponse}/>
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact path='/settings'
                              component={SettingsPage}/>

                {/* Search */}
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact path='/search/actor'
                              component={ActorSearchPage}/>
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact path='/search/audition'
                              component={AuditionSearchPage}/>

                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact path='/organization'
                              component={OrgSelectPage}/>

                {/* User */}
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact path='/profile/auditions'
                              component={MyAuditions}/>
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact path='/profile/notifications'
                              component={MyNotifications}/>
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact path='/profile/tags'
                              component={MyTags}/>
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact
                              path='/profile/auditions/:instanceId' component={MyAuditionInstance}/>
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact path='/profile/images'
                              component={(props: any) => <ProfilePage tabIndex={2} {...props}/>}/>
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact path='/profile/:userId/images'
                              component={(props: any) => <ProfilePage readOnly={true} user={props.match.params.userId}
                                                                      tabIndex={2} {...props}/>}/>
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact path='/profile'
                              component={ProfilePage}/>
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact path='/profile/:userId'
                              component={(props: any) => <ProfilePage readOnly={true} {...props}/>}/>
                {/* Project/Org */}
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact
                              path='/organization/:organizationId/projects'
                              component={ProjectsList}/>
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact
                              path='/organization/:organizationId/projects/:projectId/auditions/:auditionId'
                              component={AuditionPage}/>
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn}
                              path='/projects/:projectId/audition-manager/:auditionId'
                              component={AuditionManagerPage}/>
                {/*<PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact*/}
                {/*              path='/projects/:projectId/roles/:roleId'*/}
                {/*              component={RoleBreakdownDetailPage}/>*/}

                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn}
                              path='/organization/:organizationId/projects/:projectId'
                              component={ProjectsDetailPage}/>
                <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} path='/' component={ProfilePage}/>
            </Switch>
        </Suspense>
    );
};

export default AppRouter;
