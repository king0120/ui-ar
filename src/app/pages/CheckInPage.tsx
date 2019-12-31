import React from 'react';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Button, Paper, Typography} from "@material-ui/core";
import {gql} from "apollo-boost";
import {format} from 'date-fns';

const GET_AUDITION = require('../../graphql/queries/auditions/GET_AUDITION.gql');
const CHECK_IN = gql`
    mutation checkIn($status: String!, $instanceId: String!) {
        checkIn(status: $status, instanceId: $instanceId)
    }
`;

const CheckInPage = (props: any) => {
    const {auditionId} = props.match.params;
    const {data, loading} = useQuery(GET_AUDITION, {variables: {auditionId}});
    const [checkIn] = useMutation(CHECK_IN, {refetchQueries: [{query: GET_AUDITION, variables: {auditionId}}]});
    if (loading) {
        return <h1>Loading</h1>;
    }
    console.log(data);
    const audition = data.getAudition;
    return (
        <div>
            <Typography variant={"h3"}>{audition.name} Check In</Typography>
            <div className={'upcoming-timeslots'}>
                <Typography variant={"h5"}>Timeslots in this audition</Typography>
                <div>
                    {!audition.timeSlots.length && (
                        <div>
                            <Typography variant={"h5"}>No Timeslots Created.</Typography>
                        </div>
                    )}
                    {audition.timeSlots.map((timeslot: any) => {
                        return (
                            <Paper key={timeslot.id} className={"m-8 p-8"}>
                                <div className={'flex'}>
                                    <p className={"mr-8"}>Start
                                        Time: {format(new Date(timeslot.startTime), "hh:mm aa")}</p>
                                    <p>End Time: {format(new Date(timeslot.endTime), "hh:mm aa")}</p>
                                </div>

                                <p>Capacity: {timeslot.capacity} ({timeslot.capacity - timeslot.talent.length} Slots
                                    Available )</p>
                                <div className={'mt-16'}>
                                    <h3 className={"pb-16"}>Actors In this timeslot</h3>
                                    {timeslot.talent.map((talent: any) => {
                                        return (
                                            <div key={talent.id} className={"flex justify-between mb-16"}>
                                                <div>
                                                    <p><strong>Name:</strong> {talent.user.displayName}</p>
                                                    <p><strong>Status:</strong> {talent.status}</p>
                                                </div>
                                                <Button
                                                    variant={"outlined"}
                                                    color={"primary"}
                                                    onClick={() => {
                                                        checkIn({
                                                            variables: {
                                                                status: 'checkedIn', instanceId: talent.id
                                                            }
                                                        });
                                                    }}>
                                                    Check In
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Paper>
                        );
                    })}
                </div>
            </div>
            <div className={'All Talent'}>
                <Typography variant={"h5"}>All Talent in This Audition</Typography>
                <div>
                    {!audition.talent.length && (
                        <div>
                            <Typography variant={"h5"}>No Talent Registered.</Typography>
                        </div>
                    )}
                    {audition.talent.map((talent: any) => {
                        return (
                            <Paper key={talent.id} className={"m-8 p-8"}>
                                <div key={talent.id} className={"flex justify-between mb-16"}>
                                    <div>
                                        <p><strong>Name:</strong> {talent.user.displayName}</p>
                                        <p><strong>Status:</strong> {talent.status}</p>
                                    </div>
                                    <Button
                                        variant={"outlined"}
                                        color={"primary"}
                                        onClick={() => {
                                            checkIn({
                                                variables: {
                                                    status: 'checkedIn', instanceId: talent.id
                                                }
                                            });
                                        }}>
                                        Check In
                                    </Button>
                                </div>
                            </Paper>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CheckInPage;
