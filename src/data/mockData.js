// Mock data for SKU Management Application

// Mock Branches
export const mockBranches = [
  {
    id: "branch-001",
    name: "Main Warehouse",
    location: "New York",
    contactDetails: {
      phone: "212-555-1234",
      email: "main@example.com",
      address: "123 Main St, New York, NY 10001"
    },
    createdAt: "2025-01-15T08:30:00Z",
    updatedAt: "2025-01-15T08:30:00Z"
  },
  {
    id: "branch-002",
    name: "West Coast Distribution",
    location: "Los Angeles",
    contactDetails: {
      phone: "310-555-6789",
      email: "westcoast@example.com",
      address: "456 Ocean Ave, Los Angeles, CA 90001"
    },
    createdAt: "2025-01-20T10:15:00Z",
    updatedAt: "2025-01-20T10:15:00Z"
  },
  {
    id: "branch-003",
    name: "Midwest Fulfillment",
    location: "Chicago",
    contactDetails: {
      phone: "312-555-4321",
      email: "midwest@example.com",
      address: "789 Lake St, Chicago, IL 60007"
    },
    createdAt: "2025-02-05T14:45:00Z",
    updatedAt: "2025-02-05T14:45:00Z"
  }
];

// Mock SKUs
export const mockSKUs = [
  {
    id: "sku-001",
    code: "EL-TV-55-SAM",
    itemName: "55-inch Smart TV",
    category: "Electronics",
    subcategory: "Televisions",
    brandName: "Samsung",
    branchId: "branch-001",
    isActive: true,
    barcode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    createdAt: "2025-02-10T14:25:00Z",
    updatedAt: "2025-02-10T14:25:00Z",
    deactivatedAt: null
  },
  {
    id: "sku-002",
    code: "AP-LP-13-APP",
    itemName: "13-inch Laptop",
    category: "Computers",
    subcategory: "Laptops",
    brandName: "Apple",
    branchId: "branch-001",
    isActive: true,
    barcode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    createdAt: "2025-02-12T09:30:00Z",
    updatedAt: "2025-02-12T09:30:00Z",
    deactivatedAt: null
  },
  {
    id: "sku-003",
    code: "HM-CH-WD-IKE",
    itemName: "Wooden Dining Chair",
    category: "Furniture",
    subcategory: "Chairs",
    brandName: "IKEA",
    branchId: "branch-002",
    isActive: true,
    barcode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    createdAt: "2025-02-15T11:45:00Z",
    updatedAt: "2025-02-15T11:45:00Z",
    deactivatedAt: null
  },
  {
    id: "sku-004",
    code: "CL-SH-42-NIK",
    itemName: "Running Shoes Size 42",
    category: "Clothing",
    subcategory: "Footwear",
    brandName: "Nike",
    branchId: "branch-003",
    isActive: false,
    barcode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    createdAt: "2025-02-20T16:20:00Z",
    updatedAt: "2025-03-15T10:10:00Z",
    deactivatedAt: "2025-03-15T10:10:00Z"
  },
  {
    id: "sku-005",
    code: "KT-BL-SS-KTC",
    itemName: "Stainless Steel Blender",
    category: "Kitchen",
    subcategory: "Appliances",
    brandName: "KitchenAid",
    branchId: "branch-001",
    isActive: true,
    barcode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    createdAt: "2025-02-25T13:15:00Z",
    updatedAt: "2025-02-25T13:15:00Z",
    deactivatedAt: null
  }
];

// Categories and Subcategories
export const categories = [
  {
    id: "cat-001",
    name: "Electronics",
    subcategories: ["Televisions", "Audio", "Cameras", "Accessories"]
  },
  {
    id: "cat-002",
    name: "Computers",
    subcategories: ["Laptops", "Desktops", "Tablets", "Accessories"]
  },
  {
    id: "cat-003",
    name: "Furniture",
    subcategories: ["Chairs", "Tables", "Sofas", "Beds", "Storage"]
  },
  {
    id: "cat-004",
    name: "Clothing",
    subcategories: ["Shirts", "Pants", "Dresses", "Footwear", "Accessories"]
  },
  {
    id: "cat-005",
    name: "Kitchen",
    subcategories: ["Appliances", "Cookware", "Utensils", "Dinnerware"]
  }
];

// Brands
export const brands = [
  "Samsung", "Apple", "IKEA", "Nike", "KitchenAid", "Sony", "Dell", "H&M", "Bosch", "LG"
];
