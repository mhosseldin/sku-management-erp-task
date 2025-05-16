import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import SearchIcon from '@mui/icons-material/Search';
import { useAppContext } from '../../contexts/AppContext';

const SKUDeactivation = () => {
  const { skus, deactivateSKU, searchSKUs } = useAppContext();
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Selected SKU for deactivation
  const [selectedSKU, setSelectedSKU] = useState(null);
  
  // Confirmation dialog
  const [openDialog, setOpenDialog] = useState(false);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle search submit
  const handleSearch = () => {
    const results = skus.filter(sku => 
      sku.isActive && (
        sku.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sku.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setSearchResults(results);
  };
  
  // Select SKU for deactivation
  const selectSKU = (sku) => {
    setSelectedSKU(sku);
  };
  
  // Open confirmation dialog
  const openConfirmationDialog = () => {
    if (selectedSKU) {
      setOpenDialog(true);
    }
  };
  
  // Handle deactivation
  const handleDeactivate = () => {
    if (selectedSKU) {
      deactivateSKU(selectedSKU.id);
      setOpenDialog(false);
      setSelectedSKU(null);
      
      // Refresh search results
      handleSearch();
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        SKU Deactivation
      </Typography>
      
      {/* Search Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Search Active SKUs
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Search by SKU Code or Item Name"
              placeholder="Enter SKU code or item name..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button 
              variant="contained" 
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <Grid container spacing={4}>
        {/* Search Results */}
        <Grid item xs={12} md={selectedSKU ? 7 : 12}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>SKU Code</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        {searchTerm ? 'No active SKUs found matching your search criteria.' : 'Search for active SKUs to deactivate.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    searchResults.map((sku) => (
                      <TableRow 
                        key={sku.id}
                        selected={selectedSKU && selectedSKU.id === sku.id}
                        onClick={() => selectSKU(sku)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>{sku.code}</TableCell>
                        <TableCell>{sku.itemName}</TableCell>
                        <TableCell>{sku.category}</TableCell>
                        <TableCell>{sku.brandName}</TableCell>
                        <TableCell>
                          <IconButton 
                            color="error" 
                            onClick={(e) => {
                              e.stopPropagation();
                              selectSKU(sku);
                              openConfirmationDialog();
                            }}
                            aria-label="deactivate sku"
                          >
                            <BlockIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        
        {/* Selected SKU Details */}
        {selectedSKU && (
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Selected SKU for Deactivation
              </Typography>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {selectedSKU.code}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Item:</strong> {selectedSKU.itemName}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    <strong>Category:</strong> {selectedSKU.category}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Subcategory:</strong> {selectedSKU.subcategory}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Brand:</strong> {selectedSKU.brandName}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    <strong>Created:</strong> {new Date(selectedSKU.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Last Updated:</strong> {new Date(selectedSKU.updatedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                  variant="outlined" 
                  onClick={() => setSelectedSKU(null)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="error"
                  startIcon={<BlockIcon />}
                  onClick={openConfirmationDialog}
                >
                  Deactivate SKU
                </Button>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
      
      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Confirm Deactivation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to deactivate the SKU "{selectedSKU?.code}" ({selectedSKU?.itemName})?
            This will mark the SKU as inactive, but historical data will be retained.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDeactivate} color="error">Deactivate</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SKUDeactivation;
