import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';

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
import Routes from '../../constants/routes.json';
import { readAllRows } from '../../database/admin';

import { getInitials } from '../../helpers';
import NewItem from './New-item';

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

  useEffect(() => {
    console.log('useEffect');
    const updateItems = async () => {
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
    };
    updateItems();
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
      <NewItem />
    </div>
  );
};

ItemsPage.propTypes = {
  className: PropTypes.string,
  Items: PropTypes.array.isRequired
};

export default ItemsPage;
