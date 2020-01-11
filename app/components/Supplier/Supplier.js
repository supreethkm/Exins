import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const SupplierPage = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Grid item md={8} xs={12}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form>
          <CardHeader subheader="" title="Supplier" />
          <Divider />
          <CardContent>
            <Grid container spacing={6} wrap="wrap">
              <Grid className={classes.item} item md={4} sm={6} xs={12}>
                <Typography gutterBottom variant="h6">
                  Name
                </Typography>
              </Grid>
              <Grid className={classes.item} item md={8} sm={6} xs={12}>
                <Typography gutterBottom variant="button">
                  Bangalore Grocery Supplier Pvt Ltd
                </Typography>
              </Grid>
              <Grid className={classes.item} item md={4} sm={6} xs={12}>
                <Typography gutterBottom variant="h6">
                  Address
                </Typography>
              </Grid>
              <Grid className={classes.item} item md={8} sm={6} xs={12}>
                <Typography gutterBottom variant="subtitle2">
                  #101, Majestic, Bangalore, Bangalore Karnatak -560001
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button color="primary" variant="outlined">
              Edit
            </Button>
          </CardActions>
        </form>
      </Card>
    </Grid>
  );
};

SupplierPage.propTypes = {
  className: PropTypes.string
};

export default SupplierPage;
