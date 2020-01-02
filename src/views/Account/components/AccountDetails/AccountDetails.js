/* eslint-disable no-console */
import React, { useState , useEffect  } from 'react';
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
  TextField
} from '@material-ui/core';
import axios from 'axios';
import {API ,  UPDATEADMIN} from '../../../../config';
const api = `${API}${UPDATEADMIN}`;
const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className  ,...rest } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });
  const {user} = rest;

  useEffect(() => {
    setValues(user);
  }, [user]);
  console.log(values);
  console.log('test account detail:',user);
  
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const header = `Bearer ${localStorage.getItem('token')}`;

  const loadData = async () => {
    try {
      const response = await axios.post(api, {
        email:values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        phone: values.phone,
      }, {
        headers: { Authorization: header },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAdminUser = () =>{
    loadData();
    
    console.log('test update', values);
  };



  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                value={values.address || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />

        <CardActions>
          <Button
            color="primary"
            onClick ={updateAdminUser}
            variant="contained"
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
