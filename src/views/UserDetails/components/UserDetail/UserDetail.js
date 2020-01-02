/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
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
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import axios from 'axios';
import {API , UPDATEUSER } from '../../../../config';
const api = `${API}${UPDATEUSER}`;

const useStyles = makeStyles(() => ({
  root: {}
}));

const UserDetail = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    isTutor: null,
    isActivated: false,
    isActiveToken: null,
    name: '',
    p_number: '',
    urlAvatar: null,
    address: null,
    overview: '',
    price: null,
    rating: null
  });

  useEffect(() => {
    setValues(rest.user);
  }, [rest.user]);
  console.log(values);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
      isActivated : event.target.checked
    });
  };


  const updateRatting = (values)=>{
    if (values.rating > 5){
      return 5;
    } else {
      return values.rating;
    }
  };
  const header = `Bearer ${localStorage.getItem('token')}`;

  const loadData = async () => {
    try {
      const response = await axios.post(api, {
        _id: values._id,
        email:values.email,
        isTutor: values.isTutor,
        isActivated: values.isActivated,
        isActiveToken: values.isActiveToken,
        name: values.name,
        p_number: values.p_number,
        urlAvatar: values.urlAvatar,
        address: values.address,
        overview: values.overview,
        price: values.price,
        rating:values.rating 
      }, {
        headers: { Authorization: header },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = ()=>{
    loadData();
    console.log('update test:',values);
  };

  const isActive = (values)=>{
    if (values.isActivated === true || values.isActivated === 'true') {
      return true;
    } else {
      return false;
    }
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
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                label="email"
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
                label=" name"
                margin="dense"
                name="Name"
                onChange={handleChange}
                required
                value={values.name || ''}
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
                label="Overview"
                margin="dense"
                name="overview"
                onChange={handleChange}
                required
                value={values.overview || 'Not found'}
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
                label="Price"
                margin="dense"
                name="price"
                onChange={handleChange}
                type="number"
                value={values.price || '0'}
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
                label="Rating"
                margin="dense"
                name="rating"
                onChange={handleChange}
                required
                type="number"
                value={updateRatting(values) || '0'}
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
                label="p_number"
                margin="dense"
                name="p_number"
                onChange={handleChange}
                required
                value={values.p_number || '0'}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={
              <Switch 
                checked={isActive(values)|| false} 
                name="isActivated"
                onChange={handleChange}
              />    
            }
            label="Active"
          />
        </CardContent>
        <Divider />

        <CardActions>
          <Button
            color="primary"
            onClick ={updateUser}
            variant="contained"
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

UserDetail.propTypes = {
  className: PropTypes.string
};

export default UserDetail;
