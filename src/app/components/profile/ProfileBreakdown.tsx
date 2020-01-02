import React, { FC } from 'react';
import { Typography, Chip } from '@material-ui/core';
import { Animate } from 'app/pages/Auth/SharedAuth';

const Breakdown: React.FC<any> = ({title, breakdownArray, width}) => {
    const classWidth = width || 'w-sm'
    return (
        <>
        <p>{title}: </p>
        <div className={`mb-16 ${classWidth} flex flex-wrap`}>
            {breakdownArray.map((a: string, i: number) => a && (
                <Animate animation="transition.fadeIn" delay={i * 100} key={`${i}${a}`}>
                    <Chip
                        size="small"
                        className='m-1'
                        data-cy={`${title}${a}`}

                        label={a}
                    />
                </Animate>
            ))}
        </div>
        </>
    )
}

const ProfileBreakdown: FC<any> = ({ breakdown }) => {
    const ageRange = breakdown.ageRange || ['None'];
    const gender = breakdown.gender || ['None'];
    const unions = breakdown.unions || ['None'];
    const ethnicity = breakdown.ethnicity || ['None'];
    const vocalRange = breakdown.vocalRange || ['None'];
    return (
        <div className='mt-64'>
            <Typography variant="h6" color="inherit">Actor Breakdown</Typography>
            <div className="flex">
                <div className="w-8/12">
                    <Breakdown title="Age Range" breakdownArray={ageRange} />
                    <Breakdown title="Gender" breakdownArray={gender} />
                    <Breakdown title="Ethnicity" breakdownArray={ethnicity} />
                </div>
                <div className="w-4/12">
                    <Breakdown width='w-3' title="Unions" breakdownArray={unions} />
                    <Breakdown width='w-3' title="Vocal Range" breakdownArray={vocalRange} />
                </div>
            </div>
        </div>
    );
};

export default ProfileBreakdown;
