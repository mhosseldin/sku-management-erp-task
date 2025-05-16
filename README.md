# SKU Management Application

A responsive web application for managing SKUs (Stock Keeping Units) built with Vite and React.

## Features

This application implements five core SKU management functions:

1. **Inventory Branch Setup SDK**
   - Create and manage different inventory branches
   - Track branch details including name, location, and contact information

2. **SKU Creation Library**
   - Create and assign unique SKUs for inventory items
   - Support for auto-generated or manual SKU codes
   - Categorize items by category, subcategory, and brand

3. **SKU Search Library**
   - Search inventory items by SKU code, name, or category
   - Advanced filtering options
   - Detailed view of SKU information

4. **SKU Deactivation Library**
   - Mark SKUs as inactive while retaining historical data
   - Confirmation workflow to prevent accidental deactivation

5. **Barcode/QR Code Integration SDK**
   - Generate barcodes and QR codes for SKUs
   - Download and print options for generated codes

## Technology Stack

- **Frontend Framework**: React with Vite
- **UI Components**: Material UI
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Barcode Generation**: react-barcode and qrcode.react
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173/

### Building for Production

To create a production build:

```bash
npm run build
```

## Project Structure

```
sku-management-app/
├── public/               # Static assets
├── src/
│   ├── assets/           # Application assets
│   ├── components/       # React components
│   │   ├── common/       # Shared components
│   │   ├── inventory/    # Inventory branch components
│   │   ├── sku/          # SKU management components
│   │   └── barcode/      # Barcode/QR code components
│   ├── contexts/         # React contexts
│   ├── data/             # Mock data
│   ├── services/         # Service layer
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── index.html            # HTML template
├── package.json          # Project dependencies
└── vite.config.js        # Vite configuration
```

## Usage

### Inventory Branch Setup

1. Navigate to the "Branch Setup" page
2. Fill in the branch details (name, location, contact information)
3. Click "Create Branch" to add a new branch
4. Existing branches can be edited or deleted

### SKU Creation

1. Navigate to the "SKU Creation" page
2. Select a branch and fill in the item details
3. Choose auto-generate or manual SKU code
4. Preview the SKU before creation
5. Click "Create SKU" to add the new SKU

### SKU Search

1. Navigate to the "SKU Search" page
2. Enter search terms or use the advanced filters
3. View the search results in the table
4. Click on a SKU to view detailed information

### SKU Deactivation

1. Navigate to the "SKU Deactivation" page
2. Search for the SKU to deactivate
3. Select the SKU and review its details
4. Confirm deactivation

### Barcode/QR Code Generation

1. Navigate to the "Barcode Generator" page
2. Select a SKU from the dropdown
3. Choose between barcode or QR code generation
4. Generate the code
5. Download or print the generated code

## Mock Data

The application uses mock data to simulate a backend. In a production environment, these services would connect to a real backend API.
