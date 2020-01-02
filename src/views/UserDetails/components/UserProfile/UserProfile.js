/* eslint-disable no-console */
import React, {useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { getInitials } from 'helpers';

// import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Rating,
} from '@material-ui/lab';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Box
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    cursor: 'pointer',
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const getCost = (values)=>{
  const baseCost = values.price *1;
  return baseCost.toString() + ' $';
};

const UserProfile = props => {
  const { className, ...rest } = props;
  
  // eslint-disable-next-line no-unused-vars
  const [avatar, setAvatar] = useState(null);
  const classes = useStyles();

 
  console.log(rest.user);
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
  const {user} = rest;

  useEffect(() => {
    setValues(user);
  }, [user]);
  const isRole = (values)=>{
    if (values.isTutor) {
      return 'Teacher';
    } else {
      return 'Student';
    }
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {values.name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {isRole(user)}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >Overview:
              {values.overview}
            </Typography>
          </div>
          
          <label 
            className={classes.avatar} 
            htmlFor="raised-button-file"
          >
            <Avatar
              className={classes.avatar} 
              component="span"
              src={values.urlAvatar}
            >
              {getInitials(values.name)}
            </Avatar>
          </label>
        </div>
        <div className={classes.progress}>
          <Box 
            borderColor="transparent"
            component="fieldset" 
            mb={3} 
          >
            <Typography variant="body1">RATING</Typography>
            <Rating 
              name="read-only"
              readOnly
              size="large" 
              value={values.rating} 
            />
          </Box>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Typography variant="body1">PRICE:</Typography>
        <Typography variant="body1">{getCost(values)}</Typography>
      </CardActions>
    </Card>
  );
};

UserProfile.propTypes = {
  className: PropTypes.string
};

export default UserProfile;
