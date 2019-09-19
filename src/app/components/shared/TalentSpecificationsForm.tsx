import React, {FC} from 'react';
import {Button, Header} from 'semantic-ui-react';
import {Field as FField, Form as FinalForm} from 'react-final-form';
import FormStateToRedux from '../../../utils/FormStateToRedux';

const SmartCheckbox: FC<any> = ({category, option}) => (
    <label>
        <FField
            name={category}
            component='input'
            type='checkbox'
            value={option}
        />{' '}
        {option}
    </label>
);

export const TalentSpecificationsForm: FC<any> = ({button, breakdown = {}, onSubmit = () => {}}) => {
    const fields = [{
        title: 'Union Status',
        value: ['Non-Union', 'Union', 'Other'],
        category: 'unions',
    }, {
        title: 'Gender',
        value: ['Female', 'Male', 'Non-Binary', 'Other'],
        category: 'gender',
    }, {
        title: 'Age',
        value: ['Any', 'Child', 'Teen', 'Teens-20', '20s-30s', '30s-40s', '40s-50s', '50s-60s', '60s-70s', 'Over 70'],
        category: 'ageRange',
    }, {
        title: 'Ethnicity',
        value: ['African American', 'Asian', 'Caucasian', 'Hispanic', 'Latino', 'Native American', 'Alaskan Native', 'Hawaiian', 'Middle Eastern', 'North African', 'Multi-Cultural'],
        category: 'ethnicity',
    }, {
        title: 'Voice Type',
        value: ['Soprano', 'Mezzo Soprano Belter', 'Mezzo Soprano', 'Alto', 'Tenor', 'Baritenor', 'Baritone', 'Bass'],
        category: 'vocalRange',
    }];
    const FormRender: FC<any> = (props) => (
        <form onSubmit={props.handleSubmit}>
            <FormStateToRedux form='talentSpecs'/>
            {fields.map(field => (
                <div className='spec-container' key={field.title}>
                    <Header as={'h4'}>{field.title}</Header>
                    <div className='spec-checkboxes'>
                        {field.value.map(option => <SmartCheckbox key={option} option={option} category={field.category}/>)}
                    </div>
                </div>
            ))}
            {props.button ? <Button type='submit'>Submit</Button> : null}
        </form>
    );

    return (
        <FinalForm onSubmit={onSubmit}
                   initialValues={breakdown}
                   subscription={{submitting: true, pristine: true}}
                   render={(p) => <FormRender button={button} {...p}/>}
        />
    );
};

export default TalentSpecificationsForm;
