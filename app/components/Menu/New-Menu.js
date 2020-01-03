import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel
} from '@material-ui/core';
import { compose } from 'redux';

const useStyles = makeStyles(() => ({
  root: {}
}));

const NewMenu = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'Shen',
    lastName: 'Zhi',
    email: 'shen.zhi@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA',
    checkedB: 'true',
    checkedB: 'false'
  });

  const handleChange = event => {
    console.log('handleChange', event);
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleCheckboxChange = event => {
    console.log('handleChange', event);
    setValues({
      ...values,
      [event.target.name]: event.target.checked
    });
  };

  const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader
          subheader="The information will added to Menu"
          title="Add item to Menu"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the Item name"
                label="Item name"
                margin="dense"
                name="itemName"
                onChange={handleChange}
                required
                value={values.itemName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Quantity per serve"
                margin="dense"
                name="serveQuantity"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormLabel component="legend">Select Days</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.checkedA}
                      onChange={handleCheckboxChange}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Sunday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.checkedB}
                      onChange={handleCheckboxChange}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Monday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.checkedA}
                      onChange={handleCheckboxChange}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Tuesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.checkedA}
                      onChange={handleCheckboxChange}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Wednsday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.checkedA}
                      onChange={handleCheckboxChange}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Thursday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.checkedA}
                      onChange={handleCheckboxChange}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Friday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.checkedA}
                      onChange={handleCheckboxChange}
                      value="true"
                      color="primary"
                    />
                  }
                  label="Saturday"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

NewMenu.propTypes = {
  className: PropTypes.string
};

export default NewMenu;
