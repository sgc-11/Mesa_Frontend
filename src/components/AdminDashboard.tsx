import React, { useState } from 'react';
import { 
  AppBar, 
  Tabs, 
  Tab, 
  Box, 
  Typography, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import ProductList from './adminSubcomp/ProductList';
import EventList from './adminSubcomp/Eventlist';
import ModelList from './adminSubcomp/ModelList';
import MediaList from './adminSubcomp/MediaList';
import MemberList from './adminSubcomp/MemberList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d81b60',
    },
    secondary: {
      main: '#f8bbd0',
    },
  },
});

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 0: return <EventList />;
      case 1: return <ModelList />;
      case 2: return <ProductList />;
      case 3: return <MediaList />;
      case 4: return <MemberList />;
      default: return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          background: 'linear-gradient(to bottom right, #fff5f7, #ffe6ed)',
          padding: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: '#d81b60', fontWeight: 'bold' }}
        >
          Admin Dashboard
        </Typography>
        
        <AppBar 
          position="static" 
          sx={{
            backgroundColor: '#f8bbd0',
            borderRadius: 2,
            marginBottom: 3,
          }}
          elevation={0}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Events" />
            <Tab label="Models" />
            <Tab label="Products" />
            <Tab label="Media" />
            <Tab label="Members" />
          </Tabs>
        </AppBar>

        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            padding: 3,
          }}
        >
          {renderTabContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;