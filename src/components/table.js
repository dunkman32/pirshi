import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { ThumbDown, ThumbUp } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const columns = [
  { id: 'text', label: 'სიტყვა', minWidth: 150 },
  { id: 'owner', label: 'ავტორი', minWidth: 150 },
  {
    id: 'rating',
    label: 'რეიტინგი',
    minWidth: 100,
  },
  {
    id: 'actions',
    label: 'ქმედება',
    minWidth: 50,
  },
];

const useStyles = makeStyles({
  main: {
    flexGrow: 1,
  },
  root: {
    position: 'relative',
    width: '90%',
    margin: 'auto'
  },
  tableWrapper: {
    maxHeight: 'max-content',
    overflow: 'auto',
  }
});

// const useToolbarStyles = makeStyles(theme => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//     backgroundColor: '#8e24aa'
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//         color: theme.palette.secondary.main,
//         backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//       }
//       : {
//         color: theme.palette.text.primary,
//         backgroundColor: theme.palette.secondary.dark,
//       },
//   title: {
//     flex: '1 1 100%',
//     fontWeight: 24,
//     color: '#fff'
//   },
//   icon: {
//     cursor: 'pointer',
//     width: 32,
//     height: 32,
//     color: '#fff'
//   },
//   pointer: {
//     cursor: 'pointer',
//   }
// }));
// const EnhancedTableToolbar = props => {
//   const classes = useToolbarStyles();
//   const { handleClickOpen } = props;
//   return (
//     <Toolbar className={classes.root}>
//       <Typography className={classes.title} variant="h6" id="tableTitle">
//         {/*შენი პირში ...*/}
//       </Typography>
//       <Tooltip title="Filter list">
//         <IconButton aria-label="filter list" onClick={handleClickOpen}>
//           <AddCircle className={classes.icon}/>
//         </IconButton>
//       </Tooltip>
//     </Toolbar>
//   );
// };

const StickyHeadTable = (props) => {
  const classes = useStyles();
  const { rows, like } = props;
  const [page, setPage] = React.useState(0);

  const likeOrDislike = (data, isLikeAction) => {
    if (isLikeAction) {
      like({ text: data.text, rating: 1 });
    } else {
      like({ text: data.text, rating: -1 });
    }
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      {/*<EnhancedTableToolbar handleClickOpen={handleClickOpen}/>*/}
      <div className={classes.tableWrapper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.text}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return column.id === 'actions' ?
                      <TableCell key={column.id}>
                        <IconButton aria-label="filter list" onClick={likeOrDislike.bind(this, row, true)}>
                          <ThumbUp style={{ cursor: 'pointer', color: 'green' }}/>
                        </IconButton>
                        <IconButton aria-label="filter list" onClick={likeOrDislike.bind(this, row, false)}>
                          <ThumbDown style={{ cursor: 'pointer', color: 'red' }}/>
                        </IconButton>
                      </TableCell>
                      : column.id === 'text' ?
                        <TableCell key={column.id}>
                          {`შენი პირში - ${value}`}
                        </TableCell> :
                        <TableCell key={column.id}>
                          {value}
                        </TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[1, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StickyHeadTable;
