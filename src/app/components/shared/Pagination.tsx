import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ReactPaginate from "react-paginate";
import React from "react";
import { makeStyles, Theme } from "@material-ui/core";

interface IPaginationProps {
  itemCount: number;
  handlePageChange: (a: any) => any;
  resultsPerPage?: number;
  colorTheme?: "light" | "dark";
}

const NUMBER_OF_ACTORS_ON_PAGE = 10;

const useStyles = makeStyles((theme: Theme) => ({
  paginationRoot: {
    display: "flex",
    height: "30px",
    justifyContent: "center",
    marginTop: "15px"
  },
  pageClass: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "25px",
    width: "25px",
    margin: "0 5px",
    padding: "3px"
  },
  pageLinkClassName: {
    color: (props: any) =>
      props.colorTheme === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black
  },
  activeLinkClassName: {
    color: theme.palette.common.white
  },
  pageClassActive: {
    borderRadius: "100%",
    background: "#007ad9"
  }
}));

const Pagination = (props: IPaginationProps) => {
  const classes = useStyles(props);
  const perPage = props.resultsPerPage || NUMBER_OF_ACTORS_ON_PAGE;
  const numberOfPages = Math.floor(props.itemCount / perPage);
  return (
    <ReactPaginate
      previousLabel={<ChevronLeftIcon />}
      nextLabel={<ChevronRightIcon />}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={numberOfPages + 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={props.handlePageChange}
      containerClassName={classes.paginationRoot}
      pageClassName={classes.pageClass}
      pageLinkClassName={classes.pageLinkClassName}
      activeLinkClassName={classes.activeLinkClassName}
      activeClassName={classes.pageClassActive}
    />
  );
};

export default Pagination;
