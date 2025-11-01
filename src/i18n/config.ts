import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.dashboard": "Dashboard",
      "nav.logout": "Logout",
      "nav.login": "Login",
      "nav.community": "Community",
      "nav.citizenPortal": "Citizen Portal",
      "nav.authorityPortal": "Authority Portal",
      
      // Landing Page
      "landing.title": "OpenGov",
      "landing.subtitle": "Empowering citizens to report issues and connect with local authorities in real-time",
      "landing.getStarted": "Get Started",
      "landing.learnMore": "Learn More",
      
      // Features
      "features.reportIssues": "Report Issues",
      "features.reportDesc": "Citizens can easily report local issues like potholes, broken streetlights, or safety concerns with precise location data.",
      "features.realtime": "Real-Time Updates",
      "features.realtimeDesc": "Track your reports in real-time. Get instant notifications when authorities review or resolve your submissions.",
      "features.authority": "Authority Dashboard",
      "features.authorityDesc": "Local authorities can efficiently manage, assign, and resolve citizen reports through a dedicated dashboard.",
      
      // Auth
      "auth.login": "Login",
      "auth.signup": "Sign Up",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.name": "Full Name",
      "auth.citizen": "Citizen",
      "auth.authority": "Authority",
      "auth.iAm": "I am a:",

      "auth.loginSubtitle": "Login to your account",
      "auth.signupSubtitle": "Create an account",
      "auth.dontHaveAccount": "Don't have an account?",
      "auth.alreadyHaveAccount": "Already have an account?",
      
      // Reports
      "report.title": "Report Title",
      "report.category": "Category",
      "report.description": "Description",
      "report.location": "Location",
      "report.submit": "Submit Report",
      "report.status": "Status",
      "report.pending": "Pending",
      "report.inProgress": "In Progress",
      "report.resolved": "Resolved",
      "report.rejected": "Rejected",
      
      // Categories
      "category.infrastructure": "Infrastructure",
      "category.safety": "Safety",
      "category.environment": "Environment",
      "category.utilities": "Utilities",
      "category.other": "Other",
      
      // Dashboard
      "dashboard.welcome": "Welcome, {{name}}!",
      "dashboard.welcomeSubtitle": "Track your reports and make your community better",
      "dashboard.totalReports": "Total Reports",
      "dashboard.yourReports": "Your Reports",
      "dashboard.noReports": "No reports to display",
      "dashboard.search": "Search reports...",
      "dashboard.filter": "Filter",
      "dashboard.sort": "Sort",

      // Authority Dashboard
      "authorityDashboard.title": "Authority Command Center",
      "authorityDashboard.welcome": "Welcome back, {{name}} 👋",
      "authorityDashboard.exportReports": "Export Reports",
      "authorityDashboard.totalReports": "Total Reports",
      "authorityDashboard.allTimeSubmissions": "All time submissions",
      "authorityDashboard.needsAttention": "Needs Attention",
      "authorityDashboard.pendingReview": "Pending review",
      "authorityDashboard.activeWork": "Active Work",
      "authorityDashboard.inProgress": "In progress",
      "authorityDashboard.completed": "Completed",
      "authorityDashboard.successfullyResolved": "Successfully resolved",
      "authorityDashboard.searchPlaceholder": "Search reports by title, description, or location...",
      "authorityDashboard.filterByStatus": "Filter by status",
      "authorityDashboard.allStatuses": "All Statuses",
      "authorityDashboard.filterByCategory": "Filter by category",
      "authorityDashboard.allCategories": "All Categories",
      "authorityDashboard.showingReports": "Showing {{count}} of {{total}} reports",
      "authorityDashboard.reports": "Reports",
      "authorityDashboard.analytics": "Analytics",
      "authorityDashboard.mapView": "Map View",
      "authorityDashboard.noReports": "No reports match your filters",
      "authorityDashboard.viewDetails": "View Details",
      "authorityDashboard.startWork": "Start Work",
      "authorityDashboard.resolve": "Resolve",
      "authorityDashboard.reject": "Reject",
      "authorityDashboard.reportedBy": "Reported By",
      "authorityDashboard.submitted": "Submitted",
      "authorityDashboard.assignedTo": "Assigned To",
      "authorityDashboard.evidencePhotos": "Evidence Photos ({{count}})",
      "authorityDashboard.internalNotes": "Internal Notes",
      "authorityDashboard.internalNotesPlaceholder": "Add internal note (visible only to authorities)...",
      "authorityDashboard.addNote": "Add Note",
      
      // Common
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.close": "Close",
      "common.loading": "Loading...",
      "common.error": "Error",

      // Report Form
      "reportForm.editTitle": "Edit Report",
      "reportForm.newTitle": "Submit New Report",
      "reportForm.titlePlaceholder": "e.g., Broken streetlight on Main Street",
      "reportForm.descriptionPlaceholder": "Provide detailed information about the issue...",
      "reportForm.enterAddress": "Enter Address",
      "reportForm.pickOnMap": "Pick on Map",
      "reportForm.locationPlaceholder": "e.g., 123 Main Street, City",
      "reportForm.locationHelpText": "Be as specific as possible to help authorities locate the issue",
      "reportForm.selectedLocation": "Selected: {{location}}",
      "reportForm.uploadPhotos": "Upload Photos (Optional)",
      "reportForm.uploadPhotosHelpText": "Add photos to help authorities understand the issue better",
      "reportForm.makePublic": "Make this report public",
      "reportForm.saving": "Saving...",
      "reportForm.submitting": "Submitting...",
      "reportForm.saveChanges": "Save Changes",
      "reportForm.updateSuccessTitle": "Report Updated!",
      "reportForm.updateSuccessDescription": "Your report has been updated successfully.",
      "reportForm.submitSuccessTitle": "Report Submitted!",
      "reportForm.submitSuccessDescription": "Your report has been submitted successfully.",
      "reportForm.updateError": "Failed to update report. Please try again.",
      "reportForm.submitError": "Failed to submit report. Please try again."
    }
  },
  hi: {
    translation: {
      "nav.home": "होम",
      "nav.dashboard": "डैशबोर्ड",
      "nav.logout": "लॉग आउट",
      "nav.login": "लॉग इन करें",
      "nav.community": "समुदाय",
      "nav.citizenPortal": "नागरिक पोर्टल",
      "nav.authorityPortal": "प्राधिकरण पोर्टल",
      
      "landing.title": "ओपनगव",
      "landing.subtitle": "नागरिकों को समस्याओं की रिपोर्ट करने और वास्तविक समय में स्थानीय अधिकारियों से जुड़ने के लिए सशक्त बनाना",
      "landing.getStarted": "शुरू हो जाओ",
      "landing.learnMore": " और जानें",

      "auth.login": "लॉग इन करें",
      "auth.signup": "साइन अप करें",
      "auth.email": "ईमेल",
      "auth.password": "पासवर्ड",
      "auth.name": "पूरा नाम",
      "auth.citizen": "नागरिक",
      "auth.authority": "प्राधिकरण",
      "auth.iAm": "मैं एक हूँ:",
      "auth.loginSubtitle": "अपने खाते में प्रवेश करें",
      "auth.signupSubtitle": "एक खाता बनाएं",
      "auth.dontHaveAccount": "खाता नहीं है?",
      "auth.alreadyHaveAccount": "पहले से ही एक खाता है?",

      "common.error": "त्रुटि",

      // Report Form
      "reportForm.editTitle": "रिपोर्ट संपादित करें",
      "reportForm.newTitle": "नई रिपोर्ट सबमिट करें",
      "reportForm.titlePlaceholder": "उदा., मुख्य सड़क पर टूटी स्ट्रीटलाइट",
      "reportForm.descriptionPlaceholder": "समस्या के बारे में विस्तृत जानकारी प्रदान करें...",
      "reportForm.enterAddress": "पता दर्ज करें",
      "reportForm.pickOnMap": "मानचित्र पर चुनें",
      "reportForm.locationPlaceholder": "उदा., 123 मुख्य सड़क, शहर",
      "reportForm.locationHelpText": "अधिकारियों को समस्या का पता लगाने में मदद करने के लिए यथासंभव विशिष्ट रहें",
      "reportForm.selectedLocation": "चयनित: {{location}}",
      "reportForm.uploadPhotos": "तस्वीरें अपलोड करें (वैकल्पिक)",
      "reportForm.uploadPhotosHelpText": "अधिकारियों को समस्या को बेहतर ढंग से समझने में मदद करने के लिए तस्वीरें जोड़ें",
      "reportForm.makePublic": "इस रिपोर्ट को सार्वजनिक करें",
      "reportForm.saving": "सहेज रहा है...",
      "reportForm.submitting": "सबमिट कर रहा है...",
      "reportForm.saveChanges": "परिवर्तनों को सहेजें",
      "reportForm.updateSuccessTitle": "रिपोर्ट अपडेट की गई!",
      "reportForm.updateSuccessDescription": "आपकी रिपोर्ट सफलतापूर्वक अपडेट कर दी गई है।",
      "reportForm.submitSuccessTitle": "रिपोर्ट सबमिट की गई!",
      "reportForm.submitSuccessDescription": "आपकी रिपोर्ट सफलतापूर्वक सबमिट कर दी गई है।",
      "reportForm.updateError": "रिपोर्ट अपडेट करने में विफल। कृपया पुन प्रयास करें।",
      "reportForm.submitError": "रिपोर्ट सबमिट करने में विफल। कृपया पुन प्रयास करें।",
      
      "report.title": "रिपोर्ट का शीर्षक",
      "report.category": "श्रेणी",
      "report.description": "विवरण",
      "report.location": "स्थान",
      "report.submit": "रिपोर्ट सबमिट करें",
      
      "category.infrastructure": "आधारभूत संरचना",
      "category.safety": "सुरक्षा",
      "category.environment": "वातावरण",
      "category.utilities": "उपयोगिताएँ",
      "category.other": "अन्य",

      "dashboard.welcome": "नमस्ते, {{name}}!",
      "dashboard.welcomeSubtitle": "अपनी रिपोर्ट ट्रैक करें और अपने समुदाय को बेहतर बनाएं",
      "dashboard.totalReports": "कुल रिपोर्ट",

      // Authority Dashboard
      "authorityDashboard.title": "प्राधिकरण कमांड सेंटर",
      "authorityDashboard.welcome": "वापस स्वागत है, {{name}} 👋",
      "authorityDashboard.exportReports": "रिपोर्ट निर्यात करें",
      "authorityDashboard.totalReports": "कुल रिपोर्ट",
      "authorityDashboard.allTimeSubmissions": "सभी समय प्रस्तुतियाँ",
      "authorityDashboard.needsAttention": "ध्यान देने की आवश्यकता है",
      "authorityDashboard.pendingReview": "समीक्षा लंबित है",
      "authorityDashboard.activeWork": "सक्रिय कार्य",
      "authorityDashboard.inProgress": "कार्य प्रगति पर है",
      "authorityDashboard.completed": "पूरा हुआ",
      "authorityDashboard.successfullyResolved": "सफलतापूर्वक हल किया गया",
      "authorityDashboard.searchPlaceholder": "शीर्षक, विवरण या स्थान के आधार पर रिपोर्ट खोजें...",
      "authorityDashboard.filterByStatus": "स्थिति के अनुसार फ़िल्टर करें",
      "authorityDashboard.allStatuses": "सभी स्थितियाँ",
      "authorityDashboard.filterByCategory": "श्रेणी के अनुसार फ़िल्टर करें",
      "authorityDashboard.allCategories": "सभी श्रेणियाँ",
      "authorityDashboard.showingReports": "{{total}} में से {{count}} रिपोर्ट दिखा रहा है",
      "authorityDashboard.reports": "रिपोर्ट",
      "authorityDashboard.analytics": "विश्लेषिकी",
      "authorityDashboard.mapView": "मानचित्र दृश्य",
      "authorityDashboard.noReports": "कोई रिपोर्ट आपके फ़िल्टर से मेल नहीं खाती",
      "authorityDashboard.viewDetails": "विवरण देखें",
      "authorityDashboard.startWork": "काम शुरू करें",
      "authorityDashboard.resolve": "हल करें",
      "authorityDashboard.reject": "अस्वीकार करें",
      "authorityDashboard.reportedBy": "द्वारा रिपोर्ट किया गया",
      "authorityDashboard.submitted": "प्रस्तुत",
      "authorityDashboard.assignedTo": "को सौंपा गया",
      "authorityDashboard.evidencePhotos": "सबूत तस्वीरें ({{count}})",
      "authorityDashboard.internalNotes": "आंतरिक नोट्स",
      "authorityDashboard.internalNotesPlaceholder": "आंतरिक नोट जोड़ें (केवल अधिकारियों को दिखाई देता है)...",
      "authorityDashboard.addNote": "नोट जोड़ें",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('opengov_language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
