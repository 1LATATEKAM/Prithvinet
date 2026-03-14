const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

/**
 * Generate White Category Industry Intimation PDF
 * @param {Object} data - Form data
 * @param {string} referenceNumber - Generated WC Reference Number
 * @returns {Promise<Uint8Array>} - PDF buffer
 */
const generateWhiteCategoryPDF = async (data, referenceNumber) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Title
  page.drawText('CHHATTISGARH ENVIRONMENT CONSERVATION BOARD', {
    x: 100,
    y: height - 50,
    size: 16,
    font: boldFont,
    color: rgb(0, 0, 0.5)
  });

  page.drawText('White Category Industry Intimation Form', {
    x: 150,
    y: height - 80,
    size: 14,
    font: boldFont
  });

  // Reference Number
  page.drawText(`Reference Number: ${referenceNumber}`, {
    x: 50,
    y: height - 120,
    size: 12,
    font: boldFont,
    color: rgb(0.8, 0, 0)
  });

  let y = height - 160;
  const drawLine = (label, value) => {
    page.drawText(`${label}:`, { x: 50, y, size: 10, font: boldFont });
    page.drawText(`${value || 'N/A'}`, { x: 250, y, size: 10, font });
    y -= 25;
  };

  // Section 1: Industry Details
  page.drawText('SECTION 1: INDUSTRY DETAILS', { x: 50, y, size: 11, font: boldFont });
  y -= 20;
  drawLine('Industry Name', data.industryName);
  drawLine('Complete Address', data.address);
  drawLine('Product Name', data.productName);
  drawLine('Production Capacity', `${data.productionCapacity} ${data.unit || ''}`);
  y -= 10;

  // Section 2: Entity Identification
  page.drawText('SECTION 2: ENTITY IDENTIFICATION', { x: 50, y, size: 11, font: boldFont });
  y -= 20;
  drawLine('Registered Entity', data.entityName);
  drawLine('Type of Entity', data.entityType);
  drawLine('Registration Number', data.registrationNumber);
  y -= 10;

  // Section 3: Legal & Statutory
  page.drawText('SECTION 3: LEGAL & STATUTORY', { x: 50, y, size: 11, font: boldFont });
  y -= 20;
  drawLine('PAN Number', data.panNumber);
  drawLine('GST Number', data.gstNumber);
  drawLine('MSME Number', data.msmeNumber);
  y -= 10;

  // Section 4: Owner Details
  page.drawText('SECTION 4: OWNER DETAILS', { x: 50, y, size: 11, font: boldFont });
  y -= 20;
  drawLine('Owner Name', data.ownerName);
  drawLine('Mobile Number', data.ownerMobile);
  y -= 10;

  // Declaration
  y -= 30;
  page.drawText('INTIMATION NOTICE:', { x: 50, y, size: 10, font: boldFont });
  y -= 15;
  page.drawText('The above proposed activity comes under WHITE CATEGORY and does not require CTE/CTO from CECB.', {
    x: 50,
    y,
    size: 9,
    font
  });

  y -= 50;
  page.drawText(`Date: ${new Date().toLocaleDateString()}`, { x: 50, y, size: 10, font });
  page.drawText(`Place: ${data.place || data.district}`, { x: 350, y, size: 10, font });

  // Official Digital Stamp
  const stampX = 450;
  const stampY = 100;
  
  // Draw circular border for stamp
  page.drawCircle({
    x: stampX + 40,
    y: stampY + 40,
    size: 45,
    borderWidth: 2,
    borderColor: rgb(0.1, 0.4, 0.8),
    opacity: 0.6
  });

  page.drawText('CECB', {
    x: stampX + 15,
    y: stampY + 50,
    size: 14,
    font: boldFont,
    color: rgb(0.1, 0.4, 0.8),
    opacity: 0.8
  });

  page.drawText('VERIFIED', {
    x: stampX + 10,
    y: stampY + 30,
    size: 10,
    font: boldFont,
    color: rgb(0.1, 0.4, 0.8),
    opacity: 0.8
  });

  page.drawText(referenceNumber.split('-').pop(), {
    x: stampX + 22,
    y: stampY + 15,
    size: 8,
    font,
    color: rgb(0.1, 0.4, 0.8),
    opacity: 0.8
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

module.exports = { generateWhiteCategoryPDF };
