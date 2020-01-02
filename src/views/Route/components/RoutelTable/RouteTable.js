/* eslint-disable no-console */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  TablePagination,
  MenuItem,
  Select,
  InputLabel
  // Button,
} from '@material-ui/core';
// import { SettingsApplications } from '@material-ui/icons';
// import AccountDetails from '../../../Account/components/AccountDetails';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  displayCombonent: {
    display: 'flex',
    justifyContent: 'center',
    zIndex: '10',
    position: 'absolute'
  },
  cardDetail: {
    width: '75%'
  }
}));

const RoutesTable = props => {
  const { className, Route, ...rest } = props;
  const {onSelected} = rest;
  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  // const [showFromEdit, setShowFromEdit] = useState(false);
  // const [userUpdate , setUserUpdate] = useState([]);

  const handleSelectAll = event => {
    const { Route } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = Route.map(skill => skill._id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
    onSelected(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
    onSelected(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  const handleAddLocation = (event,value)  => {
    if (event.target.value === 'AddLocation'){
      console.log('location:',value)
    }
  };
  const handleAddTime = (event,value)  => {
    if (event.target.value === 'AddTime'){
      console.log('time:',value)
    }
  };
  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        {/* {showFromEdit ? <div className={classes.displayCombonent}> 
          <Card className={classes.cardDetail}> 
            <AccountDetails user={userUpdate.user}/>
          </Card>
        </div> : null} */}
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === Route.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < Route.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>departure</TableCell>
                  <TableCell>destination</TableCell>
                  <TableCell>typeOfCar</TableCell>
                  <TableCell>distance</TableCell>
                  <TableCell>fare</TableCell>
                  <TableCell>departureTime</TableCell>
                  <TableCell>getOnDeparture</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Route.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(Route => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={Route.name}
                    selected={selectedUsers.indexOf(Route.name) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(Route._id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, Route._id)}
                        value="true"
                      />
                    </TableCell>
                    
                    <TableCell>{Route.departure}</TableCell>
                    <TableCell>{Route.destination}</TableCell>
                    <TableCell>{Route.typeOfCar}</TableCell>
                    <TableCell>{Route.distance} Km</TableCell>
                    <TableCell>$ {Route.fare}</TableCell>
                    <TableCell>
                    <FormControl className={classes.formControl}>
                        <InputLabel 
                          id="demo-simple-select-placeholder-label-label"
                          shrink
                        >
                          Time
                        </InputLabel>
                        <Select
                          className={classes.selectEmpty}
                          // displayEmpty
                          id="demo-simple-select-placeholder-label"
                          labelId="demo-simple-select-placeholder-label-label"
                          onChange={event => handleAddTime(event, Route)}
                          value={Route.departureTime[0]}
                        >
                          {Route.departureTime.map(item => (
                            <MenuItem value={item}>{item}:00</MenuItem>
                          ))}
                          <MenuItem value="AddTime">Add new time</MenuItem>
                          
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                    <FormControl className={classes.formControl}>
                        <InputLabel 
                          id="demo-simple-select-placeholder-label-label"
                          shrink
                        >
                          Location
                        </InputLabel>
                        <Select
                          className={classes.selectEmpty}
                          // displayEmpty
                          id="demo-simple-select-placeholder-label"
                          labelId="demo-simple-select-placeholder-label-label"
                          onChange={event => handleAddLocation(event, Route)}
                          value={Route.getOnDeparture[0]}
                        >
                          {Route.getOnDeparture.map(item => (
                            <MenuItem value={item}>{item}</MenuItem>
                          ))}
                          <MenuItem value="AddLocation" >Add New Location</MenuItem>
                          
                        </Select>
                      </FormControl>  
                    </TableCell>
                    
                  </TableRow>

                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={Route.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
      
    </Card>
    
  );
};

RoutesTable.propTypes = {
  className: PropTypes.string,
  Route: PropTypes.array.isRequired
};

export default RoutesTable;
