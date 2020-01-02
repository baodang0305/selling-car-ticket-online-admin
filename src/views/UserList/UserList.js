/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import {API , LISTUSER } from '../../config';
import { UsersToolbar, UsersTable } from './components';
const api = `${API}${LISTUSER}`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));


const UserList = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const classes = useStyles();
  let [users, setUsers] = useState([]);
 
  const loadData = async () => {
    try {
      const header = `Bearer ${localStorage.getItem('token')}`;
      const response = await axios.get(api, {
        headers: { Authorization: header },
      });
      // console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    
    loadData();
  }, [users]);
  // console.log('test select',selectedUsers);
  const setSelected = (value) => {
    setSelectedUsers(value);
  };
  return (
    <div className={classes.root}>
      <UsersToolbar selectedUsers={selectedUsers}  />
      <div className={classes.content}>
        <UsersTable
          onSelected={setSelected}
          users={users} 
        />
      </div>
    </div>
  );
};

export default UserList;
