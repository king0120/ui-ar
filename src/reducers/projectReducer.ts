import {IProject} from '../types/IProject';
import {Reducer} from 'redux';
import {ORG_ACTIONS} from '../actions/organizationActions';
import {PROJECT_ACTIONS} from '../actions/projectActions';

const initialState = {
    projects: [],
    project: undefined,
};

interface IProjectActions {
    type: string;
    project?: IProject;
    id?: number;
}

export interface ProjectState {
    projects?: IProject[];
    project?: IProject;
}

const projectReducer: Reducer<ProjectState> = (state = initialState, action: any) => {
    switch (action.type) {
        case PROJECT_ACTIONS.FETCH_PROJECT_SUCCESS:
            return {
                ...state,
                project: action.project,
            };
        case ORG_ACTIONS.FETCH_ORGANIZATION_SUCCESS:
            return {
                ...state,
                projects: action.projects,
            };
        case ORG_ACTIONS.FETCH_ORGANIZATION_CREATE_SUCCESS:
            return {
                ...state,
                projects: [...state.projects, action.project],
            };
        case 'DELETE_PROJECT':
            return {
                ...state,
                projects: state.projects!.filter(p => p.id !== action.id),
            };
        default:
            return state;
    }
};
export default projectReducer;
