import React, {FC} from 'react';
import {connect} from 'react-redux';

const MembersList: FC<any> = ({organization}) => {
    return (
        <div>
            <div>
                <h3>Owner</h3>
                <p>{organization.owner.displayName}</p>
            </div>
            <div>
                <h3>Members</h3>
                {organization.members.map((member: any) => {
                    return (<p key={member.id}>{member.displayName}</p>)
                })}
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        organization: state.organization.organization
    }
}
export default connect(mapStateToProps)(MembersList);
