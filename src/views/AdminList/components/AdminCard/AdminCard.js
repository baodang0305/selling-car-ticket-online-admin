import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  // CardActions,
  Typography,
  // Grid,
  Avatar,
  Divider
} from '@material-ui/core';
// import AccessTimeIcon from '@material-ui/icons/AccessTime';
// import GetAppIcon from '@material-ui/icons/GetApp';
import { getInitials } from 'helpers';
const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const AdminCard = props => {
  const { className, user, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.imageContainer}>
          <Avatar
            className={classes.avatar}
            src={user.avatarUrl}
          >
            {getInitials(user.lastName)}
          </Avatar>
          {/* <Typography variant="body1">{product.lastName}</Typography> */}
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {user.email}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {user.phone}
        </Typography>
      </CardContent>
      <Divider />
      {/* <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              Updated 2hr ago
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <GetAppIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {product.totalDownloads} Downloads
            </Typography>
          </Grid>
        </Grid>
      </CardActions> */}
    </Card>
  );
};

AdminCard.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default AdminCard;
