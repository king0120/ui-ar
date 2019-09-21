import React, { useState, useContext } from 'react';
import { Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { useQuery } from "@apollo/react-hooks";
import { GlobalContext } from 'context/globalContext';

const TsIcon: any = Icon
const GET_USER = require('graphql/queries/user/GET_USER.gql');

function UserMenu(props: any) {
    const { userId } = useContext(GlobalContext)
    const { data, loading } = useQuery(GET_USER, { variables: { id: userId } })
    const [userMenu, setUserMenu] = useState(null);
    if (loading) { return <></> }

    const user = {
        role: "member",
        data: {
            displayName: data.getUser.displayName,
            email: data.getUser.email,
            photoURL: data.getUser.profilePicture.url,
            shortcuts: [],
        }
    }


    const userMenuClick = (event: any) => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = () => {
        setUserMenu(null);
    };

    const logOut = () => {
        localStorage.removeItem('accessToken');
        props.history.push('/login');
        window.location.reload();
    };

    return (
        <>
            <Button className="h-64" onClick={userMenuClick}>
                {user.data.photoURL ?
                    (
                        <Avatar className="" alt="user photo" src={user.data.photoURL} />
                    )
                    :
                    (
                        <Avatar className="">
                            {user.data.displayName[0]}
                        </Avatar>
                    )
                }

                <div className="hidden md:flex flex-col ml-12 items-start">
                    <Typography component="span" className="normal-case font-600 flex">
                        {user.data.displayName}
                    </Typography>
                    <Typography className="text-11 capitalize" color="textSecondary">
                        {user.role.toString()}
                    </Typography>
                </div>

                <TsIcon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</TsIcon>
            </Button>

            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
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
                <MenuItem component={Link} to="/organization" onClick={userMenuClose}>
                    <ListItemIcon className="min-w-40">
                        <Icon>group</Icon>
                    </ListItemIcon>
                    <ListItemText className="pl-0" primary="Casting Dashboard" />
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        console.log("LOGOUT")
                        userMenuClose();
                        logOut()
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
