/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
import React , { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { UserProfile, UserDetail } from './components';
import {API,GETUSER} from '../../config';
const api = `${API}${GETUSER}`;
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}));
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const UserDetails = () => {
  const classes = useStyles();
  let [user, setUsers] = useState([]);
  const obj = getParameterByName('id');
  console.log('test id',obj);
  
  useEffect(() => {
    const loadData = async () => {
      const header = `Bearer ${localStorage.getItem('token')}`;
      const response = await axios.post(api,{
        _id: getParameterByName('id')
      }, {
        headers: { Authorization: header },
      });
      const {data} = response;
      setUsers(data);
      console.log('data getuser',user);
    };
    loadData();
    // eslint-disable-next-line
  }, []);
  console.log('data getuser',user);

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
          <UserProfile user = {user}/>
        </Grid>
        <Grid 
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <UserDetail
            user = {user}  
          />
        </Grid>
      </Grid>
    </div>
  );
};


export default UserDetails;
