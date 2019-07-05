import React, {FC} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ProjectsList from './pages/OrganizationPage';
import ProjectsDetailPage from './pages/ProjectsDetailPage';
import AuditionManagerPage from './pages/AuditionManagerPage';
import OrgSelectPage from './pages/OrgSelectPage';
import {connect} from 'react-redux';
import LogInPage from './pages/LogInPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import ProfileImagePage from './pages/ProfileImagePage';
import ActorSearchPage from './pages/ActorSearchPage';
import PasswordResetPage from './pages/PasswordResetPage';
import SettingsPage from './pages/SettingsPage';
import RoleBreakdownDetailPage from './pages/RoleBreakdownDetailPage';

const PrivateRoute: FC<any> = ({component: Component, loggedIn, ...rest}) => (
    <Route {...rest} render={(props) => (
        loggedIn
            ? <Component {...props} />
            : <Redirect to='/login'/>
    )}/>
);

const AppRouter: FC<any> = ({loggedIn, children}) => {
    return (
        <>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route exact path='/register' component={RegistrationPage}/>
                <Route exact path='/login' component={LogInPage}/>
                <Route exact path='/passwordReset' component={PasswordResetPage}/>
                <Route exact path='/passwordReset/:token' component={PasswordResetPage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/settings' component={SettingsPage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/search/actor' component={ActorSearchPage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/organization' component={OrgSelectPage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/profile/images' component={ProfileImagePage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/profile/:userId/images'
                              component={(props: any) => <ProfileImagePage readOnly={true} {...props}/>}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/profile' component={ProfilePage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/profile/:userId'
                              component={(props: any) => <ProfilePage readOnly={true} {...props}/>}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/organization/:organizationId/projects' component={ProjectsList}/>
                <PrivateRoute loggedIn={loggedIn} path='/projects/:projectId/audition-manager/:auditionId' component={AuditionManagerPage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/projects/:projectId/roles/:roleId' component={RoleBreakdownDetailPage}/>
                <PrivateRoute loggedIn={loggedIn} path='/organization/:organizationId/projects/:projectId' component={ProjectsDetailPage}/>
            </Switch>
        </>
    );
};

const mapStateToProps = (state: any) => ({
    loggedIn: state.user.loggedIn,
});
export default connect(mapStateToProps)(AppRouter);
