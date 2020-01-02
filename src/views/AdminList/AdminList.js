/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import axios from 'axios';
import { AdminToolbar, AdminCard } from './components';
// import mockData from './data';
import { API, LISTADMIN } from '../../config';
const api = `${API}${LISTADMIN}`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const AdminList = () => {
  const classes = useStyles();

  // const [products] = useState(mockData);
  let [users, setusers] = useState([]);

  useEffect(() => {
    const header = `Bearer ${localStorage.getItem('token')}`;
    const loadData = async () => {
      try {
        const response = await axios.get(api, {
          headers: { Authorization: header },
        });
        console.log(response.data);
        setusers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);
  return (
    <div className={classes.root}>
      <AdminToolbar />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {users.map(user => (
            <Grid
              item
              key={user._id}
              lg={4}
              md={6}
              xs={12}
            >
              <AdminCard user={user} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AdminList;
