import React, { useState, useRef } from "react";
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
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  FormHelperText,
} from "@mui/material";
import Barcode from "react-barcode";
import { QRCodeCanvas } from "qrcode.react";
import { useAppContext } from "../../contexts/AppContext";

const BarcodeGenerator = () => {
  const { skus, generateBarcode, generateQRCode } = useAppContext();

  const [tabValue, setTabValue] = useState(0);
  const [selectedSKU, setSelectedSKU] = useState("");
  const [generatedData, setGeneratedData] = useState(null);
  const [error, setError] = useState("");

  const barcodeRef = useRef(null);
  const qrCodeRef = useRef(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setGeneratedData(null);
  };

  const handleSKUChange = (e) => {
    setSelectedSKU(e.target.value);
    setError("");
    setGeneratedData(null);
  };

  const handleGenerate = () => {
    if (!selectedSKU) {
      setError("Please select a SKU");
      return;
    }

    const sku = skus.find((s) => s.id === selectedSKU);

    if (!sku) {
      setError("Invalid SKU selected");
      return;
    }

    if (tabValue === 0) {
      const barcodeData = generateBarcode(sku.code);
      setGeneratedData({ type: "barcode", data: sku.code, sku });
    } else {
      const qrData = generateQRCode(sku.code);
      setGeneratedData({ type: "qrcode", data: sku.code, sku });
    }
  };

  const handleDownload = () => {
    if (!generatedData) return;

    const canvas =
      tabValue === 0
        ? document.getElementById("barcode-canvas")?.querySelector("canvas")
        : document.getElementById("qrcode-canvas");

    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${generatedData.type}-${generatedData.sku.code}.png`;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    if (!generatedData) return;

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow pop-ups to print the code");
      return;
    }

    const canvas =
      tabValue === 0
        ? document.getElementById("barcode-canvas")?.querySelector("canvas")
        : document.getElementById("qrcode-canvas");

    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print ${generatedData.type} - ${generatedData.sku.code}</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              padding: 20px;
              box-sizing: border-box;
            }
            .code-container {
              text-align: center;
            }
            .sku-info {
              margin-top: 20px;
              font-family: Arial, sans-serif;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            @media print {
              button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="code-container">
            <img src="${dataUrl}" alt="${generatedData.type} for ${generatedData.sku.code}" />
            <div class="sku-info">
              <p><strong>SKU Code:</strong> ${generatedData.sku.code}</p>
              <p><strong>Item:</strong> ${generatedData.sku.itemName}</p>
              <p><strong>Category:</strong> ${generatedData.sku.category}</p>
              <p><strong>Brand:</strong> ${generatedData.sku.brandName}</p>
            </div>
          </div>
          <button onclick="window.print(); setTimeout(() => window.close(), 500);" style="margin-top: 20px; padding: 10px 20px;">
            Print
          </button>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Barcode/QR Code Generator
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Barcode Generator" />
          <Tab label="QR Code Generator" />
        </Tabs>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!error}>
              <InputLabel>Select SKU</InputLabel>
              <Select
                value={selectedSKU}
                onChange={handleSKUChange}
                label="Select SKU"
              >
                <MenuItem value="">
                  <em>Select a SKU</em>
                </MenuItem>
                {skus
                  .filter((sku) => sku.isActive)
                  .map((sku) => (
                    <MenuItem key={sku.id} value={sku.id}>
                      {sku.code} - {sku.itemName}
                    </MenuItem>
                  ))}
              </Select>
              {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleGenerate}
              sx={{ height: "56px" }}
            >
              Generate {tabValue === 0 ? "Barcode" : "QR Code"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {generatedData && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Generated {tabValue === 0 ? "Barcode" : "QR Code"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 3,
                  bgcolor: "#fff",
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                }}
              >
                {tabValue === 0 ? (
                  <div id="barcode-canvas" ref={barcodeRef}>
                    <Barcode
                      value={generatedData.data}
                      width={1.5}
                      height={80}
                      fontSize={14}
                    />
                  </div>
                ) : (
                  <div id="qrcode-canvas">
                    <QRCodeCanvas
                      value={generatedData.data}
                      size={200}
                      level="H"
                      ref={qrCodeRef}
                    />
                  </div>
                )}
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Button variant="outlined" onClick={handleDownload}>
                  Download
                </Button>
                <Button variant="contained" onClick={handlePrint}>
                  Print
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                SKU Details
              </Typography>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {generatedData.sku.code}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Item:</strong> {generatedData.sku.itemName}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    <strong>Category:</strong> {generatedData.sku.category}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Subcategory:</strong>{" "}
                    {generatedData.sku.subcategory}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Brand:</strong> {generatedData.sku.brandName}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    <strong>Created:</strong>{" "}
                    {new Date(generatedData.sku.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Last Updated:</strong>{" "}
                    {new Date(generatedData.sku.updatedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BarcodeGenerator;
