import React, { useCallback } from 'react';
import Link from 'next/link';
import {
  Button,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  InputBase,
  MenuItem,
  Menu,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import {
  Search as SearchIcon,
  AccountCircle,
  Menu as MenuIcon,
  FilterList as FilterListIcon,
} from '@material-ui/icons';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { search } from '../common.actions';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: '#fff',
  },
  search: {
    'position': 'relative',
    'borderRadius': theme.shape.borderRadius,
    'backgroundColor': fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    'marginRight': theme.spacing(2),
    'marginLeft': 0,
    'width': '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  formControlLabel: {
    marginRight: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
}));

interface IProps {
  onMenuClick?: () => void;
  containerClassName?: string;
  menuButtonClassName?: string;
}

const PrimarySearchAppBar: React.FC<IProps> = ({
  onMenuClick,
  containerClassName,
  menuButtonClassName,
}) => {
  const classes = useStyles({});
  const profilePopupState = usePopupState({ variant: 'popover', popupId: 'profileMenu' });
  const filterPopupState = usePopupState({ variant: 'popover', popupId: 'filterMenu' });
  const dispatch = useDispatch();
  const handleSearch = useCallback(e => dispatch(search(e.target.value)), []);

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={containerClassName}>
        <Toolbar>
          <IconButton
            edge="start"
            className={menuButtonClassName}
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Button>
              <Typography className={classes.title} variant="h6" noWrap={true}>
                Asset Manager
              </Typography>
            </Button>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearch}
            />
          </div>
          <IconButton color="inherit" {...bindTrigger(filterPopupState)}>
            <FilterListIcon />
          </IconButton>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              {...bindTrigger(profilePopupState)}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted={true}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        {...bindMenu(profilePopupState)}
      >
        <MenuItem onClick={profilePopupState.close}>Profile</MenuItem>
        <MenuItem onClick={profilePopupState.close}>My account</MenuItem>
      </Menu>
      <Menu
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        keepMounted={true}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        {...bindMenu(filterPopupState)}
      >
        <FormControl>
          <FormGroup>
            <MenuItem disableGutters={true}>
              <FormControlLabel
                control={<Checkbox />}
                label="Filter"
                className={classes.formControlLabel}
              />
            </MenuItem>
            <MenuItem disableGutters={true}>
              <FormControlLabel
                control={<Checkbox />}
                label="Filter"
                className={classes.formControlLabel}
              />
            </MenuItem>
          </FormGroup>
        </FormControl>
      </Menu>
    </div>
  );
};

export default PrimarySearchAppBar;
