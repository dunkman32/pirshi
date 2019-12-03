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
import Tooltip from '@material-ui/core/Tooltip';

const columns = [
  { id: 'text', label: 'რა ქნა?', minWidth: 150 },
  {
    id: 'info',
    label: 'ვინ ქნა?',
    minWidth: 100,
  },
  {
    id: 'actions',
    label: 'კაია?',
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

  const renderCells = (id, row, value) => {
    if (id === 'actions')
      return <TableCell key={id}>
        <Paper style={{ maxWidth: 'max-content', padding: '20px 15px' }}>
          <Tooltip title="კაია"  placement={'top'}>
            <IconButton aria-label="filter list" onClick={likeOrDislike.bind(this, row, true)}>
              <ThumbUp style={{ cursor: 'pointer', color: 'green' }}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="ცუდია" placement={'top'}>
            <IconButton aria-label="filter list" onClick={likeOrDislike.bind(this, row, false)}>
              <ThumbDown style={{ cursor: 'pointer', color: 'red' }}/>
            </IconButton>
          </Tooltip>
        </Paper>
      </TableCell>;
    if (id === 'text') {
      return <TableCell key={id}>
        <Paper style={{ maxWidth: 'max-content', padding: '20px 15px' }}>
          <p style={{ display: 'inline-block' }}>{`შენი პირში - `}</p>{' '}
          <p style={{ fontWeight: 'bold', color: 'rgb(142, 36, 170)', display: 'inline-block' }}>{value}</p>
        </Paper>
      </TableCell>;
    }
    if (id === 'info') {
      return <TableCell key={id}>
        <Paper style={{ maxWidth: 'max-content', padding: '10px 15px' }}>
          <div>
            <p style={{ display: 'inline-block', margin: '0' }}>{'დამდების სახელი: '}</p>{' '}
            <p style={{
              fontWeight: 'bold',
              color: 'rgb(142, 36, 170)',
              display: 'inline-block',
              margin: '0'
            }}>{value.owner}</p>
          </div>
          <hr/>
          <div>
            <p style={{ display: 'inline-block', margin: '0' }}>{'ქმედების რეიტინგი: '}</p>{' '}
            <p style={{
              fontWeight: 'bold',
              color: 'rgb(142, 36, 170)',
              display: 'inline-block',
              margin: '0'
            }}>{value.rating}</p>
          </div>
        </Paper>
      </TableCell>;
    }
    return <TableCell key={id}>
      {value}
    </TableCell>;

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
                    return renderCells(column.id, row, value);
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
