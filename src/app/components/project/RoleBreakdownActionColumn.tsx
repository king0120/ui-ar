import React, {FC, useState} from 'react';
import {Button, Card, Modal, Popup} from 'semantic-ui-react';
import {ActionsContainer} from '../organization/ProjectActionColumn';
import {ActorSearch} from "../../pages/Search/ActorSearchPage";
import {castRole} from "../../../redux/actions/roleActions";
import {connect} from "react-redux";


const CastRoleModal = (props: any) => {
    const [open, changeOpen] = useState(false);
    const trigger = (
        <Popup
            inverted
            trigger={
                <Button primary onClick={() => changeOpen(true)} circular color="green" icon='user'/>
            }
            content="Cast This Role"
        />
    );

    return (
        <Modal
            open={open}
            onClose={() => {
                changeOpen(false);
            }}
            trigger={trigger}>
            <Card fluid style={{margin: 0, minHeight: "200px"}}>
                <Card.Content>
                    <Card.Header>Search For A Member</Card.Header>
                    <ActorSearch handleClickTalent={(id: any) => {
                        props.castRole(props.projectId, props.roleId, id);
                        changeOpen(false);
                    }}/>
                </Card.Content>
            </Card>
        </Modal>
    );
};

const RoleBreakdownActionColumn: FC<any> = ({data, projectId, deleteRole, castRole}) => {
    return (
        <ActionsContainer>
            <Popup
                inverted
                trigger={
                    <CastRoleModal castRole={castRole} roleId={data.id} projectId={projectId}/>
                }
                content="Cast This Role"
            />

            <Popup
                inverted
                trigger={
                    <Button
                        onClick={() => deleteRole()}
                        circular color="red" icon='delete'
                    />
                }
                content="Delete This Role"
            />
        </ActionsContainer>
    );
};

export default connect( null, {castRole})(RoleBreakdownActionColumn);
