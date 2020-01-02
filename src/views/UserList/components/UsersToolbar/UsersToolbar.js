/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { SearchInput } from 'components';
import axios from 'axios';
import {API,DELETEUSER} from '../../../../config';
const api = `${API}${DELETEUSER}`;
const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = props => {
  const { className, ...rest } = props;
  const {selectedUsers} = rest;
  const classes = useStyles();

  const removeUser = async (value)=>{
    const header = `Bearer ${localStorage.getItem('token')}`;
    await axios.post(api,{
      email: value
    }, {
      headers: { Authorization: header },
    });
  };
  const deleteUsers = ()=>{
    selectedUsers.forEach(element => {
      removeUser(element);
    });
    
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button 
          className={classes.exportButton} 
          onClick={deleteUsers}
        >Delete</Button>
        <Button
          color="primary"
          href =  "https://tutor-reactjs.firebaseapp.com/signup"
          variant="contained"
        >
          Add user
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
