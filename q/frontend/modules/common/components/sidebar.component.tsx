import React, { useCallback } from 'react';
import {
  Drawer,
  List,
  makeStyles,
  IconButton,
  useTheme,
  Button,
} from '@material-ui/core';
import {
  Mail,
  Pages,
  ChevronRight,
  ChevronLeft,
} from '@material-ui/icons';
import clsx from 'clsx';
import SidebarItem from './sidebar-item.component';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../common.actions';
import PrimarySearchAppBar from './primary-search-app-bar.component';
import { IStore } from '../../../store/rootReducer';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

interface IProps {
  title?: string;
}

const Sidebar: React.FC<IProps> = ({ children, title }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleToggleSidebar = useCallback(() => dispatch(toggleSidebar()), [
    dispatch,
  ]);
  const isSidebarOpened = useSelector<IStore, boolean>((state) => state.common.isSidebarOpened);
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <PrimarySearchAppBar
        onMenuClick={handleToggleSidebar}
        containerClassName={clsx(classes.appBar, {
          [classes.appBarShift]: isSidebarOpened,
        })}
        menuButtonClassName={clsx(classes.menuButton, {
          [classes.hide]: isSidebarOpened,
        })}
      />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isSidebarOpened,
            [classes.drawerClose]: !isSidebarOpened,
          }),
        }}
        open={isSidebarOpened}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleToggleSidebar}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <List>
          <SidebarItem
            title="Example"
            routes={[{ href: '/example', icon: <Pages />, title: 'Example' }]}
            moduleRoutes={['/example']}
            icon={<Mail />}
          />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
