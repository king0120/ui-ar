import React, { Component, SyntheticEvent, useContext } from 'react';
import { Dropdown, Image, Menu, MenuItemProps } from 'semantic-ui-react';
import ARLogo from '../../../static/arLogo.png';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { GlobalContext } from "../../../context/globalContext";
import ToolbarLayout1 from 'app/fuse-layouts/layout1/components/ToolbarLayout1';
import makeStyles from '@material-ui/styles/makeStyles';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden } from '@material-ui/core';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import ChatPanelToggleButton from 'app/fuse-layouts/shared-components/chatPanel/ChatPanelToggleButton';
import { FuseSearch } from '@fuse';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';

type IClickHandler = (event: SyntheticEvent, data: MenuItemProps) => void;

const StyledHeader = styled(Menu)`
	&&& {
	    position: fixed;
	    width: 100%;
	    z-index: 9999;
	    top: 0;
		border-radius: 0;
		margin: 0;
	}
`;

const useStyles = makeStyles((theme: any) => ({
    separator: {
        width: 1,
        height: 64,
        backgroundColor: theme.palette.divider
    }
}));

const Header = (props: any) => {
    const config = useSelector<any, any>(({ fuse }) => fuse.settings.current.layout.config);
    const toolbarTheme = useSelector<any, any>(({ fuse }) => fuse.settings.toolbarTheme);

    const classes = useStyles(props);
    if (props.location.pathname === "/" || props.location.pathname === "/login" || props.location.pathname === "/register" || props.location.pathname === "/passwordReset") {
        return null
    }
    const logOut = () => {
        localStorage.removeItem('accessToken');
        props.history.push('/');
        window.location.reload();
    };
    return (
        <ThemeProvider theme={toolbarTheme}>
            <AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
                <Toolbar className="p-0">

                    {config.navbar.display && config.navbar.position === 'left' && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton className="w-64 h-64 p-0" />
                            <div className={classes.separator} />
                        </Hidden>
                    )}

                    <div className="flex flex-1">

                    </div>

                    <div className="flex">
                        <FuseSearch />
                        <div className={classes.separator} />
                        <UserMenu />
                    </div>

                    {config.navbar.display && config.navbar.position === 'right' && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton />
                        </Hidden>
                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

const HooksWrapper = (props: any) => {
    const { userId, displayName } = useContext(GlobalContext);
    return <Header {...props} userId={userId} displayName={displayName} />
}

export default withRouter(HooksWrapper);

// <StyledHeader inverted>
//                 <Menu.Item>
//                     <Link to='/'>
//                         <Image src={ARLogo}/>
//                     </Link>
//                 </Menu.Item>

//                 <Menu.Menu position='right'>
//                     {this.props.userId !== 'none'
//                         ? (
//                             <>
//                                 <Menu.Item onClick={() => this.props.history.push('/search/actor')}>Actor
//                                     Search</Menu.Item>
//                                 <Menu.Item onClick={() => this.props.history.push('/search/audition')}>Audition
//                                     Search</Menu.Item>
//                                 <Menu.Item onClick={() => this.props.history.push('/profile/auditions')}>My
//                                     Auditions</Menu.Item>
//                                 <Dropdown as={Menu.Item} text={this.props.displayName}>
//                                     <Dropdown.Menu>
//                                         <Dropdown.Item onClick={() => this.props.history.push('/profile')}>View
//                                             Profile</Dropdown.Item>
//                                         <Dropdown.Item onClick={() => this.props.history.push('/profile')}>My
//                                             Notifications</Dropdown.Item>
//                                         <Dropdown.Item onClick={() => this.props.history.push('/organization')}>Casting
//                                             Dashboard</Dropdown.Item>
//                                         <Dropdown.Item
//                                             onClick={() => this.props.history.push('/settings')}>Settings</Dropdown.Item>
//                                         <Dropdown.Item onClick={logOut}>Sign Out</Dropdown.Item>
//                                     </Dropdown.Menu>
//                                 </Dropdown>
//                             </>
//                         )
//                         : (
//                             <>
//                                 <Menu.Item name='sign-in' active={activeItem === 'sign-in'}
//                                            onClick={() => this.props.history.push('/register')}>
//                                     Register
//                                 </Menu.Item>
//                                 <Menu.Item name='sign-in' active={activeItem === 'sign-in'}
//                                            onClick={() => this.props.history.push('/login')}>
//                                     Sign-in
//                                 </Menu.Item>
//                             </>
//                         )
//                     }
//                 </Menu.Menu>
//             </StyledHeader>