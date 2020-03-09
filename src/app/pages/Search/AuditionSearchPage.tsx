import React, { SyntheticEvent, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { Container } from "../../components/project/CommonStyledComponents";
import {
  Button,
  createStyles,
  Divider,
  InputBase,
  makeStyles,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { AnimateGroup } from "./Partials/ActorSearchResults";
import Pagination from "../../components/shared/Pagination";

const SEARCH_AUDITIONS = require("graphql/queries/SEARCH_AUDITIONS.gql");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "100%"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      border: "none"
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
);

const AuditionSearchResult = (props: { results: any; history: any }) => {
  const [selected, setSelectedPage] = useState(0);
  const changePage = (data: any) => setSelectedPage(data.selected);
  const sliceToShow =
    props.results && props.results.slice(selected * 10, selected * 10 + 10);
  return (
    <>
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
          {sliceToShow.map((result: any) => (
            <>
              <div
                className="w-full flex content-between"
                key={result.id}
                onClick={() => props.history.push(`/audition/${result.id}`)}
              >
                <div className="pl-64 flex flex-col justify-center align-center truncate font-600">
                  <Typography variant="h6">
                    {result.project.name} at {result.project.organization.name}
                  </Typography>
                  <Typography variant="body2">
                    Audition Name: {result.name}
                  </Typography>
                  <Typography variant="subtitle2">{result.address}</Typography>
                </div>
              </div>
              <Divider />
            </>
          ))}
        </AnimateGroup>
      </div>
      <Pagination
        itemCount={props.results.length}
        handlePageChange={changePage}
      />
    </>
  );
};
const AuditionSearchPage = (props: any) => {
  const classes = useStyles();
  const [value, changeValue] = useState("");
  const [searchAuditions, { loading, data }] = useLazyQuery(SEARCH_AUDITIONS);
  const results = data && data.searchForAuditions;

  useEffect(() => {
    searchAuditions({ variables: { query: "" } });
  }, [searchAuditions]);
  return (
    <Container>
      <Typography variant={"h5"}>Audition Search</Typography>
      <form
        onSubmit={(e: SyntheticEvent) => {
          e.preventDefault();
          searchAuditions({ variables: { query: value } });
        }}
      >
        <Paper>
          <div className={classes.root}>
            <SearchIcon />
            <InputBase
              className={classes.input}
              placeholder="Search For Talent"
              inputProps={{ "aria-label": "search for talent" }}
              value={value}
              onChange={e => changeValue(e.target.value)}
            />

            <Divider className={classes.divider} orientation="vertical" />
            <Button
              type="submit"
              color="primary"
              className={classes.iconButton}
              aria-label="directions"
            >
              Search
            </Button>
          </div>
        </Paper>
      </form>

      <Paper>
        <div className="flex items-center justify-between px-16 h-64">
          <Typography className="text-16">Found Auditions</Typography>
          <Typography className="text-11 font-500 rounded-4 text-white bg-blue px-8 py-4">
            {results ? results.length : 0}
          </Typography>
        </div>
        {!loading && results && (
          <AuditionSearchResult results={results} history={props.history} />
        )}
      </Paper>
    </Container>
  );
};

export default AuditionSearchPage;
