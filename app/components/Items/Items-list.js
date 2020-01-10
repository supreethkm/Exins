import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Routes from '../../constants/routes.json';
import { readAllRows } from '../../database/admin';

import { getInitials } from '../../helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: '100%'
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));
const ItemsData = [
  {
    id: 1,
    item: 'Rice',
    issuedQuantity: 22.34,
    availableQuantity: 150
  },
  {
    id: 2,
    item: 'Ragi',
    issuedQuantity: 2.4,
    availableQuantity: 102
  },
  {
    id: 3,
    item: 'Jower',
    issuedQuantity: 202.4,
    availableQuantity: 15
  },
  {
    id: 4,
    item: 'Wheat',
    issuedQuantity: 2.34,
    availableQuantity: 18
  }
];

const newData = [
  {
    id: 3,
    item: 'Jower',
    issuedQuantity: 202.4,
    availableQuantity: 15
  },
  {
    id: 4,
    item: 'Wheat',
    issuedQuantity: 2.34,
    availableQuantity: 18
  }
];
const ItemsPage = props => {
  // const { className, items, ...rest } = props;
  const { className, ...rest } = props;
  const classes = useStyles();
  const [Items, setItems] = useState(ItemsData);
  const [selectedItems, setSelectedItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleSelectAll = event => {
    // const { items } = props;
    const items = Items;
    let selectedItems;

    if (event.target.checked) {
      selectedItems = Items.map(item => item.id);
    } else {
      selectedItems = [];
    }

    setSelectedItems(selectedItems);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems = [];

    if (selectedIndex === -1) {
      newSelectedItems = newSelectedItems.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItems = newSelectedItems.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelectedItems(newSelectedItems);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const handleaddNewMenu = event => {
    console.log('handleaddNewMenu', event);
    props.history.push(Routes.NEW_MENU);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(async () => {
    console.log('useEffect');
    const readData = await readAllRows();
    // .then((err, data) =>{
    //   console.log('err : ', err, ' data: ', data);
    //   return data;
    // })
    // .catch((err, data) => {
    //   console.log('Catch err : ', err, ' data: ', data);
    // });
    console.log('typeof readData: ', typeof readData);
    console.log('readData: ', readData);
    setItems(readData);
    console.log('After setItems', Items);
  }, []);

  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.length === Items.length}
                        color="primary"
                        indeterminate={
                          selectedItems.length > 0 &&
                          selectedItems.length < Items.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>No.</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Items.slice(0, rowsPerPage).map((item, idx) => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={item.id}
                      selected={selectedItems.indexOf(item.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.indexOf(item.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, item.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>
                        <div className={classes.nameContainer}>
                          {/*  <Avatar className={classes.avatar} src={item.avatarUrl}>
                          {getInitials(item.name)}
                        </Avatar> */}
                          <Typography variant="body1">{item.item}</Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={Items.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Add New Item</DialogTitle>
        <DialogContent>
          <DialogContentText>Add New Item to the Inventory</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="itemName"
            label="Item Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ItemsPage.propTypes = {
  className: PropTypes.string,
  Items: PropTypes.array.isRequired
};

export default ItemsPage;
