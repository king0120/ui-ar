import React, {FC} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ProjectsList from './pages/Organization/OrganizationPage';
import ProjectsDetailPage from './pages/Project/ProjectsDetailPage';
import AuditionManagerPage from './pages/Audition/AuditionManagerPage';
import OrgSelectPage from './pages/Organization/OrgSelectPage';
import {connect} from 'react-redux';
import LogInPage from './pages/Auth/LogInPage';
import ProfilePage from './pages/Profile/ProfilePage';
import HomePage from './pages/General/HomePage';
import RegistrationPage from './pages/Auth/RegistrationPage';
import ProfileImagePage from './pages/Profile/ProfileImagePage';
import ActorSearchPage from './pages/Search/ActorSearchPage';
import PasswordResetPage from './pages/Auth/PasswordResetPage';
import SettingsPage from './pages/General/SettingsPage';
import RoleBreakdownDetailPage from './pages/Project/RoleBreakdownDetailPage';
import AuditionResponse from "./pages/Audition/AuditionResponse";
import Auditions from "./components/project/Auditions";
import AuditionPage from "./pages/Audition/AuditionPage";
import AuditionSearchPage from "./pages/Search/AuditionSearchPage";
import MyAuditions from "./pages/Profile/MyAuditions";

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
                <Route exact path='/auditionResponse' component={AuditionResponse}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/settings' component={SettingsPage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/search/actor' component={ActorSearchPage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/search/audition' component={AuditionSearchPage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/organization' component={OrgSelectPage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/profile/auditions' component={MyAuditions}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/profile/images' component={ProfileImagePage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/profile/:userId/images'
                              component={(props: any) => <ProfileImagePage readOnly={true} {...props}/>}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/profile' component={ProfilePage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/profile/:userId'
                              component={(props: any) => <ProfilePage readOnly={true} {...props}/>}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/organization/:organizationId/projects' component={ProjectsList}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/organization/:organizationId/projects/:projectId/auditions/:auditionId' component={AuditionPage}/>
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
