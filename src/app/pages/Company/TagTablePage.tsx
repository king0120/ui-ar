import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_TAGS_FOR_OWNER } from '../Profile/MyTags';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table'
import { Container, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Typography, TablePagination } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const TagTable = ({ actors }: any) => {
  const { push } = useHistory();
  const [filter, setFilter] = React.useState('' as string | undefined);
  const data = React.useMemo(() => actors, []);
  const columns = React.useMemo(() => [
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "E-mail", accessor: "email" }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    pageCount,
    setPageSize,
    canPreviousPage,
    canNextPage,
    setGlobalFilter,
    filterValue
  }: any = useTable<{ pageIndex: number, pageSize: number }>(
    {
      columns, data,
      initialState: { pageSize: 10 } as any,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  )
  return (
    <TableContainer component={Paper}>
      <div>
        <input
          value={filter || ''}
          onChange={async e => {
            if (e.target.value === '') {
              await setFilter(undefined)
              return setGlobalFilter(filter)
            }
            await setFilter(e.target.value)
            setGlobalFilter(filter) // Set undefined to remove the filter entirely
          }}
          placeholder={`Search ${actors.length} records...`}
        />
      </div>

      <Table {...getTableProps()} stickyHeader>
        <TableHead>
          {headerGroups.map((headerGroup: any) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} hover>
              {headerGroup.headers.map((column: any) => (
                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()} hover role="checkbox" tabIndex={-1}>
                {row.cells.map((cell: any) => {
                  return <TableCell {...cell.getCellProps()} onClick={() => push(`/profile/:userId`)}>{cell.render('Cell')}</TableCell>
                })}
              </TableRow>
            )
          })}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 40, 50]}
          component="div"
          count={actors.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          onChangePage={(e, page) => gotoPage(page)}
          onChangeRowsPerPage={(e) => setPageSize(Number(e.target.value))}
        />
      </Table>
    </TableContainer>
  );
}
const TagTablePage = (props: any) => {
  const { loading, data } = useQuery(GET_TAGS_FOR_OWNER);
  const currentTag = props.match.params.tagName;
  if (loading) {
    return <h1>Loading</h1>
  }
  const actors = data.getTagsForOwner.filter((tag: any) => tag.tag === currentTag).map((tag: any) => tag.for)
  console.log(actors)
  return (
    <Container>
      <Typography variant="h4">{currentTag}</Typography>
      <TagTable actors={actors} />
    </Container>
  )
};

export default TagTablePage;