/* eslint-disable no-console */
import React , { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { AccountProfile, AccountDetails } from './components';
import {API,ADMIN} from '../../config';
const api = `${API}${ADMIN}`;
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = () => {
  const classes = useStyles();

  let [user, setUsers] = useState([]);
  const loadData = async () => {
    const header = `Bearer ${localStorage.getItem('token')}`;
    const response = await axios.get(api, {
      headers: { Authorization: header },
    });
    const {user} = response.data;
    setUsers(user);
  };
  useEffect(() => {
    loadData();
  }, []);
  console.log('data account',user);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile user = {user}/>
        </Grid>
        <Grid 
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails
            user = {user}  
          />
        </Grid>
      </Grid>
    </div>
  );
};


export default Account;
