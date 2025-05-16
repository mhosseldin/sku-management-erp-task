// Inventory Service for Branch Setup SDK
import { mockBranches } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage to simulate database
let branches = [...mockBranches];

const inventoryService = {
  // Create a new inventory branch
  createBranch: (branchData) => {
    const newBranch = {
      id: `branch-${uuidv4().substring(0, 8)}`,
      name: branchData.name,
      location: branchData.location,
      contactDetails: {
        phone: branchData.contactDetails.phone,
        email: branchData.contactDetails.email,
        address: branchData.contactDetails.address
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    branches.push(newBranch);
    return newBranch;
  },
  
  // Get all branches
  getBranches: () => {
    return [...branches];
  },
  
  // Get branch by ID
  getBranchById: (id) => {
    return branches.find(branch => branch.id === id);
  },
  
  // Update branch details
  updateBranch: (id, branchData) => {
    const index = branches.findIndex(branch => branch.id === id);
    if (index === -1) return null;
    
    const updatedBranch = {
      ...branches[index],
      name: branchData.name || branches[index].name,
      location: branchData.location || branches[index].location,
      contactDetails: {
        phone: branchData.contactDetails?.phone || branches[index].contactDetails.phone,
        email: branchData.contactDetails?.email || branches[index].contactDetails.email,
        address: branchData.contactDetails?.address || branches[index].contactDetails.address
      },
      updatedAt: new Date().toISOString()
    };
    
    branches[index] = updatedBranch;
    return updatedBranch;
  },
  
  // Delete a branch (soft delete in a real application)
  deleteBranch: (id) => {
    const index = branches.findIndex(branch => branch.id === id);
    if (index === -1) return false;
    
    branches = branches.filter(branch => branch.id !== id);
    return true;
  }
};

export default inventoryService;
