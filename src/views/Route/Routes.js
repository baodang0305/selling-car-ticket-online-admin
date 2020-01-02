/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import {API,LISTROUTE} from '../../config';
import { SkillsToolbar, SkillsTable } from './components';
const api = `${API}${LISTROUTE}`;
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));


const RouteList = () => {
  const classes = useStyles();
  let [Route, setRoutes] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  useEffect(() => {
    const header = `Bearer ${localStorage.getItem('token')}`;
    const loadData = async () => {
      try {
        const response = await axios.get(api, {
          headers: { Authorization: header },
        });
        setRoutes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [Route]);
  const setSelected = (value) => {
    setSelectedRoutes(value);
  };
  return (
    <div className={classes.root}>
      <SkillsToolbar selectedRoutes = {selectedRoutes}/>
      <div className={classes.content}>
        <SkillsTable 
          onSelected = {setSelected}
          Route={Route} 
        />
      </div>
    </div>
  );
};

export default RouteList;
