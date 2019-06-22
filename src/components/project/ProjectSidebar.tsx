import React, {FC, useState} from 'react';
import {Icon, Menu} from 'semantic-ui-react';
import styled from 'styled-components';
import {Link, withRouter} from 'react-router-dom';

const StyledMenu = styled(Menu)`
  &&& {
    border-radius: 0;
    height: 100vh;
    padding-top: 15px;
    font-size: 1.25rem;
    min-width: 225px;
    position: sticky;
    top: 0;
  }
`;

const SidebarLink: FC<any> = ({name, activeItem, organizationId, projectId, children, setActiveItem}) => {
    return (
        <Link to={`/organization/${organizationId}/projects/${projectId}/${name}`}>
            <Menu.Item as={'div'} name={name} active={activeItem === name} onClick={() => setActiveItem(name)}>
                {children}
            </Menu.Item>
        </Link>
    );
};

const ProjectSidebar: FC<any> = ({match, location}) => {
    const {projectId, organizationId} = match.params;
    const tab = location.pathname.replace(`${match.url}/`, '');
    const [activeItem, setActiveItem] = useState(tab);
    return (
        <StyledMenu inverted vertical>
            <SidebarLink name='dashboard' activeItem={activeItem} organizationId={organizationId} projectId={projectId} setActiveItem={setActiveItem}>
                <Icon name='dashboard'/>
                Dashboard
            </SidebarLink>

            <SidebarLink name='roles' activeItem={activeItem} organizationId={organizationId} projectId={projectId} setActiveItem={setActiveItem}>
                <Icon name='clipboard'/>
                Role Breakdowns
            </SidebarLink>

            <SidebarLink name='auditions' activeItem={activeItem} organizationId={organizationId} projectId={projectId} setActiveItem={setActiveItem}>
                <Icon name='calendar alternate'/>
                Auditions
            </SidebarLink>

            <SidebarLink name='teams' activeItem={activeItem} organizationId={organizationId} projectId={projectId} setActiveItem={setActiveItem}>
                <Icon name='users'/>
                Project Teams
            </SidebarLink>

            <SidebarLink name='messaging' activeItem={activeItem} organizationId={organizationId} projectId={projectId} setActiveItem={setActiveItem}>
                <Icon name='comments'/>
                Messaging
            </SidebarLink>

        </StyledMenu>
    );
};

export default withRouter(ProjectSidebar);
