import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AppProvider } from './contexts/AppContext';

// Import components
import Layout from './components/common/Layout';
import Dashboard from './components/Dashboard';
import BranchSetup from './components/inventory/BranchSetup';
import SKUCreation from './components/sku/SKUCreation';
import SKUSearch from './components/sku/SKUSearch';
import SKUDeactivation from './components/sku/SKUDeactivation';
import BarcodeGenerator from './components/barcode/BarcodeGenerator';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h5: {
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/branch-setup" element={<BranchSetup />} />
              <Route path="/sku-creation" element={<SKUCreation />} />
              <Route path="/sku-search" element={<SKUSearch />} />
              <Route path="/sku-deactivation" element={<SKUDeactivation />} />
              <Route path="/barcode-generator" element={<BarcodeGenerator />} />
            </Routes>
          </Layout>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
