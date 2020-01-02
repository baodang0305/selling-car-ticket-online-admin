/* eslint-disable no-console */
import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,
} from '@material-ui/core';
import { SettingsApplications } from '@material-ui/icons';
import { getInitials } from 'helpers';
import UserDetail from '../UserDetail';

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

const UsersTable = props => {
  const { className, users, ...rest } = props;
  const classes = useStyles();
  const {onSelected} = rest;
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [showFromEdit, setShowFromEdit] = useState(false);
  const [userUpdate, setUserUpdate] = useState([]);

  const handleSelectAll = event => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.email);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
    onSelected(selectedUsers);
  };

  const handleSelectOne = (event, email) => {
    const selectedIndex = selectedUsers.indexOf(email);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, email);
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
  const setShow = (value) => {
    setShowFromEdit(value);

  };
  const isFirstRender = useRef(true);

  useEffect(() => {
    console.log('isFirstRender', isFirstRender.current);
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

  }, []);

  // eslint-disable-next-line react/no-multi-comp
  const handleRenderComponent = (user) => {
    setUserUpdate(user);
    setShow(true);
    console.log(user.user);
  };

  const isRole = (user) => {
    if (user.isTutor) {
      return 'Teacher';
    } else {
      return 'Student';
    }
  };
  const isActive = (user) => {
    if (user.isActivated) {
      return 'True';
    } else {
      return 'False';
    }
  };

  function useOutsideAlerter(ref) {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        setShowFromEdit(false);
      }
    }



    useEffect(() => {
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    });
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        {showFromEdit ?
          <div
            className={classes.displayCombonent}
            ref={wrapperRef}
          >
            <Card
              className={classes.cardDetail}
            >
              <UserDetail
                onClickUpdate={setShow}
                user={userUpdate.user}
              />
            </Card>
          </div> : null}
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.email}
                    selected={selectedUsers.indexOf(user.email) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(user.email) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, user.email)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={user.urlAvatar}
                        >
                          {getInitials(user.lastName)}
                        </Avatar>
                        <Typography variant="body1">{user.lastName}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.name}
                    </TableCell>
                    <TableCell>{isRole(user)}</TableCell>
                    <TableCell>
                      {isActive(user)}
                      {/* {moment(user.createdAt).format('DD/MM/YYYY')} */}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleRenderComponent({ user })}
                      >
                        <SettingsApplications />
                      </Button>
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
          count={users.length}
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

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
