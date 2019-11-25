import React, {FC, useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ProjectsList from './app/pages/Organization/OrganizationPage';
import ProjectsDetailPage from './app/pages/Project/ProjectsDetailPage';
import AuditionManagerPage from './app/pages/Audition/AuditionManagerPage';
import OrgSelectPage from './app/pages/Organization/OrgSelectPage';
import ProfilePage from './app/pages/Profile/ProfilePage';
import RegistrationPage from './app/pages/Auth/RegistrationPage';
import ActorSearchPage from './app/pages/Search/ActorSearchPage';
import PasswordResetPage from './app/pages/Auth/PasswordResetPage';
import SettingsPage from './app/pages/General/SettingsPage';
import RoleBreakdownDetailPage from './app/pages/Project/RoleBreakdownDetailPage';
import AuditionResponse from "./app/pages/Audition/AuditionResponse";
import AuditionPage from "./app/pages/Audition/AuditionPage";
import AuditionSearchPage from "./app/pages/Search/AuditionSearchPage";
import MyAuditions from "./app/pages/Profile/MyAuditions";
import {GlobalContext} from "./context/globalContext";
import LoginPage from './app/pages/Auth/LogInPage';
import AuditionRSVPPage from 'app/pages/AuditionRSVPPage';

const PrivateRoute: FC<any> = ({component: Component, loggedIn, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            loggedIn
                ? <Component {...props} />
                : <Redirect to='/login'/>
        )}/>
    );
}

const RedirectIfLoggedIn: FC<any> = ({component: Component, loggedIn, ...rest}) => {
    console.log("REDIRECT", loggedIn)
    return (
        <Route {...rest} render={(props) => (
            loggedIn
                ? <Redirect to='/profile'/>
                : <Component {...props} />
        )}/>
    );
}

const AppRouter: FC<any> = () => {
    const {userId} = useContext(GlobalContext);
    console.log("UPDATE USERID", userId)
    const loggedIn = userId !== 'none'
    return (
            <Switch>
                {/* Login Related */}
                <RedirectIfLoggedIn loggedIn={loggedIn} exact path='/register' component={RegistrationPage}/>
                <RedirectIfLoggedIn loggedIn={loggedIn} exact path='/login' component={LoginPage}/>
                <RedirectIfLoggedIn loggedIn={loggedIn} exact path='/passwordReset' component={PasswordResetPage}/>
                <RedirectIfLoggedIn loggedIn={loggedIn} exact path='/passwordReset/:token' component={PasswordResetPage}/>

                <Route path='/audition/:auditionId' component={AuditionRSVPPage}/>
                <Route exact path='/auditionResponse' component={AuditionResponse}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/settings' component={SettingsPage}/>

                {/* Search */}
                <PrivateRoute loggedIn={loggedIn} exact path='/search/actor' component={ActorSearchPage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/search/audition' component={AuditionSearchPage}/>

                <PrivateRoute loggedIn={loggedIn} exact path='/organization' component={OrgSelectPage}/>

                {/* User */}
                <PrivateRoute loggedIn={loggedIn} exact path='/profile/auditions' component={MyAuditions}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/profile/images' component={(props: any) => <ProfilePage tabIndex={2} {...props}/>}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/profile/:userId/images'
                              component={(props: any) => <ProfilePage readOnly={true} user={props.match.params.userId} tabIndex={2} {...props}/>}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/profile' component={ProfilePage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/profile/:userId'
                              component={(props: any) => <ProfilePage readOnly={true} {...props}/>}/>
                {/* Project/Org */}
                <PrivateRoute loggedIn={loggedIn} exact path='/organization/:organizationId/projects'
                              component={ProjectsList}/>
                <PrivateRoute loggedIn={loggedIn} exact
                              path='/organization/:organizationId/projects/:projectId/auditions/:auditionId'
                              component={AuditionPage}/>
                <PrivateRoute loggedIn={loggedIn} path='/projects/:projectId/audition-manager/:auditionId'
                              component={AuditionManagerPage}/>
                <PrivateRoute loggedIn={loggedIn} exact path='/projects/:projectId/roles/:roleId'
                              component={RoleBreakdownDetailPage}/>
                              
                <PrivateRoute loggedIn={loggedIn} path='/organization/:organizationId/projects/:projectId'
                              component={ProjectsDetailPage}/>
                <PrivateRoute loggedIn={loggedIn} path='/' component={ProfilePage}/>
            </Switch>
    );
};

export default AppRouter;
