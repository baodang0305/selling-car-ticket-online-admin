import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Budget,
  TotalUsers,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';
import axios from 'axios';
import { API, TOTAL,COUNT } from '../../config';
const apiTotal = `${API}${TOTAL}`;
const apiCount = `${API}${COUNT}`;
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));



const Dashboard = () => {
  const classes = useStyles();
  const [total, setTotal] = useState();
  const [count, setCount] = useState();
  const header = `Bearer ${localStorage.getItem('token')}`;
const loadTotal = async () => {
  try {
    const response = await axios.get(apiTotal, {
      headers: { Authorization: header },
    });
    const {data} = response.data[0];
    setTotal(data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
const loadCount = async () => {
  try {
    const response = await axios.get(apiCount, {
      headers: { Authorization: header },
    });
    const {data} = response.data[0];
    setCount(data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  loadTotal();
  loadCount();
  // eslint-disable-next-line
}, []);
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget total = {total}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers count ={count} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit total = {total} />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
