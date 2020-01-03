import React from 'react';
import clsx from 'clsx';
import PropTypes, { object } from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import palette from 'theme/palette';
import {  options } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestSales = props => {
  const {chart}  = props
  // const {month} = props
  console.log(chart)
  const valueData = Object.values(chart).map((value) => {
    return value.data;
});
const valueDatamonth = Object.values(chart).map((value) => {
  return Object.values(value._id).map((value) => {
    return value;
  });
});
console.log(valueDatamonth)
console.log('value data',valueData)
  
   const data = {
    labels: valueDatamonth,
    datasets: [
      {
        label: 'This year',
        backgroundColor: palette.primary.main,
        data: valueData
      }
    ]
  };
 
  
  const { className, ...rest } = props;

  const classes = useStyles();
  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            size="small"
            variant="text"
          >
            This year
          </Button>
        }
        title="Latest Sales (VND)"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={data}
            options={options}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          Overview <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;
