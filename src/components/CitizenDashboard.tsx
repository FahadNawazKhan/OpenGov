
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Report } from '@/types';
import { Plus, MapPin, Clock, CheckCircle, XCircle, Loader, Camera, Map, Pencil, MessageSquare } from 'lucide-react';
import ReportForm from './ReportForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReportsMap from './ReportsMap';
import Leaderboard from './Leaderboard';
import CommentsSection from './CommentsSection';
import { useLanguage } from '@/contexts/LanguageContext';

const CitizenDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [reports, setReports] = useState<Report[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [reportToEdit, setReportToEdit] = useState<Report | undefined>();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [visibleComments, setVisibleComments] = useState<string[]>([]);

  useEffect(() => {
    loadReports();
  }, [user]);

  const loadReports = () => {
    const allReports = JSON.parse(localStorage.getItem('opengov_reports') || '[]');
    const userReports = allReports.filter((r: Report) => r.citizenId === user?.id);
    setReports(userReports);
  };

  const handleEdit = (report: Report) => {
    setReportToEdit(report);
    setShowForm(true);
  }

  const toggleComments = (reportId: string) => {
    setVisibleComments(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId) 
        : [...prev, reportId]
    );
  };

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in_progress':
        return <Loader className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-accent text-accent-foreground';
      case 'in_progress':
        return 'bg-primary text-primary-foreground';
      case 'resolved':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
    }
  };

  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => {
            setShowForm(false);
            setReportToEdit(undefined);
            loadReports();
          }}
          className="mb-4"
        >
          ← Back to Dashboard
        </Button>
        <ReportForm 
          onSuccess={() => {
            setShowForm(false);
            setReportToEdit(undefined);
            loadReports();
          }} 
          reportToEdit={reportToEdit} 
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 gradient-text">{t('dashboard.welcome', { name: user?.name })}</h1>
        <p className="text-muted-foreground text-lg">{t('dashboard.welcomeSubtitle')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 bg-gradient-to-br from-cyber/20 to-cyber/5 hover-scale cursor-pointer border-cyber/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-cyber">{reports.length}</div>
            <div className="p-3 rounded-full bg-cyber/20">
              <MapPin className="w-6 h-6 text-cyber" />
            </div>
          </div>
          <div className="text-sm font-medium">{t('dashboard.totalReports')}</div>
          <div className="text-xs text-muted-foreground mt-1">All submissions</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-neon/20 to-neon/5 hover-scale cursor-pointer border-neon/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-neon">{reports.filter(r => r.status === 'pending').length}</div>
            <div className="p-3 rounded-full bg-neon/20">
              <Clock className="w-6 h-6 text-neon animate-pulse" />
            </div>
          </div>
          <div className="text-sm font-medium">Pending</div>
          <div className="text-xs text-muted-foreground mt-1">Awaiting review</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-electric/20 to-electric/5 hover-scale cursor-pointer border-electric/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-electric">{reports.filter(r => r.status === 'in_progress').length}</div>
            <div className="p-3 rounded-full bg-electric/20">
              <Loader className="w-6 h-6 text-electric" />
            </div>
          </div>
          <div className="text-sm font-medium">In Progress</div>
          <div className="text-xs text-muted-foreground mt-1">Being resolved</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-success/20 to-success/5 hover-scale cursor-pointer border-success/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-success">{reports.filter(r => r.status === 'resolved').length}</div>
            <div className="p-3 rounded-full bg-success/20">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
          </div>
          <div className="text-sm font-medium">Resolved</div>
          <div className="text-xs text-muted-foreground mt-1">Completed</div>
        </Card>
      </div>

      {/* New Report Button */}
      <Button
        onClick={() => setShowForm(true)}
        className="mb-6 bg-gradient-to-r from-cyber to-electric text-white hover:opacity-90 shadow-lg hover-scale"
        size="lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Submit New Report
      </Button>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Reports */}
        <div className="lg:col-span-2">
          {/* Reports Section */}
          <Tabs defaultValue="list" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold gradient-text">Your Reports</h2>
              <TabsList>
                <TabsTrigger value="list" className="gap-2">
                  <Clock className="w-4 h-4" />
                  List View
                </TabsTrigger>
                <TabsTrigger value="map" className="gap-2">
                  <Map className="w-4 h-4" />
                  Map View
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="list" className="space-y-4">
            {reports.length === 0 ? (
              <Card className="p-12 text-center glass-card">
                <div className="w-20 h-20 bg-cyber/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-cyber animate-pulse" />
                </div>
                <p className="text-muted-foreground mb-4 text-lg">You haven't submitted any reports yet</p>
                <Button onClick={() => setShowForm(true)} className="bg-cyber text-white hover:bg-cyber/90 shadow-lg hover-scale">
                  Submit Your First Report
                </Button>
              </Card>
            ) : (
              reports.map((report) => (
                <Card key={report.id} className="p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/50 glass-card">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{report.title}</h3>
                      <p className="text-muted-foreground mb-3">{report.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {report.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={`${getStatusColor(report.status)} flex items-center gap-1`}>
                        {getStatusIcon(report.status)}
                        {report.status.replace('_', ' ')}
                      </Badge>
                      {report.status === 'pending' && (
                        <Button variant="outline" size="sm" onClick={() => handleEdit(report)}>
                          <Pencil className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{report.category}</Badge>
                      <Button variant="ghost" size="sm" onClick={() => toggleComments(report.id)} className="flex items-center gap-1 text-muted-foreground">
                        <MessageSquare className="w-4 h-4" />
                        <span>{report.comments?.length || 0}</span>
                      </Button>
                    </div>
                    <span className="text-muted-foreground">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {report.images && report.images.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2 mb-3">
                        <Camera className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Photos ({report.images.length})</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {report.images.slice(0, 3).map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt={`Evidence ${idx + 1}`}
                            className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border"
                            onClick={() => {
                              setSelectedImages(report.images!);
                              setShowImageDialog(true);
                            }}
                          />
                        ))}
                        {report.images.length > 3 && (
                          <div 
                            className="w-full h-20 bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors border"
                            onClick={() => {
                              setSelectedImages(report.images!);
                              setShowImageDialog(true);
                            }}
                          >
                            <span className="text-sm font-medium">+{report.images.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {report.assignedToName && (
                    <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                      Assigned to: <span className="font-medium text-foreground">{report.assignedToName}</span>
                    </div>
                  )}

                  {visibleComments.includes(report.id) && (
                    <CommentsSection report={report} onCommentAdded={loadReports} />
                  )}
                </Card>
              ))
            )}
            </TabsContent>

            <TabsContent value="map">
              <ReportsMap reports={reports} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Leaderboard */}
        <div className="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Report Photos</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
            {selectedImages.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`Evidence ${idx + 1}`}
                className="w-full h-auto rounded-lg border"
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CitizenDashboard;

