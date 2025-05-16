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
  InputAdornment,
  Card,
  CardContent,
  Divider,
  Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppContext } from '../../contexts/AppContext';
import { categories, brands } from '../../data/mockData';

const SKUSearch = () => {
  const { branches, filteredSkus, searchSKUs } = useAppContext();
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    brandName: '',
    branchId: '',
    isActive: ''
  });
  
  // Selected SKU for details
  const [selectedSKU, setSelectedSKU] = useState(null);
  
  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle search submit
  const handleSearch = () => {
    searchSKUs(searchTerm);
    setPage(1);
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  // Apply filters
  const applyFilters = () => {
    // Convert isActive string to boolean
    let isActiveFilter = undefined;
    if (filters.isActive === 'active') isActiveFilter = true;
    if (filters.isActive === 'inactive') isActiveFilter = false;
    
    // Search with term and apply filters
    searchSKUs(searchTerm);
    setPage(1);
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: '',
      brandName: '',
      branchId: '',
      isActive: ''
    });
    setSearchTerm('');
    searchSKUs('');
    setPage(1);
  };
  
  // View SKU details
  const viewSKUDetails = (sku) => {
    setSelectedSKU(sku);
  };
  
  // Get branch name by ID
  const getBranchName = (branchId) => {
    const branch = branches.find(b => b.id === branchId);
    return branch ? branch.name : 'Unknown';
  };
  
  // Calculate pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedSkus = filteredSkus.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredSkus.length / rowsPerPage);
  
  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        SKU Search
      </Typography>
      
      {/* Search and Filter Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search SKUs"
              placeholder="Enter SKU code, name, category..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch} edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
                sx={{ mr: 1 }}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              <Button variant="contained" onClick={handleSearch}>
                Search
              </Button>
            </Box>
          </Grid>
          
          {/* Filters */}
          {showFilters && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Filters
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    label="Category"
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Brand</InputLabel>
                  <Select
                    name="brandName"
                    value={filters.brandName}
                    onChange={handleFilterChange}
                    label="Brand"
                  >
                    <MenuItem value="">All Brands</MenuItem>
                    {brands.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Branch</InputLabel>
                  <Select
                    name="branchId"
                    value={filters.branchId}
                    onChange={handleFilterChange}
                    label="Branch"
                  >
                    <MenuItem value="">All Branches</MenuItem>
                    {branches.map((branch) => (
                      <MenuItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="isActive"
                    value={filters.isActive}
                    onChange={handleFilterChange}
                    label="Status"
                  >
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button variant="outlined" onClick={resetFilters} sx={{ mr: 1 }}>
                    Reset
                  </Button>
                  <Button variant="contained" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
      
      <Grid container spacing={4}>
        {/* Results Table */}
        <Grid item xs={12} md={selectedSKU ? 8 : 12}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>SKU Code</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedSkus.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No SKUs found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    displayedSkus.map((sku) => (
                      <TableRow key={sku.id}>
                        <TableCell>{sku.code}</TableCell>
                        <TableCell>{sku.itemName}</TableCell>
                        <TableCell>{sku.category}</TableCell>
                        <TableCell>{sku.brandName}</TableCell>
                        <TableCell>
                          <Chip 
                            label={sku.isActive ? 'Active' : 'Inactive'} 
                            color={sku.isActive ? 'success' : 'error'} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            color="primary" 
                            onClick={() => viewSKUDetails(sku)}
                            aria-label="view details"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            {/* Pagination */}
            {filteredSkus.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Pagination 
                  count={pageCount} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary" 
                />
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* SKU Details */}
        {selectedSKU && (
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                SKU Details
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
                  <Typography variant="body2">
                    <strong>Branch:</strong> {getBranchName(selectedSKU.branchId)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong>{' '}
                    <Chip 
                      label={selectedSKU.isActive ? 'Active' : 'Inactive'} 
                      color={selectedSKU.isActive ? 'success' : 'error'} 
                      size="small" 
                    />
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    <strong>Created:</strong> {new Date(selectedSKU.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Last Updated:</strong> {new Date(selectedSKU.updatedAt).toLocaleDateString()}
                  </Typography>
                  {selectedSKU.deactivatedAt && (
                    <Typography variant="body2">
                      <strong>Deactivated:</strong> {new Date(selectedSKU.deactivatedAt).toLocaleDateString()}
                    </Typography>
                  )}
                </CardContent>
              </Card>
              <Box sx={{ mt: 2 }}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => setSelectedSKU(null)}
                >
                  Close Details
                </Button>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default SKUSearch;
