import React, { FC } from 'react';

const AddTalentToActiveAudition: FC<any> = ({ auditionId, projectId }) => {
    // const [open, changeOpen] = useState(false);
    // const [inviteToAudition] = useMutation(INVITE_TO_AUDITION)
    // const handleClickTalent = async (userId: string) => {
    //     await inviteToAudition({
    //         variables: {
    //             projectId,
    //             auditionId,
    //             userId
    //         },
    //         refetchQueries: [{
    //             query: GET_AUDITION,
    //             variables: { auditionId }
    //         }]
    //     });
    //     changeOpen(false);P
    // };
    return <h1>Currently Hidden</h1>
    // return (
    //     <Modal
    //         open={open}
    //         closeOnDimmerClick
    //         closeIcon
    //         onClose={() => {
    //             changeOpen(false);
    //         }}
    //         trigger={<Button
    //             variant="contained"
    //             color="primary"
    //             onClick={() => changeOpen(true)}
    //         >
    //             Add Talent
    //         </Button>}>
    //         <Modal.Header>Invite Actor To Audition</Modal.Header>
    //         <Modal.Content>
    //             <ActorSearch showTalentSpec={false} handleClickTalent={handleClickTalent} />
    //         </Modal.Content>
    //     </Modal>
    //
    // );
};


export default AddTalentToActiveAudition;
