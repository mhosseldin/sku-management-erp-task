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
  FormHelperText,
  Card,
  CardContent,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import { useAppContext } from '../../contexts/AppContext';
import { categories, brands } from '../../data/mockData';

const SKUCreation = () => {
  const { branches, createSKU } = useAppContext();
  
  // Form state
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    subcategory: '',
    brandName: '',
    branchId: '',
    code: '',
    autoGenerateCode: true
  });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  
  // Preview state
  const [previewSKU, setPreviewSKU] = useState(null);
  
  // Get subcategories based on selected category
  const getSubcategories = () => {
    const category = categories.find(cat => cat.name === formData.category);
    return category ? category.subcategories : [];
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Handle auto-generate toggle
  const handleAutoGenerateToggle = (e) => {
    setFormData({
      ...formData,
      autoGenerateCode: e.target.checked,
      code: e.target.checked ? '' : formData.code
    });
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.subcategory) {
      newErrors.subcategory = 'Subcategory is required';
    }
    
    if (!formData.brandName) {
      newErrors.brandName = 'Brand name is required';
    }
    
    if (!formData.branchId) {
      newErrors.branchId = 'Branch is required';
    }
    
    if (!formData.autoGenerateCode && !formData.code.trim()) {
      newErrors.code = 'SKU code is required when auto-generate is off';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Generate preview
  const handlePreview = () => {
    if (validateForm()) {
      // Create a preview SKU object
      const preview = {
        id: 'preview-id',
        code: formData.autoGenerateCode ? generateSKUCode() : formData.code,
        itemName: formData.itemName,
        category: formData.category,
        subcategory: formData.subcategory,
        brandName: formData.brandName,
        branchId: formData.branchId,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deactivatedAt: null
      };
      
      setPreviewSKU(preview);
    }
  };
  
  // Generate SKU code based on form data
  const generateSKUCode = () => {
    const categoryPrefix = formData.category.substring(0, 2).toUpperCase();
    const subcategoryPrefix = formData.subcategory.substring(0, 2).toUpperCase();
    const brandSuffix = formData.brandName.substring(0, 3).toUpperCase();
    
    // Generate a random 2-digit number
    const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    
    return `${categoryPrefix}-${subcategoryPrefix}-${randomNum}-${brandSuffix}`;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const skuData = {
        ...formData,
        code: formData.autoGenerateCode ? generateSKUCode() : formData.code
      };
      
      // Remove autoGenerateCode as it's not part of the SKU model
      delete skuData.autoGenerateCode;
      
      createSKU(skuData);
      
      // Reset form
      setFormData({
        itemName: '',
        category: '',
        subcategory: '',
        brandName: '',
        branchId: '',
        code: '',
        autoGenerateCode: true
      });
      
      setPreviewSKU(null);
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        SKU Creation
      </Typography>
      
      <Grid container spacing={4}>
        {/* SKU Form */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Create New SKU
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Item Name"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    error={!!errors.itemName}
                    helperText={errors.itemName}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required error={!!errors.category}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      label="Category"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required error={!!errors.subcategory} disabled={!formData.category}>
                    <InputLabel>Subcategory</InputLabel>
                    <Select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleInputChange}
                      label="Subcategory"
                    >
                      {getSubcategories().map((subcategory) => (
                        <MenuItem key={subcategory} value={subcategory}>
                          {subcategory}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.subcategory && <FormHelperText>{errors.subcategory}</FormHelperText>}
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required error={!!errors.brandName}>
                    <InputLabel>Brand</InputLabel>
                    <Select
                      name="brandName"
                      value={formData.brandName}
                      onChange={handleInputChange}
                      label="Brand"
                    >
                      {brands.map((brand) => (
                        <MenuItem key={brand} value={brand}>
                          {brand}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.brandName && <FormHelperText>{errors.brandName}</FormHelperText>}
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required error={!!errors.branchId}>
                    <InputLabel>Branch</InputLabel>
                    <Select
                      name="branchId"
                      value={formData.branchId}
                      onChange={handleInputChange}
                      label="Branch"
                    >
                      {branches.map((branch) => (
                        <MenuItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.branchId && <FormHelperText>{errors.branchId}</FormHelperText>}
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.autoGenerateCode}
                        onChange={handleAutoGenerateToggle}
                        name="autoGenerateCode"
                        color="primary"
                      />
                    }
                    label="Auto-generate SKU Code"
                  />
                </Grid>
                
                {!formData.autoGenerateCode && (
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="SKU Code"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      error={!!errors.code}
                      helperText={errors.code || "Enter a unique SKU code"}
                    />
                  </Grid>
                )}
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" onClick={handlePreview}>
                      Preview
                    </Button>
                    <Button type="submit" variant="contained">
                      Create SKU
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        
        {/* Preview Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              SKU Preview
            </Typography>
            
            {previewSKU ? (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {previewSKU.code}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Item:</strong> {previewSKU.itemName}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    <strong>Category:</strong> {previewSKU.category}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Subcategory:</strong> {previewSKU.subcategory}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Brand:</strong> {previewSKU.brandName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Branch:</strong> {branches.find(b => b.id === previewSKU.branchId)?.name}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <Typography variant="body1" color="text.secondary">
                  Fill the form and click Preview to see the SKU details
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SKUCreation;
