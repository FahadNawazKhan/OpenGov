export const printReport = (reportId: string) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const reports = JSON.parse(localStorage.getItem('opengov_reports') || '[]');
  const report = reports.find((r: any) => r.id === reportId);
  
  if (!report) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Report: ${report.title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { color: #1e40af; }
          .meta { color: #666; margin: 10px 0; }
          .section { margin: 20px 0; }
          .label { font-weight: bold; }
          @media print {
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>${report.title}</h1>
        <div class="meta">Report ID: ${report.id}</div>
        <div class="meta">Status: ${report.status}</div>
        <div class="section">
          <div class="label">Category:</div>
          <div>${report.category}</div>
        </div>
        <div class="section">
          <div class="label">Location:</div>
          <div>${report.location}</div>
        </div>
        <div class="section">
          <div class="label">Description:</div>
          <div>${report.description}</div>
        </div>
        <div class="section">
          <div class="label">Reported by:</div>
          <div>${report.citizenName}</div>
        </div>
        <div class="section">
          <div class="label">Created:</div>
          <div>${new Date(report.createdAt).toLocaleString()}</div>
        </div>
        <button onclick="window.print()">Print</button>
      </body>
    </html>
  `);
  
  printWindow.document.close();
};
