import React, {FC} from 'react';
import DetailHeader from './DetailHeader';
import {format} from "date-fns";
import {gql} from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";


const GET_FOR_DASHBOARD = gql`query getOneProject($projectId: String!) {
    getOneProject(projectId: $projectId) {
        name
        writer
        director
        summary
        notes
        rehearsalDateEnd
        rehearsalDateStart
        performanceDateEnd
        performanceDateStart
    }
}
`
export const Dashboard: FC<any> = ({projectId}) => {
    const {loading, data} = useQuery(GET_FOR_DASHBOARD, {variables: {projectId}})
    if (loading) {
        return <h1>loading</h1>
    }

    const project = data && data.getOneProject
    return (<div className="displayDashboard">
        <DetailHeader project={project}/>
        <h4>Written By: {project.writer}</h4>
        <h4>Directed By: {project.director}</h4>
        <div>
            <h4>Summary</h4>
            <p>{project.summary}</p>
            <h4>Notes</h4>
            <div>
                <p>{project.notes}</p>
            </div>
        </div>
        <hr></hr>
        <div>
            <h4>Rehearsal Dates</h4>
            {format(project.rehearsalDateStart, 'MMM Do, YYYY')} to {format(project.rehearsalDateEnd, 'MMM Do, YYYY')}
        </div>
        <hr></hr>
        <div>
            <h4>Performance Dates</h4>
            {format(project.performanceDateStart, 'MMM Do, YYYY')} to {format(project.performanceDateEnd, 'MMM Do, YYYY')}
        </div>
    </div>);
};
