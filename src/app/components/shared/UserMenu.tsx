import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { GlobalContext } from "context/globalContext";
import { gql } from "apollo-boost";
import { GET_NOTIFICATIONS } from "../../pages/Profile/MyNotifications";

const GET_ORGANIZATIONS_FOR_USER = require("graphql/queries/organization/GET_ORGANIZATIONS_FOR_USER.gql");

const TsIcon: any = Icon;
const GET_ACTOR = gql`
  query getActor($id: String!) {
    getActor(id: $id) {
      id
      firstName
      lastName
      profilePicture {
        url
      }
      profileImages {
        s3Key
        url
      }
    }
  }
`;

function UserMenu(props: any) {
  const { userId, userType } = useContext(GlobalContext);
  const [getActor, { data, loading }] = useLazyQuery(GET_ACTOR, {
    variables: { id: userId }
  });
  const { loading: orgLoading, data: orgData } = useQuery(
    GET_ORGANIZATIONS_FOR_USER
  );
  const { data: notifications } = useQuery(GET_NOTIFICATIONS(), {
    variables: { id: userId },
    skip: !userId
  });
  let orgs = orgData && orgData.getAllOrganizationsForUser;
  const [userMenu, setUserMenu] = useState(null);
  useEffect(() => {
    getActor();
  }, [userId, getActor]);

  if (loading || orgLoading) {
    return <></>;
  }

  const notificationNumber = notifications?.getNotifications?.notifications.filter(
    (n: any) => !n.read
  ).length;
  orgs = orgs ? [...orgs.owned, ...orgs.member] : [];
  if (!data) {
    return <div></div>;
  }
  const user = {
    role: "member",
    data: {
      displayName: `${data.getActor.firstName} ${data.getActor.lastName}`,
      email: data.getActor.email,
      photoURL:
        data.getActor.profilePicture && data.getActor.profilePicture.url,
      shortcuts: []
    }
  };

  const userMenuClick = (event: any) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const logOut = () => {
    localStorage.removeItem("accessToken");
    props.history.push("/login");
    window.location.reload();
  };

  return (
    <>
      <Button className="h-64" onClick={userMenuClick}>
        <Badge badgeContent={notificationNumber} color="primary">
          {user.data.photoURL ? (
            <Avatar className="" alt="user photo" src={user.data.photoURL} />
          ) : (
            <Avatar className="">{user.data.displayName[0]}</Avatar>
          )}
        </Badge>
        <div className="hidden md:flex flex-col ml-12 items-start">
          <Typography component="span" className="normal-case font-600 flex">
            {user.data.displayName}
          </Typography>
          <Typography className="text-11 capitalize" color="textSecondary">
            {userType.join(", ")}
          </Typography>
        </div>

        <TsIcon className="text-16 ml-12 hidden sm:flex" variant="action">
          keyboard_arrow_down
        </TsIcon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        classes={{
          paper: "py-8"
        }}
      >
        <MenuItem component={Link} to="/profile" onClick={userMenuClose}>
          <ListItemIcon className="min-w-40">
            <Icon>account_circle</Icon>
          </ListItemIcon>
          <ListItemText className="pl-0" primary="My Profile" />
        </MenuItem>
        <MenuItem
          disabled={true}
          component={Link}
          to="/profile/notifications"
          onClick={userMenuClose}
        >
          <ListItemIcon className="min-w-40">
            <Badge badgeContent={notificationNumber} color="primary">
              <Icon>notifications</Icon>
            </Badge>
          </ListItemIcon>
          <ListItemText className="pl-0" primary="My Notifications" />
        </MenuItem>
        <MenuItem
          disabled={true}
          component={Link}
          to="/profile/auditions"
          onClick={userMenuClose}
        >
          <ListItemIcon className="min-w-40">
            <Icon>audiotrack</Icon>
          </ListItemIcon>
          <ListItemText className="pl-0" primary="My Auditions" />
        </MenuItem>
        {userType.includes("theatre") && (
          <>
            {orgs.map((org: any) => (
              <MenuItem
                disabled={true}
                key={org.id}
                component={Link}
                to={`/organization/${org.id}/projects`}
                onClick={userMenuClose}
              >
                <ListItemIcon className="min-w-40">
                  <Icon>group</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary={org.name} />
              </MenuItem>
            ))}
          </>
        )}
        <MenuItem
          onClick={() => {
            window.location.href = "mailto:support@auditionrevolution.com";
          }}
        >
          <ListItemIcon className="min-w-40">
            <Icon>contact_support</Icon>
          </ListItemIcon>
          <ListItemText className="pl-0" primary="Contact Support" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            userMenuClose();
            logOut();
          }}
        >
          <ListItemIcon className="min-w-40">
            <Icon>exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText className="pl-0" primary="Logout" />
        </MenuItem>
      </Popover>
    </>
  );
}

export default withRouter(UserMenu);
