import React, { useState } from 'react';
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

import { getInitials } from '../../../helpers/getInitials';
import CreateExcelReport from '../../../helpers/Excel-Report';

CreateExcelReport();

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
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
const DailyReport = props => {
  // const { className, items, ...rest } = props;
  const { className, ...rest } = props;
  const classes = useStyles();
  const items = ItemsData;
  const [selectedItems, setSelectedItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    // const { items } = props;
    const items = ItemsData;
    let selectedItems;

    if (event.target.checked) {
      selectedItems = items.map(item => item.id);
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

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.length === items.length}
                      color="primary"
                      indeterminate={
                        selectedItems.length > 0 &&
                        selectedItems.length < items.length
                      }
                      onChange={handleSelectAll}
                    />
                    </TableCell> */}
                  <TableCell rowSpan={2} align="center" variant="head">
                    No.
                  </TableCell>
                  <TableCell rowSpan={2} align="center" variant="head">
                    Item
                  </TableCell>
                  <TableCell colSpan={2} align="center" variant="head">
                    Stock
                  </TableCell>
                  <TableCell colSpan={4} align="center" variant="head">
                    Issued
                  </TableCell>
                  <TableCell rowSpan={2} align="center" variant="head">
                    Remain
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" variant="head">
                    Initial Stock
                  </TableCell>
                  <TableCell align="center" variant="head">
                    Recieved Stock
                  </TableCell>
                  <TableCell align="center" variant="head">
                    Morning
                  </TableCell>
                  <TableCell align="center" variant="head">
                    Afternoon
                  </TableCell>
                  <TableCell align="center" variant="head">
                    Evening
                  </TableCell>
                  <TableCell align="center" variant="head">
                    Night
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.slice(0, rowsPerPage).map((item, idx) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={item.id}
                    selected={selectedItems.indexOf(item.id) !== -1}
                  >
                    {/*   <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.indexOf(item.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, item.id)}
                        value="true"
                      />
                    </TableCell> */}
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        {/*  <Avatar className={classes.avatar} src={item.avatarUrl}>
                          {getInitials(item.name)}
                        </Avatar> */}
                        <Typography variant="body1">{item.item}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>Initial Stock</TableCell>
                    <TableCell>Recieved Stock</TableCell>
                    <TableCell>Morning</TableCell>
                    <TableCell>Afternoon</TableCell>
                    <TableCell>Evening</TableCell>
                    <TableCell>Night</TableCell>
                    <TableCell>Remain</TableCell>
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
          count={items.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

DailyReport.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired
};

export default DailyReport;
