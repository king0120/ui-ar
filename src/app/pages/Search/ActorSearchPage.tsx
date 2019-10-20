import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { searchUsers } from '../../../redux/actions/searchActions';
import { withRouter } from 'react-router-dom';
import { TalentSpecificationsForm } from '../../components/shared/TalentSpecificationsForm';
import { getFormState } from "../../../redux/store/reducers/finalFormReducer";
import { Container } from "../../components/project/CommonStyledComponents";
import { ExpansionPanel, Button, ExpansionPanelDetails, ExpansionPanelSummary, Typography, Paper, makeStyles, Theme, createStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import ActorSearchResults from './Partials/ActorSearchResults';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
            border: 'none'
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);

function NoReduxActorSearch(props: any) {
    const classes = useStyles()
    const [value, changeValue] = useState('');
    const [type, changeType] = useState('displayName');
    return (
        <>
            <form onSubmit={(e: any) => {
                e.preventDefault();
                props.searchUsers({ value, type, spec: props.spec })
            }}>
                <Paper>
                    <div className={classes.root}>
                        <SearchIcon />
                        <InputBase
                            className={classes.input}
                            placeholder="Search For Talent"
                            inputProps={{ 'aria-label': 'search for talent' }}
                            value={value}
                            onChange={(e) => changeValue(e.target.value)}
                        />

                        <Divider className={classes.divider} orientation="vertical" />
                        <Button type="submit" color="primary" className={classes.iconButton} aria-label="directions">
                            Search
                    </Button>
                    </div>
                    {props.showTalentSpec && (
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography variant="body1" >Advanced Search</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <TalentSpecificationsForm />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )}

                </Paper>
            </form>
            <ActorSearchResults actors={props.results} handleClickTalent={props.handleClickTalent} />
        </>
    );
}

const mapStateToProps = (state: any) => ({
    results: state.search.data || [],
    spec: getFormState(state, 'talentSpecs').values
});

export const ActorSearch = connect(mapStateToProps, { searchUsers })(NoReduxActorSearch);


const ActorSearchPage: FC<any> = (props) => {
    const handleClickTalent = (id: string) => props.history.push(`/profile/${id}`);


    return (
        <Container>
            <Typography variant={'h5'}>Actor Search</Typography>
            <ActorSearch handleClickTalent={handleClickTalent} showTalentSpec={true} />
        </Container>
    );
};

export default withRouter(ActorSearchPage);
