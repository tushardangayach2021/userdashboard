import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Bell, Clock, LogOut, User } from 'react-feather'
import { useTranslation } from 'react-i18next';
import localStorageService from '../api/localStorageService';
import { isEmpty } from '../helpers/utils';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer(props) {
  const theme = useTheme();
  const drawerOpen = localStorageService.getDrawerOpen();
  // alert(drawerOpen)
  const [open, setOpen] = React.useState(drawerOpen ? drawerOpen === "true" : true);
  const { t } = useTranslation();

  const handleDrawerOpen = () => {
    document.querySelector(".dashboard-header").style.left = "0";
    document.querySelector(".brand-logo").src = "data:image/png;base64,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"
    setOpen(true);
    localStorageService.setDrawerOpen(true)
  };

  const handleDrawerClose = () => {
    document.querySelector(".dashboard-header").style.left = "4.4rem";
    document.querySelector(".brand-logo").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAmCAYAAABtT3M/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQbSURBVHgB7Vjda1xFFJ9zZu5uNtmPbEMqCio+FBSlJqFvtfqgD/bDh4L40ZfE/6DgQ/tS0kIp6otC6UPFF0WLDzVCg4KgaKoPvhiEIkogRhBN+sGmm2z3JvfemenM7t7bu9s7m7vb3GQL+UHIvXfOOXN+M3POnLNAQpjed6wiBWekHbikUoj2Ml0CED1CgZvGeYqePfrrpbOt35ucwUL2wqHvL54EAGky9NXYW5NMiNMkAVi7Br84+OPHE6ZxKSUQuHTfd2wRI+0I1BUESQpyA9sm35B0iOQoKGDH7tTVSIfobppk0VM+qQMvSRdgzUbIhkZWs+nPeNWd0c8qkRjlVRKD8LtJNiyXzlhLpAvESpULExODhcX/PpfZ/Jy03Hl6e/mgpqsDEWqbKQL2EHdztetNtAThOfjl1utvSKwsv8jH9p8aPnd6No6pWCTslZVCcc05LLG6m2cyaWKvHfb9CPv0oJDVaoWuO4i2e4jb5Q/i6gXL9vXIxKDjObvbCavMBDpTk4QgVQ4lXSAgITPeR1C6887Um8efMUoDSY7BAyAgke8vnCPZvm+OfvnhX0ZhqS5N0nsISFTs8jiseaM/jJ/Z0yokKK35ri+6RHdClxUkRopsQRDYKphekq73WHl+/oB6nQsLPXvixOLS+fPPea7rpIaHV9xs7kIK0TiXI4SRa5SeL79WLN7JAbhQKZ2p7N07T2IimOzKvrf/JOvO02Igc/LAMTnNbsy97/YXL1t9fY97LD1l3fznPSlUbYUNlVr9Iesm/P0Mvvl1Tn1cNlaYoHkf1TltGrTTxYuWRccEwLep1euTXjr36dCpny5H6bK6AUmv7B//Tpn5mTKcg5X/dzF7+QgX3jUCxRHw1mdo9fZrZIugQo9QxqYpx+ctCrPULh9RHK+a5Gsk1KrpGv64/7H06isv+M+9mI1a0f56Bdi2ZISidW5z/RxJgvnhDvWUynA7yIhaSHkxJHEjO6ACxnPcLT9VQmjnVLA2FhCleSHjVWsskZa6LXR/FLcBY9EGoMLRWlDnqCyALiFnVY5sIarel7ri6bAP2EhHp2TOMmWG8l+LsrKn5nZT6bJJHkxG/H42/LyVaNwt4YJd+xG5OcB/f3K29vtAQ1WwoWvUenRK2n9M6nzts7zXLyTgMDFXr77XSPOfCBh4Cr3Fl8OKTvqJdxl4pdGwEmJqlbsDQ8hLo5vdL5jQzjZt/Hc5ecSi9h7CSyP+mE6dltOf68W+34yoQ00jspOo/Rl/hNs2oE61hi17+HeCP2wkDLjvnqixkttXM3WM6JiQIAB7rngVQhp9YgLzM/oeqfcvigIt/IbW4BJx8zNNRiKUN/ssihbbekH9N4CBv13Sl6FYvRrMrO5hycVNo8GgG+shRPnUi37uYAc72ATcBQOljDG7nECHAAAAAElFTkSuQmCC"
    localStorageService.setDrawerOpen(false)
    setOpen(false);
  };
  React.useEffect(()=>{
    drawerOpen === "true" ? handleDrawerOpen() : handleDrawerClose();
  })
  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ left: "4.4rem" }} className="dashboard-header" color="transparent">
        <Toolbar>
          <Box className="header-inside" width="50%" display="flex" alignItems="center">

            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={!open ? handleDrawerOpen : handleDrawerClose}
              edge="start"
            // sx={{
            //   marginRight: '36px',
            //   ...(open && { display: 'none' }),
            // }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className='d-flex ' noWrap component="div">
              User Dashboard
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" ml="auto">
            <Box
              tabIndex={0}
              // aria-label={'User name' + authUser?.user_principal?.username}
              mr={1}
              display={{ xs: 'flex', sm: 'flex' }}
              flexDirection="row"
              // onClick={redirectToProfile}
              alignItems="center"
              className="cursor-pointer"
            >
              {/* <User aria-label={authUser?.user_principal?.username} /> */}
              <Box ml={1}  component="span" fontWeight="fontWeightMedium" fontSize="16px">
                {/* "{authUser?.user_principal?.username}" */}
                sdsd
              </Box>
              </Box>
              <Box  component="span" fontWeight="fontWeightMedium" fontSize="16px">
            <IconButton
              mr={2}
              color="inherit"
              aria-label={t('notifications')}
              aria-controls="notification"
              aria-haspopup="true"
            // onClick={toggleNotifications}
            // className={classes.notification}
            >
              <Bell />
              <span className="notification-sign" />
            </IconButton>
            </Box>
            <Box mr={8}  component="span" fontWeight="fontWeightMedium" fontSize="16px">
            <IconButton
            mr={2}
              color="inherit"
              aria-label={t('notifications')}
              aria-controls="notification"
              aria-haspopup="true"
            // onClick={toggleNotifications}
            // className={classes.notification}
            >
              <LogOut onClick={props.signoutUser} />
              {/* <span className="notification-sign" /> */}
            </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
          <img class="brand-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAmCAYAAABtT3M/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQbSURBVHgB7Vjda1xFFJ9zZu5uNtmPbEMqCio+FBSlJqFvtfqgD/bDh4L40ZfE/6DgQ/tS0kIp6otC6UPFF0WLDzVCg4KgaKoPvhiEIkogRhBN+sGmm2z3JvfemenM7t7bu9s7m7vb3GQL+UHIvXfOOXN+M3POnLNAQpjed6wiBWekHbikUoj2Ml0CED1CgZvGeYqePfrrpbOt35ucwUL2wqHvL54EAGky9NXYW5NMiNMkAVi7Br84+OPHE6ZxKSUQuHTfd2wRI+0I1BUESQpyA9sm35B0iOQoKGDH7tTVSIfobppk0VM+qQMvSRdgzUbIhkZWs+nPeNWd0c8qkRjlVRKD8LtJNiyXzlhLpAvESpULExODhcX/PpfZ/Jy03Hl6e/mgpqsDEWqbKQL2EHdztetNtAThOfjl1utvSKwsv8jH9p8aPnd6No6pWCTslZVCcc05LLG6m2cyaWKvHfb9CPv0oJDVaoWuO4i2e4jb5Q/i6gXL9vXIxKDjObvbCavMBDpTk4QgVQ4lXSAgITPeR1C6887Um8efMUoDSY7BAyAgke8vnCPZvm+OfvnhX0ZhqS5N0nsISFTs8jiseaM/jJ/Z0yokKK35ri+6RHdClxUkRopsQRDYKphekq73WHl+/oB6nQsLPXvixOLS+fPPea7rpIaHV9xs7kIK0TiXI4SRa5SeL79WLN7JAbhQKZ2p7N07T2IimOzKvrf/JOvO02Igc/LAMTnNbsy97/YXL1t9fY97LD1l3fznPSlUbYUNlVr9Iesm/P0Mvvl1Tn1cNlaYoHkf1TltGrTTxYuWRccEwLep1euTXjr36dCpny5H6bK6AUmv7B//Tpn5mTKcg5X/dzF7+QgX3jUCxRHw1mdo9fZrZIugQo9QxqYpx+ctCrPULh9RHK+a5Gsk1KrpGv64/7H06isv+M+9mI1a0f56Bdi2ZISidW5z/RxJgvnhDvWUynA7yIhaSHkxJHEjO6ACxnPcLT9VQmjnVLA2FhCleSHjVWsskZa6LXR/FLcBY9EGoMLRWlDnqCyALiFnVY5sIarel7ri6bAP2EhHp2TOMmWG8l+LsrKn5nZT6bJJHkxG/H42/LyVaNwt4YJd+xG5OcB/f3K29vtAQ1WwoWvUenRK2n9M6nzts7zXLyTgMDFXr77XSPOfCBh4Cr3Fl8OKTvqJdxl4pdGwEmJqlbsDQ8hLo5vdL5jQzjZt/Hc5ecSi9h7CSyP+mE6dltOf68W+34yoQ00jspOo/Rl/hNs2oE61hi17+HeCP2wkDLjvnqixkttXM3WM6JiQIAB7rngVQhp9YgLzM/oeqfcvigIt/IbW4BJx8zNNRiKUN/ssihbbekH9N4CBv13Sl6FYvRrMrO5hycVNo8GgG+shRPnUi37uYAc72ATcBQOljDG7nECHAAAAAElFTkSuQmCC" alt="Student Information System"></img>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box> */}
    </Box>
  );
}
