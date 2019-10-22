import React, {FC, SyntheticEvent, useState} from 'react';
import {Checkbox, Form, Modal} from 'semantic-ui-react';
import TalentSpecificationsForm from './TalentSpecificationsForm';
import {connect} from 'react-redux';
import {getFormState} from '../../../redux/store/reducers/finalFormReducer';
import {Button} from '@material-ui/core'

const AddRoleBreakdownModal: FC<{ specs: any, handleSubmit: (val: any) => void }> = (props) => {
    const [open, setOpen] = useState(false);
    const [characterName, setCharacterName] = useState('');
    const [characterSummary, setCharacterSummary] = useState('');
    const [movementRequirements, setMovementRequirements] = useState('');
    const [hideInPublicSearch, setHideInPublicSearch] = useState(false);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        props.handleSubmit({
            characterName,
            characterSummary,
            movementRequirements,
            hideInPublicSearch: hideInPublicSearch ? 'YES' : 'NO',
            searchCriteria: props.specs,
        });
        setOpen(false);
    };

    return (
        <Modal
            closeOnDimmerClick
            closeIcon
            open={open}
            trigger={
                <Button onClick={() => setOpen(true)} variant="contained" color="secondary">Add New Role</Button>
            }
            onClose={() => {
                setOpen(false);
            }}>
            <Modal.Header>Create New Role</Modal.Header>
            <Modal.Content image>
                <Form>
                    <Form.Field onSubmit={handleSubmit}>
                        <label>Character Name</label>
                        <input value={characterName} onChange={e => setCharacterName(e.target.value)} placeholder='Character Name'/>
                    </Form.Field>
                    <Form.Field>
                        <label>Character Summary</label>
                        <input value={characterSummary} onChange={e => setCharacterSummary(e.target.value)} placeholder='Character Summary'/>
                    </Form.Field>
                    <Form.Field>
                        <label>Movement Requirements</label>
                        <input value={movementRequirements} onChange={e => setMovementRequirements(e.target.value)}
                               placeholder='Movement Requirements'/>
                    </Form.Field>
                    <Form.Field>
                        <label>Hide From Public Search</label>
                        <Checkbox checked={hideInPublicSearch} onChange={(e, {checked}) => setHideInPublicSearch(checked || false)}/>
                    </Form.Field>
                    <h3>Role Breakdown</h3>
                    <TalentSpecificationsForm/>
                    <Button variant="contained" color="primary" type='submit' onClick={handleSubmit}>Submit</Button>
                    <Button variant="contained" color="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
};

const mapStateToProps = (state: any) => {
    return {
        specs: getFormState(state, 'talentSpecs').values
    };
};
export default connect(mapStateToProps)(AddRoleBreakdownModal);
