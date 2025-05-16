import React from 'react';
import { Box, Container, Typography, Grid, Paper, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { branches, skus, filteredSkus } = useAppContext();
  
  // Calculate statistics
  const totalBranches = branches.length;
  const totalSKUs = skus.length;
  const activeSKUs = skus.filter(sku => sku.isActive).length;
  const inactiveSKUs = skus.filter(sku => !sku.isActive).length;
  
  // Feature cards
  const features = [
    {
      title: 'Inventory Branch Setup',
      description: 'Create and manage different inventory branches',
      path: '/branch-setup'
    },
    {
      title: 'SKU Creation',
      description: 'Create and assign unique SKUs for inventory items',
      path: '/sku-creation'
    },
    {
      title: 'SKU Search',
      description: 'Search inventory items by SKU, name, or category',
      path: '/sku-search'
    },
    {
      title: 'SKU Deactivation',
      description: 'Mark SKUs as inactive while retaining historical data',
      path: '/sku-deactivation'
    },
    {
      title: 'Barcode Generator',
      description: 'Generate and scan barcodes/QR codes for SKUs',
      path: '/barcode-generator'
    }
  ];
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        SKU Management Dashboard
      </Typography>
      
      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e3f2fd',
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Branches
            </Typography>
            <Typography component="p" variant="h4">
              {totalBranches}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e8f5e9',
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total SKUs
            </Typography>
            <Typography component="p" variant="h4">
              {totalSKUs}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#f9fbe7',
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Active SKUs
            </Typography>
            <Typography component="p" variant="h4">
              {activeSKUs}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#fff3e0',
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Inactive SKUs
            </Typography>
            <Typography component="p" variant="h4">
              {inactiveSKUs}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Feature Cards */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Features
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea onClick={() => navigate(feature.path)}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
