import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, ListItemButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const AdminSidebar = () => {
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit'
  };

  const activeLinkStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.08)'
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/admin/dashboard"
            style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {})})}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/admin/dashboard" // Points to the same page for now
            style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {})})}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Jobs" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/admin/applicants"
            style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {})})}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Applicants" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminSidebar; 