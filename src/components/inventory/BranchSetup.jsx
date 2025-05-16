import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppContext } from '../../contexts/AppContext';

const BranchSetup = () => {
  const { branches, createBranch, updateBranch, deleteBranch } = useAppContext();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contactDetails: {
      phone: '',
      email: '',
      address: ''
    }
  });
  
  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [currentBranchId, setCurrentBranchId] = useState(null);
  
  // Delete confirmation dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      updateBranch(currentBranchId, formData);
      setEditMode(false);
      setCurrentBranchId(null);
    } else {
      createBranch(formData);
    }
    
    // Reset form
    setFormData({
      name: '',
      location: '',
      contactDetails: {
        phone: '',
        email: '',
        address: ''
      }
    });
  };
  
  // Handle edit branch
  const handleEdit = (branch) => {
    setFormData({
      name: branch.name,
      location: branch.location,
      contactDetails: {
        phone: branch.contactDetails.phone,
        email: branch.contactDetails.email,
        address: branch.contactDetails.address
      }
    });
    setEditMode(true);
    setCurrentBranchId(branch.id);
  };
  
  // Handle delete branch
  const handleDelete = (branch) => {
    setBranchToDelete(branch);
    setOpenDeleteDialog(true);
  };
  
  // Confirm delete
  const confirmDelete = () => {
    if (branchToDelete) {
      deleteBranch(branchToDelete.id);
    }
    setOpenDeleteDialog(false);
    setBranchToDelete(null);
  };
  
  // Cancel form
  const handleCancel = () => {
    setFormData({
      name: '',
      location: '',
      contactDetails: {
        phone: '',
        email: '',
        address: ''
      }
    });
    setEditMode(false);
    setCurrentBranchId(null);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inventory Branch Setup
      </Typography>
      
      {/* Branch Form */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {editMode ? 'Edit Branch' : 'Create New Branch'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Branch Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="contactDetails.phone"
                value={formData.contactDetails.phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="contactDetails.email"
                type="email"
                value={formData.contactDetails.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="contactDetails.address"
                multiline
                rows={2}
                value={formData.contactDetails.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                {editMode && (
                  <Button variant="outlined" onClick={handleCancel}>
                    Cancel
                  </Button>
                )}
                <Button type="submit" variant="contained">
                  {editMode ? 'Update Branch' : 'Create Branch'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      {/* Branches List */}
      <Typography variant="h6" gutterBottom>
        Existing Branches
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Branch Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Contact Phone</TableCell>
              <TableCell>Contact Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No branches found. Create your first branch above.
                </TableCell>
              </TableRow>
            ) : (
              branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.location}</TableCell>
                  <TableCell>{branch.contactDetails.phone}</TableCell>
                  <TableCell>{branch.contactDetails.email}</TableCell>
                  <TableCell>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEdit(branch)}
                      aria-label="edit branch"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(branch)}
                      aria-label="delete branch"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the branch "{branchToDelete?.name}"? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BranchSetup;
