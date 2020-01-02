/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@material-ui/core';
import axios from 'axios';
import { SearchInput } from 'components';
import { API, ADDROUTE, DELETEROUTE } from '../../../../config';
import jsonPlacesData from '../../../../config/dataPlaces.json'
const api = `${API}${ADDROUTE}`;
const apiDelee = `${API}${DELETEROUTE}`;

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

const listProvince = Object.values(jsonPlacesData).map((value) => {
  return value.name;
});

const UsersToolbar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const { selectedRoutes } = rest;

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    fare:0,
    distance:0,
    typeOfCar : ''
  });



  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
 
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    console.log(values);
    const header = `Bearer ${localStorage.getItem('token')}`;
    console.log(header);
    axios.post(api, {
      departure: values.departure,
      destination: values.destination,
      typeOfCar:values.typeOfCar,
      distance:values.distance,
      fare : values.fare
    }, {
      headers: { Authorization: header },
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const removeRoute = async (value) => {
    const header = `Bearer ${localStorage.getItem('token')}`;
    await axios.post(apiDelee, {
      _id: value
    }, {
      headers: { Authorization: header },
    });
    // console.log(value)
  };
  const handleDelete = () => {
    selectedRoutes.forEach(element => {
      removeRoute(element);
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
          onClick={handleDelete}
        >DELETE</Button>
        <Button
          color="primary"
          onClick={handleClickOpen}
          variant="contained"
        >
          Add Route
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />
      </div>
      <div>
        <Dialog
          fullWidth={true}
          maxWidth='sm'
          aria-labelledby="max-width-dialog-title"
          onClose={handleClose}
          open={open}
        >
          <DialogTitle id="form-dialog-title">Add new Route</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add new route into your website
            </DialogContentText>
            <div>
            <FormControl className={classes.formControl} fullWidth m={2}>
              <InputLabel
                id="demo-simple-select-placeholder-label-label"
                shrink
              >
                Departure
                </InputLabel>
              <Select
                className={classes.selectEmpty}
                // displayEmpty
                id="demo-simple-select-placeholder-label"
                labelId="demo-simple-select-placeholder-label-label"
                onChange={handleChange}
                name = 'departure'
              >
                {listProvince.map(item => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}

              </Select>
            </FormControl>
            </div>
            <div></div>
            <div>
            <FormControl className={classes.formControl} fullWidth m={2}>
              <InputLabel
                id="demo-simple-select-placeholder-label-label"
                shrink
              >
                Destination
                </InputLabel>
              <Select
                className={classes.selectEmpty}
                // displayEmpty
                id="demo-simple-select-placeholder-label"
                labelId="demo-simple-select-placeholder-label-label"
                onChange={handleChange}
                name = 'destination'
              >
                {listProvince.map(item => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}

              </Select>
            </FormControl>
            </div>
            <div></div>
            <div>
            <TextField
              fullWidth
              id="typeOfCar"
              label="Type Of Car"
              margin="dense"
              name = "typeOfCar"
              onChange={handleChange}
              required
              type="text"
              value = {values.typeOfCar}
            />
            </div>
            <div></div>
            <div>
            <TextField
              fullWidth
              id="distance"
              label="Distance"
              margin="dense"
              name = "distance"
              onChange={handleChange}
              required
              type="number"
              value = {values.distance}
            />
            </div>
            <div>
            <TextField
              fullWidth
              id="fare"
              label="cost"
              margin="dense"
              name = "fare"
              onChange={handleChange}
              required
              type="number"
              value = {values.fare}
            />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleAdd}
            >
              ADD
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>

  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
