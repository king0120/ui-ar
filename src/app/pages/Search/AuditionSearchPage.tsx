import React, { useState, SyntheticEvent, useEffect } from 'react';
import { Form, Input, List } from "semantic-ui-react";
import { useLazyQuery } from "@apollo/react-hooks";
import { Container } from '../../components/project/CommonStyledComponents';
import { Button, Paper, makeStyles, Theme, createStyles, InputBase, Divider, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { AnimateGroup } from './Partials/ActorSearchResults';
const SEARCH_AUDITIONS = require('graphql/queries/SEARCH_AUDITIONS.gql');

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
const AuditionSearchPage = () => {
    const classes = useStyles()
    const [value, changeValue] = useState('')
    const [searchAuditions, { loading, data }] = useLazyQuery(SEARCH_AUDITIONS);
    const results = data && data.searchForAuditions;

    useEffect(() => {
        searchAuditions({ variables: { query: '' } })
    }, [])
    return (
        <Container>
            <Typography variant={'h5'}>Audition Search</Typography>
            <form onSubmit={(e: SyntheticEvent) => {
                e.preventDefault()
                searchAuditions({ variables: { query: value } })
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
                </Paper>
            </form>

            <Paper>
                <div className="flex items-center justify-between px-16 h-64">
                    <Typography className="text-16">Found Auditions</Typography>
                    <Typography className="text-11 font-500 rounded-4 text-white bg-blue px-8 py-4">{results ? results.length : 0}</Typography>
                </div>
                {
                    !loading && results && (
                        <div className="w-full min-w-full table-responsive">
                            <AnimateGroup
                                className="w-full"
                                enter={{
                                    animation: "transition.slideUpBigIn"
                                }}
                                leave={{
                                    animation: "transition.slideUpBigOut"
                                }}
                            >
                                {results.map((result: any) => (
                                    <>
                                        <div className='w-full flex content-between' key={result.id} onClick={() => console.log('click')}>
                                            <div className="pl-64 flex flex-col justify-center align-center truncate font-600">
                                                <Typography variant="body2">{result.name}</Typography>
                                                <Typography variant="subtitle2">{result.address}</Typography>
                                            </div>
                                        </div>
                                        <Divider />
                                    </>
                                ))}
                            </AnimateGroup>
                        </div>
                    )
                }
            </Paper>
        </Container>
    );
};

export default AuditionSearchPage;
