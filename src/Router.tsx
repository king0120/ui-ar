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
import CheckInPage from "./app/pages/CheckInPage";
import MyAuditionInstance from "./app/pages/Profile/MyAuditionInstance";
import MyNotifications from "./app/pages/Profile/MyNotifications";
import MyTags from "./app/pages/Profile/MyTags";
import CompanyRegistrationPage from "./app/pages/Auth/CompanyRegistrationPage";
import PendingVerificationPage from "./app/pages/PendingVerificationPage";

const PrivateRoute: FC<any> = ({component: Component, loggedIn, ...rest}) => {
    const {theatreVerified, userType} = useContext(GlobalContext);
    if (userType.includes('theatre') && !theatreVerified) {
        return <Route {...rest} render={(props) => (
            <PendingVerificationPage />
        )}/>
    }
    return (
        <Route {...rest} render={(props) => (
            loggedIn
                ? <Component {...props} />
                : <Redirect to='/login'/>
        )}/>
    );
}

const RedirectIfLoggedIn: FC<any> = ({component: Component, loggedIn, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            loggedIn
                ? <Redirect to='/profile'/>
                : <Component {...props} />
        )}/>
    );
}

const AppRouter: FC<any> = () => {
    const {userId, theatreVerified} = useContext(GlobalContext);
    const loggedIn = userId !== 'none';
    return (
        <Switch>
            {/* Login Related */}
            <RedirectIfLoggedIn loggedIn={loggedIn} exact path='/register' component={RegistrationPage}/>
            <RedirectIfLoggedIn loggedIn={loggedIn} exact path='/register-company' component={CompanyRegistrationPage}/>
            <RedirectIfLoggedIn loggedIn={loggedIn} exact path='/login' component={LoginPage}/>
            <RedirectIfLoggedIn loggedIn={loggedIn} exact path='/passwordReset' component={PasswordResetPage}/>
            <Route loggedIn={loggedIn} exact path='/passwordReset/:token' component={PasswordResetPage}/>

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
            <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} exact
                          path='/projects/:projectId/roles/:roleId'
                          component={RoleBreakdownDetailPage}/>

            <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn}
                          path='/organization/:organizationId/projects/:projectId'
                          component={ProjectsDetailPage}/>
            <PrivateRoute theatreVerified={theatreVerified} loggedIn={loggedIn} path='/' component={ProfilePage}/>
        </Switch>
    );
};

export default AppRouter;
