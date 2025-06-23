import React from 'react';
import Header from './Header';
import { Container } from '@mui/material';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </div>
  );
};

export default MainLayout; 