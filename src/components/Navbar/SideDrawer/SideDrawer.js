import React, {useState} from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})

const SideDrawer = (props) => {
  const {categoriesArr} = props
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  const list = (anchor='right') => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: 'right',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {categoriesArr.map((cat) => (
          <ListItem button key={cat.name}>
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
          <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
            {list}
          </Drawer>
    </div>
  );
}
const mapStateToProps= state=>{
  const categoriesArr = Object.values(state.categories)
  return {
    categoriesArr
  }
}
export default connect(mapStateToProps)(SideDrawer)
