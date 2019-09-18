import React, {FC, useState} from 'react';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import {debounce} from 'lodash';
import arAxios from '../../utils/axiosHelper';
import {Button} from "semantic-ui-react";
import {withRouter} from 'react-router';
import {useMutation} from "@apollo/react-hooks";

const INVITE_TO_AUDITION = require('../../graphql/mutations/INVITE_TO_AUDITION.gql')

const SearchTalent: FC<any> = ({match}) => {
    const {auditionId, projectId} = match.params;
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inviteToAudition] = useMutation(INVITE_TO_AUDITION)

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
                    <Button onClick={() => inviteToAudition({
                        variables: {
                            projectId,
                            auditionId,
                            userId: selected
                        }})}>Invite To
                        Audition</Button>
                </div>
            )}
        </div>
    );
};

export default withRouter(SearchTalent);
