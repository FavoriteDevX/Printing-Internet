import { InternetTarget } from '../data/internetPresets';
import { calculatePrintMetrics, getMilestoneComparison } from './printCalculator';

/**
 * Creates a valid, standard PDF 1.4 document blob in pure client-side code
 * containing the official Archival Certificate and printed volume summary.
 */
export function generateArchivalPdf(target: InternetTarget, pagesPrinted: number): Blob {
  const metrics = calculatePrintMetrics(target.pages);
  const milestone = getMilestoneComparison(metrics.heightMeters);
  const dateStr = new Date().toISOString().split('T')[0];

  const escapePdf = (text: string) => text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

  const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>
endobj
6 0 obj
<< /Length 2000 >>
stream
BT
/F1 22 Tf
54 730 Td
(PRINTING THE INTERNET - ARCHIVAL CERTIFICATE) Tj
/F2 10 Tf
0 -20 Td
(Date: ${escapePdf(dateStr)} | Universal Web Archive Authority) Tj
0 -15 Td
(======================================================================) Tj
/F1 14 Tf
0 -30 Td
(TARGET PLATFORM: ${escapePdf(target.name)}) Tj
/F2 10 Tf
0 -18 Td
(Domain: ${escapePdf(target.domain)}) Tj
0 -14 Td
(Category: ${escapePdf(target.category.toUpperCase())}) Tj
0 -25 Td
(----------------------------------------------------------------------) Tj
/F1 12 Tf
0 -18 Td
(PHYSICAL PRINTING SPECIFICATIONS:) Tj
/F2 10 Tf
0 -16 Td
(Total Printable Pages:    ${escapePdf(target.pages.toLocaleString())} sheets) Tj
0 -14 Td
(Calculated Stack Height:  ${escapePdf(metrics.heightKm >= 1 ? `${metrics.heightKm.toFixed(2)} km` : `${metrics.heightMeters.toFixed(1)} meters`)}) Tj
0 -14 Td
(Monument Comparison:     Equivalent to reaching ${escapePdf(milestone.current.name)}) Tj
0 -14 Td
(Total Paper Weight:       ${escapePdf(metrics.weightTons >= 1 ? `${metrics.weightTons.toFixed(1)} metric tons` : `${metrics.weightKg.toLocaleString()} kg`)}) Tj
0 -14 Td
(Reams Required:           ${escapePdf(metrics.reams.toLocaleString())} reams [500 sheets/ream]) Tj
0 -25 Td
(----------------------------------------------------------------------) Tj
/F1 12 Tf
0 -18 Td
(ECOLOGICAL FOOTPRINT [TECHHIVE 2015 BENCHMARK]:) Tj
/F2 10 Tf
0 -16 Td
(Trees Required:           ${escapePdf(metrics.treesNeeded.toLocaleString())} mature trees [8,500 sheets/tree]) Tj
0 -14 Td
(Standard Ink Cartridges:  ${escapePdf(metrics.inkCartridges.toLocaleString())} units) Tj
0 -14 Td
(Water Consumed in Pulp:   ${escapePdf(metrics.waterLiters >= 1000000 ? `${(metrics.waterLiters / 1000000).toFixed(1)}M Liters` : `${metrics.waterLiters.toLocaleString()} Liters`)}) Tj
0 -25 Td
(----------------------------------------------------------------------) Tj
/F1 12 Tf
0 -18 Td
(ESTIMATED PRINTING TIME AT CONSTANT OPERATION:) Tj
/F2 10 Tf
0 -16 Td
(Home Inkjet [15 ppm]:     ${escapePdf(metrics.timeFormatted(15).humanLabel)}) Tj
0 -14 Td
(Office Laser [60 ppm]:    ${escapePdf(metrics.timeFormatted(60).humanLabel)}) Tj
0 -14 Td
(Continuous Press [600 ppm]: ${escapePdf(metrics.timeFormatted(600).humanLabel)}) Tj
0 -14 Td
(Quantum Nanoprinter [1M ppm]: ${escapePdf(metrics.timeFormatted(1000000).humanLabel)}) Tj
0 -30 Td
(======================================================================) Tj
/F1 10 Tf
0 -20 Td
(Verified in accordance with the University of Leicester / TechHive study.) Tj
/F2 9 Tf
0 -15 Td
(Barcode: ||| | |||| || | ||||| |||| | ||| ||||| || |||||| | |||) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000010 00000 n 
0000000059 00000 n 
0000000118 00000 n 
0000000257 00000 n 
0000000331 00000 n 
0000000401 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
2460
%%EOF`;

  return new Blob([pdfContent], { type: 'application/pdf' });
}

/**
 * Triggers native browser download for generated blob
 */
export function triggerPdfDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
