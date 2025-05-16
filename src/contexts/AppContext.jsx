import React, { createContext, useState, useContext, useEffect } from 'react';
import inventoryService from '../services/inventoryService';
import skuService from '../services/skuService';
import barcodeService from '../services/barcodeService';

// Create context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  // State for branches
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  
  // State for SKUs
  const [skus, setSkus] = useState([]);
  const [filteredSkus, setFilteredSkus] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for notifications
  const [notification, setNotification] = useState({ open: false, message: '', type: 'info' });
  
  // Load initial data
  useEffect(() => {
    const loadInitialData = () => {
      const branchesData = inventoryService.getBranches();
      setBranches(branchesData);
      
      const skusData = skuService.getSKUs();
      setSkus(skusData);
      setFilteredSkus(skusData);
    };
    
    loadInitialData();
  }, []);
  
  // Branch operations
  const createBranch = (branchData) => {
    try {
      const newBranch = inventoryService.createBranch(branchData);
      setBranches([...branches, newBranch]);
      showNotification('Branch created successfully', 'success');
      return newBranch;
    } catch (error) {
      showNotification('Failed to create branch', 'error');
      return null;
    }
  };
  
  const updateBranch = (id, branchData) => {
    try {
      const updatedBranch = inventoryService.updateBranch(id, branchData);
      if (updatedBranch) {
        setBranches(branches.map(branch => branch.id === id ? updatedBranch : branch));
        showNotification('Branch updated successfully', 'success');
      }
      return updatedBranch;
    } catch (error) {
      showNotification('Failed to update branch', 'error');
      return null;
    }
  };
  
  const deleteBranch = (id) => {
    try {
      const result = inventoryService.deleteBranch(id);
      if (result) {
        setBranches(branches.filter(branch => branch.id !== id));
        showNotification('Branch deleted successfully', 'success');
      }
      return result;
    } catch (error) {
      showNotification('Failed to delete branch', 'error');
      return false;
    }
  };
  
  // SKU operations
  const createSKU = (skuData) => {
    try {
      const newSKU = skuService.createSKU(skuData);
      setSkus([...skus, newSKU]);
      setFilteredSkus([...filteredSkus, newSKU]);
      showNotification('SKU created successfully', 'success');
      return newSKU;
    } catch (error) {
      showNotification('Failed to create SKU', 'error');
      return null;
    }
  };
  
  const updateSKU = (id, skuData) => {
    try {
      const updatedSKU = skuService.updateSKU(id, skuData);
      if (updatedSKU) {
        setSkus(skus.map(sku => sku.id === id ? updatedSKU : sku));
        setFilteredSkus(filteredSkus.map(sku => sku.id === id ? updatedSKU : sku));
        showNotification('SKU updated successfully', 'success');
      }
      return updatedSKU;
    } catch (error) {
      showNotification('Failed to update SKU', 'error');
      return null;
    }
  };
  
  const deactivateSKU = (id) => {
    try {
      const deactivatedSKU = skuService.deactivateSKU(id);
      if (deactivatedSKU) {
        setSkus(skus.map(sku => sku.id === id ? deactivatedSKU : sku));
        setFilteredSkus(filteredSkus.map(sku => sku.id === id ? deactivatedSKU : sku));
        showNotification('SKU deactivated successfully', 'success');
      }
      return deactivatedSKU;
    } catch (error) {
      showNotification('Failed to deactivate SKU', 'error');
      return null;
    }
  };
  
  const searchSKUs = (term) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredSkus(skus);
    } else {
      const results = skuService.searchSKUs(term);
      setFilteredSkus(results);
    }
  };
  
  // Barcode operations
  const generateBarcode = (skuCode) => {
    try {
      return barcodeService.generateBarcode(skuCode);
    } catch (error) {
      showNotification('Failed to generate barcode', 'error');
      return null;
    }
  };
  
  const generateQRCode = (skuCode) => {
    try {
      return barcodeService.generateQRCode(skuCode);
    } catch (error) {
      showNotification('Failed to generate QR code', 'error');
      return null;
    }
  };
  
  // Notification helper
  const showNotification = (message, type = 'info') => {
    setNotification({ open: true, message, type });
    setTimeout(() => {
      setNotification({ ...notification, open: false });
    }, 3000);
  };
  
  // Context value
  const contextValue = {
    // Branch state and operations
    branches,
    selectedBranch,
    setSelectedBranch,
    createBranch,
    updateBranch,
    deleteBranch,
    
    // SKU state and operations
    skus,
    filteredSkus,
    searchTerm,
    createSKU,
    updateSKU,
    deactivateSKU,
    searchSKUs,
    
    // Barcode operations
    generateBarcode,
    generateQRCode,
    
    // Notification
    notification,
    showNotification
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
