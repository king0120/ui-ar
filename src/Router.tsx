import React, {FC, Suspense, useContext} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {GlobalContext} from "./context/globalContext";

const ProfilePage = React.lazy(() => import("./app/pages/Profile/ProfilePage"));
const RegistrationPage = React.lazy(() =>
    import("./app/pages/Auth/RegistrationPage")
);
const ActorSearchPage = React.lazy(() =>
    import("./app/pages/Search/ActorSearchPage")
);
const PasswordResetPage = React.lazy(() =>
    import("./app/pages/Auth/PasswordResetPage")
);
const SettingsPage = React.lazy(() =>
    import("./app/pages/General/SettingsPage")
);
const AuditionSearchPage = React.lazy(() =>
    import("./app/pages/Search/AuditionSearchPage")
);
const MyAuditions = React.lazy(() => import("./app/pages/Profile/MyAuditions"));
const LoginPage = React.lazy(() => import("./app/pages/Auth/LogInPage"));
const MyAuditionInstance = React.lazy(() =>
    import("./app/pages/Profile/MyAuditionInstance")
);
const MyNotifications = React.lazy(() =>
    import("./app/pages/Profile/MyNotifications")
);
const MyTags = React.lazy(() => import("./app/pages/Profile/MyTags"));
const CompanyRegistrationPage = React.lazy(() =>
    import("./app/pages/Auth/CompanyRegistrationPage")
);
const PendingVerificationPage = React.lazy(() =>
    import("./app/pages/Auth/PendingVerificationPage")
);
const PendingPasswordResetPage = React.lazy(() =>
    import("./app/pages/Auth/PendingPasswordResetPage")
);


const PrivateRoute: FC<any> = ({component: Component, loggedIn, ...rest}) => {
    const {theatreVerified, verified, userType} = useContext(GlobalContext);
    if (userType.includes("theatre") && !theatreVerified) {
        return (
            <Route
                {...rest}
                render={props => <PendingVerificationPage type={"company"}/>}
            />
        );
    }
    if (userType.includes("actor") && !verified) {
        return (
            <Route
                {...rest}
                render={props => <PendingVerificationPage type={"actor"}/>}
            />
        );
    }
    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ? <Component {...props} /> : <Redirect to="/login"/>
            }
        />
    );
};

const RedirectIfLoggedIn: FC<any> = ({
                                         component: Component,
                                         loggedIn,
                                         ...rest
                                     }) => {
    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ? <Redirect to="/profile"/> : <Component {...props} />
            }
        />
    );
};

const AppRouter: FC<any> = () => {
    const {userId, theatreVerified} = useContext(GlobalContext);
    const loggedIn = userId !== "none";
    return (
        <Suspense fallback={<span/>}>
            <Switch>
                <Route exact path="/passwordReset" component={PasswordResetPage}/>
                <Route exact path="/pendingPasswordReset" component={PendingPasswordResetPage}/>
                <Route path="/passwordReset/:token" component={PasswordResetPage}/>
                {/* Login Related */}
                <RedirectIfLoggedIn
                    loggedIn={loggedIn}
                    exact
                    path="/register"
                    component={RegistrationPage}
                />
                <RedirectIfLoggedIn
                    loggedIn={loggedIn}
                    exact
                    path="/register-company"
                    component={CompanyRegistrationPage}
                />
                <RedirectIfLoggedIn
                    loggedIn={loggedIn}
                    exact
                    path="/login"
                    component={LoginPage}
                />

                <PrivateRoute
                    theatreVerified={theatreVerified}
                    loggedIn={loggedIn}
                    exact
                    path="/settings"
                    component={SettingsPage}
                />

                {/* Search */}
                <PrivateRoute
                    theatreVerified={theatreVerified}
                    loggedIn={loggedIn}
                    exact
                    path="/search/actor"
                    component={ActorSearchPage}
                />
                <PrivateRoute
                    theatreVerified={theatreVerified}
                    loggedIn={loggedIn}
                    exact
                    path="/search/audition"
                    component={AuditionSearchPage}
                />

                {/* User */}
                <PrivateRoute
                    theatreVerified={theatreVerified}
                    loggedIn={loggedIn}
                    exact
                    path="/profile/auditions"
                    component={MyAuditions}
                />
                <PrivateRoute
                    theatreVerified={theatreVerified}
                    loggedIn={loggedIn}
                    exact
                    path="/profile/notifications"
                    component={MyNotifications}
                />
                <PrivateRoute
                    theatreVerified={theatreVerified}
                    loggedIn={loggedIn}
                    exact
                    path="/profile/tags"
                    component={MyTags}
                />
                <PrivateRoute
                    theatreVerified={theatreVerified}
                    loggedIn={loggedIn}
                    exact
                    path="/profile/auditions/:instanceId"
                    component={MyAuditionInstance}
                />
                <PrivateRoute
                    theatreVerified={theatreVerified}
                    loggedIn={loggedIn}
                    exact
                    path="/profile/images"
                    component={(props: any) => <ProfilePage tabIndex={2} {...props} />}
                />
                <PrivateRoute
                    theatreVerified={theatreVerified}
                    loggedIn={loggedIn}
                    exact
                    path="/profile/:userId/images"
                    component={(props: any) => (
                        <ProfilePage
                            readOnly={true}
                            user={props.match.params.userId}
                            tabIndex={2}
                            {...props}
                        />
                    )}
                />
                <PrivateRoute
                    theatreVerified={theatreVerified}
                    loggedIn={loggedIn}
                    exact
                    path="/profile"
                    component={ProfilePage}
                />
                <PrivateRoute
                    theatreVerified={theatreVerified}
                    loggedIn={loggedIn}
                    exact
                    path="/profile/:userId"
                    component={(props: any) => <ProfilePage readOnly={true} {...props} />}
                />
                <PrivateRoute
                    theatreVerified={theatreVerified}
                    loggedIn={loggedIn}
                    path="/"
                    component={ProfilePage}
                />
            </Switch>
        </Suspense>
    );
};

export default AppRouter;
