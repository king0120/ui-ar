import React, {FC, useState} from 'react';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import {debounce} from 'lodash';
import arAxios from '../../axiosHelper';
import {Button} from "semantic-ui-react";
import {connect} from 'react-redux';
import {inviteToAudition} from '../../actions/audition/auditionThunkActions';

const SearchTalent: FC<any> = ({ inviteToAudition, auditionId, projectId }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selected, changeSelected] = useState('');

    const handleChange = debounce(async (e, val) => {
        setLoading(true);
        const res = await arAxios.get(`/api/v1/users/search/${val.searchQuery}`);
        setLoading(false);
        const newOptions = res.data.map((val: any, index: number) => {
            return {
                key: index,
                value: val.email,
                text: val.displayName
            };
        });
        setOptions(newOptions);
    }, 500);

    return (
        <div>
            <Dropdown
                placeholder='Search Actor By Name'
                loading={loading}
                clearable
                fluid
                search
                selection
                onSearchChange={handleChange}
                options={options}
                onChange={(e, {value}) => {
                    changeSelected(value!.toString());
                }}
            />
            {selected && (
                <div>
                    <p>{selected}</p>
                    <Button onClick={() => inviteToAudition(projectId, auditionId, selected)}>Invite To Audition</Button>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    console.log(state)
    return {
        projectId: state.projects.project.id,
        auditionId: state.auditions.audition.id
    }
};
export default connect(mapStateToProps, {inviteToAudition})(SearchTalent);
