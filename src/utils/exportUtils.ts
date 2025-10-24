import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Report } from '@/types';

export const exportToPDF = (reports: Report[], filename: string = 'reports.pdf') => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('OpenGov Reports', 14, 20);
  
  const tableData = reports.map(report => [
    report.title,
    report.category,
    report.status,
    report.location,
    new Date(report.createdAt).toLocaleDateString()
  ]);

  autoTable(doc, {
    head: [['Title', 'Category', 'Status', 'Location', 'Date']],
    body: tableData,
    startY: 30,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246] }
  });

  doc.save(filename);
};

export const exportToCSV = (reports: Report[], filename: string = 'reports.csv') => {
  const headers = ['Title', 'Category', 'Status', 'Location', 'Citizen', 'Created At', 'Updated At'];
  
  const rows = reports.map(report => [
    report.title,
    report.category,
    report.status,
    report.location,
    report.citizenName,
    report.createdAt,
    report.updatedAt
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
