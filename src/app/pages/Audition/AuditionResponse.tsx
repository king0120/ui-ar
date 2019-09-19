import React, {FC} from 'react';
import {Button, Form} from "semantic-ui-react";
import {Field, Form as FinalForm} from "react-final-form";
import {connect} from "react-redux";
import queryString from 'query-string'
import {respondToAudition} from "../../../redux/actions/auditionActions";

const statuses = [{
    id: 'confirmed',
    friendly: 'Confirm Audition',
}, {
    id: 'denied',
    friendly: 'Reject Audition',
}];


const AuditionResponse: FC<any> = ({location, history, respondToAudition}) => {
    return (
        <div>
            Respond to Audition
            <FinalForm
                onSubmit={(vals: any) => {
                    const values = queryString.parse(location.search)
                    respondToAudition(values.project, values.audition, values.email, values.responseCode, vals.confirmation)
                    history.push('/')
                }}
                render={({handleSubmit}) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Form.Field>
                                <label>Respond To Audition</label>
                                {statuses.map((exp) => (
                                    <label key={exp.id}>
                                        <Field
                                            name='confirmation'
                                            component='input'
                                            type='radio'
                                            value={exp.id}
                                        />{' '} {exp.friendly}
                                    </label>
                                ))}
                            </Form.Field>
                            <Button type={'submit'}>Respond</Button>
                        </Form>
                    );
                }
                }
            />
        </div>
    );
};

export default connect(null, {respondToAudition})(AuditionResponse);
