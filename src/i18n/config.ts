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
      "dashboard.totalReports": "Total Reports",
      "dashboard.yourReports": "Your Reports",
      "dashboard.noReports": "No reports to display",
      "dashboard.search": "Search reports...",
      "dashboard.filter": "Filter",
      "dashboard.sort": "Sort",
      
      // Common
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.close": "Close",
      "common.loading": "Loading...",
    }
  },
  es: {
    translation: {
      "nav.home": "Inicio",
      "nav.dashboard": "Panel",
      "nav.logout": "Cerrar sesión",
      "nav.login": "Iniciar sesión",
      
      "landing.title": "OpenGov",
      "landing.subtitle": "Empoderando a los ciudadanos para reportar problemas y conectar con autoridades locales en tiempo real",
      "landing.getStarted": "Comenzar",
      "landing.learnMore": "Más información",
      
      "report.title": "Título del reporte",
      "report.category": "Categoría",
      "report.description": "Descripción",
      "report.location": "Ubicación",
      "report.submit": "Enviar reporte",
      
      "category.infrastructure": "Infraestructura",
      "category.safety": "Seguridad",
      "category.environment": "Medio ambiente",
      "category.utilities": "Servicios",
      "category.other": "Otro",
    }
  },
  fr: {
    translation: {
      "nav.home": "Accueil",
      "nav.dashboard": "Tableau de bord",
      "nav.logout": "Déconnexion",
      "nav.login": "Connexion",
      
      "landing.title": "OpenGov",
      "landing.subtitle": "Permettre aux citoyens de signaler des problèmes et de se connecter avec les autorités locales en temps réel",
      "landing.getStarted": "Commencer",
      "landing.learnMore": "En savoir plus",
      
      "report.title": "Titre du rapport",
      "report.category": "Catégorie",
      "report.description": "Description",
      "report.location": "Localisation",
      "report.submit": "Soumettre le rapport",
      
      "category.infrastructure": "Infrastructure",
      "category.safety": "Sécurité",
      "category.environment": "Environnement",
      "category.utilities": "Services publics",
      "category.other": "Autre",
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
