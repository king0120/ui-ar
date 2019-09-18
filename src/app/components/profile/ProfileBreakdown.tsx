import React, {FC} from 'react';
import {Label} from 'semantic-ui-react';
import styled from 'styled-components';

const LabelsContainer = styled.div`
  max-width: 100%;
  .role-badge {
    display: flex;
    align-items: center;
    margin: 10px;
    .label {
      margin: 0 5px;
    }
  }
`;

const ProfileBreakdown: FC<any> = ({breakdown}) => {
    const ageRange = breakdown.ageRange || ['None'];
    const gender = breakdown.gender || ['None'];
    const unions = breakdown.unions || ['None'];
    const ethnicity = breakdown.ethnicity || ['None'];
    const vocalRange = breakdown.vocalRange || ['None'];
    return (
        <div>
            <h2>Actor Breakdown</h2>
            <LabelsContainer>
                <div className='role-badge'>
                    Age Range: {ageRange.map((a: string, i: number) => a && <Label key={`${i}${a}`}>{a}</Label>)}
                </div>
                <div className='role-badge'>
                    Gender: {gender.map((a: string, i: number) => a && <Label key={`${i}${a}`}>{a}</Label>)}
                </div>
            </LabelsContainer>
            <LabelsContainer>
                <div className='role-badge'>
                    Ethnicity: {ethnicity.map((a: string, i: number) => a && <Label key={`${i}${a}`}>{a}</Label>)}
                </div>
                <div className='role-badge'>
                    Unions: {unions.map((a: string, i: number) => a && <Label key={`${i}${a}`}>{a}</Label>)}
                </div>
                <div className='role-badge'>
                    Vocal Range: {vocalRange.map((a: string, i: number) => a && <Label key={`${i}${a}`}>{a}</Label>)}
                </div>
            </LabelsContainer>
        </div>
    );
};

export default ProfileBreakdown;
