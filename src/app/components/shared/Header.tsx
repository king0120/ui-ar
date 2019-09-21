import React, {Component, SyntheticEvent, useContext} from 'react';
import {Dropdown, Image, Menu, MenuItemProps} from 'semantic-ui-react';
import ARLogo from '../../../static/arLogo.png';
import styled from 'styled-components';
import {Link, withRouter} from 'react-router-dom';
import {GlobalContext} from "../../../context/globalContext";
import NavbarLayout1 from 'app/fuse-layouts/layout1/components/NavbarLayout1';

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

class Header extends Component<any, { activeItem?: string }> {
    state = {
        activeItem: '',
    };

    handleItemClick: IClickHandler = (_e, itemValue) => this.setState({activeItem: itemValue.name});

    render() {
        if (this.props.location.pathname === "/") {
            return null
        }
        const {activeItem} = this.state;

        const logOut = () => {
            localStorage.removeItem('accessToken');
            this.props.history.push('/');
            window.location.reload();
        };
        return (
            <NavbarLayout1 />            
        );
    }
}

const HooksWrapper = (props: any) => {
    const {userId, displayName} = useContext(GlobalContext);
    return <Header {...props} userId={userId} displayName={displayName}/>
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