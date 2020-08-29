import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './FoodStat.css';


function FoodStat(props) {
  return (
    <List className="foodstat" component="nav" aria-label="secondary mailbox folders">

      {Object.keys(props).map((food) => (
        <ListItem href="#simple-list">
          <ListItemText primary={`${food}: ` + props[food]} />
        </ListItem>
      ))}
    </List>
  )
}
export default FoodStat;
