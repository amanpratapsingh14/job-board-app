import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children, title }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout; 