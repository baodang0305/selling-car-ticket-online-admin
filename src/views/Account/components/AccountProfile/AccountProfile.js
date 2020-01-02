/* eslint-disable no-console */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { getInitials } from 'helpers';

// import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

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

const AccountProfile = props => {
  const { className, ...rest } = props;
  
  // eslint-disable-next-line no-unused-vars
  const [avatar, setAvatar] = useState(null);
  const [urlAvatar, setUrlAvatar] = useState('');
  const classes = useStyles();

 
  console.log(rest.user);

  const handleChooseFile = e =>{
    let file = e.target.files[0];
    setAvatar(file);
    getBase64(file, imageUrl =>
      setUrlAvatar(imageUrl)
    );
  };

  const {user} = rest;

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
              {user.lastName}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.address}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {user.phone}
              {/* {moment().format('hh:mm A')} ({user.timezone}) */}
            </Typography>
          </div>
          <input
            accept="image/*"
            className={classes.input}
            id="raised-button-file"
            multiple
            onChange={(e) => handleChooseFile(e)}
            style={{ display: 'none' }}
            type="file"
          />
          <label 
            className={classes.avatar} 
            htmlFor="raised-button-file"
          >
            <Avatar
              className={classes.avatar} 
              component="span"
              src={urlAvatar === '' ? user.avatar : urlAvatar}
            >
              {getInitials(user.lastName)}
            </Avatar>
          </label>
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          component="span"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
