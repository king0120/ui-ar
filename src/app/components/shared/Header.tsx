import React, { useContext, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { GlobalContext } from "../../../context/globalContext";
import makeStyles from "@material-ui/styles/makeStyles";
import { useSelector } from "react-redux";
import {
  AppBar,
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Toolbar
} from "@material-ui/core";
import UserMenu from "app/components/shared/UserMenu";
import ArLogo from "../../../static/AR_Logo.png";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";

const useStyles = makeStyles((theme: any) => ({
  separator: {
    width: 1,
    height: 64,
    backgroundColor: theme.palette.divider
  }
}));

const Header = (props: any) => {
  const { userType } = useContext(GlobalContext);
  const { push } = useHistory();
  const [dbButtonToggle, setDbButtonToggle] = useState(null as any);
  const classes = useStyles(props);
  if (
    props.location.pathname === "/login" ||
    props.location.pathname === "/register" ||
    props.location.pathname === "/passwordReset"
  ) {
    return null;
  }

  const handleLogoClick = () => {
    push("/profile");
  };

  return (
    <AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
      <Toolbar className="p-0">
        <div
          className="flex flex-1 justify-start align-center"
          onClick={handleLogoClick}
        >
          <img className="w-128 max-h-64 pl-12" src={ArLogo} alt="logo" />
        </div>

        <div className="flex">
          {userType.includes("theatre") && (
            <>
              <Button onClick={event => setDbButtonToggle(event.currentTarget)}>
                Talent Database
              </Button>
              <div className={classes.separator} />
              <Popover
                open={Boolean(dbButtonToggle)}
                anchorEl={dbButtonToggle}
                onClose={() => setDbButtonToggle(null)}
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
                <MenuItem
                  component={Link}
                  to="/search/actor"
                  onClick={() => setDbButtonToggle(null)}
                >
                  <ListItemIcon className="min-w-40">
                    <Icon>search</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Actor Search" />
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={`/profile/tags`}
                  onClick={() => setDbButtonToggle(null)}
                >
                  <ListItemIcon className="min-w-40">
                    <LocalOfferOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary={"My Tags"} />
                </MenuItem>
              </Popover>
            </>
          )}
          <UserMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
};

const HooksWrapper = (props: any) => {
  const { userId, displayName } = useContext(GlobalContext);
  return <Header {...props} userId={userId} displayName={displayName} />;
};

export default withRouter(HooksWrapper);
