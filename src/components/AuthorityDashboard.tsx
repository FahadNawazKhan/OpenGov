import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Report, ReportStatus, ReportCategory } from '@/types';
import { 
  MapPin, Clock, CheckCircle, AlertCircle, Camera, 
  Search, Filter, Eye, MessageSquare, FileText,
  TrendingUp, AlertTriangle, Zap, Calendar,
  User, Download, Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import ReportStats from './ReportStats';
import ReportsMap from './ReportsMap';
import AuthorityLeaderboard from './AuthorityLeaderboard';
import CommentsSection from './CommentsSection';

export const AuthorityDashboard = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<'all' | ReportStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | ReportCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [internalNote, setInternalNote] = useState('');
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    const allReports = JSON.parse(localStorage.getItem('opengov_reports') || '[]');
    setReports(allReports);
  };

  const updateReportStatus = (reportId: string, newStatus: ReportStatus) => {
    const allReports = JSON.parse(localStorage.getItem('opengov_reports') || '[]');
    const updatedReports = allReports.map((r: Report) =>
      r.id === reportId
        ? {
            ...r,
            status: newStatus,
            assignedTo: newStatus === 'in_progress' ? user?.id : r.assignedTo,
            assignedToName: newStatus === 'in_progress' ? user?.name : r.assignedToName,
            updatedAt: new Date().toISOString(),
            resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : r.resolvedAt,
          }
        : r
    );
    localStorage.setItem('opengov_reports', JSON.stringify(updatedReports));
    loadReports();
    
    toast({
      title: 'Status Updated',
      description: `Report marked as ${newStatus.replace('_', ' ')}`,
    });
  };

  const filteredReports = reports
    .filter(r => filter === 'all' || r.status === filter)
    .filter(r => categoryFilter === 'all' || r.category === categoryFilter)
    .filter(r => 
      searchQuery === '' || 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const openReportDetail = (report: Report) => {
    setSelectedReport(report);
    setShowDetailDialog(true);
  };

  const addInternalNote = () => {
    if (!selectedReport || !internalNote.trim()) return;

    const allReports = JSON.parse(localStorage.getItem('opengov_reports') || '[]');
    const updatedReports = allReports.map((r: Report) =>
      r.id === selectedReport.id
        ? {
            ...r,
            internalNotes: [...(r.internalNotes || []), {
              id: Math.random().toString(36).substring(7),
              text: internalNote,
              authorId: user?.id,
              authorName: user?.name,
              timestamp: new Date().toISOString(),
            }],
            updatedAt: new Date().toISOString(),
          }
        : r
    );
    localStorage.setItem('opengov_reports', JSON.stringify(updatedReports));
    loadReports();
    setInternalNote('');
    
    toast({
      title: 'Note Added',
      description: 'Internal note has been saved successfully',
    });
  };

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    inProgress: reports.filter(r => r.status === 'in_progress').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 gradient-text">{t('authorityDashboard.title')}</h1>
          <p className="text-muted-foreground">{t('authorityDashboard.welcome', { name: user?.name })}</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          {t('authorityDashboard.exportReports')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-cyber/20 to-cyber/5 hover-scale cursor-pointer border-cyber/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-cyber">{stats.total}</div>
            <div className="p-3 rounded-full bg-cyber/20">
              <FileText className="w-6 h-6 text-cyber" />
            </div>
          </div>
          <div className="text-sm font-medium">{t('authorityDashboard.totalReports')}</div>
          <div className="text-xs text-muted-foreground mt-1">{t('authorityDashboard.allTimeSubmissions')}</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-neon/20 to-neon/5 hover-scale cursor-pointer border-neon/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-neon">{stats.pending}</div>
            <div className="p-3 rounded-full bg-neon/20">
              <AlertTriangle className="w-6 h-6 text-neon animate-pulse" />
            </div>
          </div>
          <div className="text-sm font-medium">{t('authorityDashboard.needsAttention')}</div>
          <div className="text-xs text-muted-foreground mt-1">{t('authorityDashboard.pendingReview')}</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-electric/20 to-electric/5 hover-scale cursor-pointer border-electric/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-electric">{stats.inProgress}</div>
            <div className="p-3 rounded-full bg-electric/20">
              <Zap className="w-6 h-6 text-electric" />
            </div>
          </div>
          <div className="text-sm font-medium">{t('authorityDashboard.activeWork')}</div>
          <div className="text-xs text-muted-foreground mt-1">{t('authorityDashboard.inProgress')}</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-success/20 to-success/5 hover-scale cursor-pointer border-success/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-success">{stats.resolved}</div>
            <div className="p-3 rounded-full bg-success/20">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
          </div>
          <div className="text-sm font-medium">{t('authorityDashboard.completed')}</div>
          <div className="text-xs text-muted-foreground mt-1">{t('authorityDashboard.successfullyResolved')}</div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t('authorityDashboard.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filter} onValueChange={(value) => setFilter(value as any)}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t('authorityDashboard.filterByStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('authorityDashboard.allStatuses')}</SelectItem>
              <SelectItem value="pending">⏱️ {t('report.pending')}</SelectItem>
              <SelectItem value="in_progress">⚡ {t('report.inProgress')}</SelectItem>
              <SelectItem value="resolved">✅ {t('report.resolved')}</SelectItem>
              <SelectItem value="rejected">❌ {t('report.rejected')}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as any)}>
            <SelectTrigger>
              <SelectValue placeholder={t('authorityDashboard.filterByCategory')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('authorityDashboard.allCategories')}</SelectItem>
              <SelectItem value="infrastructure">🏗️ {t('category.infrastructure')}</SelectItem>
              <SelectItem value="safety">🚨 {t('category.safety')}</SelectItem>
              <SelectItem value="environment">🌳 {t('category.environment')}</SelectItem>
              <SelectItem value="utilities">💡 {t('category.utilities')}</SelectItem>
              <SelectItem value="other">📋 {t('category.other')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t('authorityDashboard.showingReports', { count: filteredReports.length, total: reports.length })}
          </p>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Reports and Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="reports" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="reports" className="gap-2">
                <FileText className="w-4 h-4" />
                {t('authorityDashboard.reports')}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                {t('authorityDashboard.analytics')}
              </TabsTrigger>
              <TabsTrigger value="map" className="gap-2">
                <MapPin className="w-4 h-4" />
                {t('authorityDashboard.mapView')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="space-y-4">
              {filteredReports.length === 0 ? (
                <Card className="p-12 text-center glass-card">
                  <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
                  <p className="text-muted-foreground">{t('authorityDashboard.noReports')}</p>
                </Card>
              ) : (
                filteredReports.map((report) => (
                  <Card key={report.id} className="p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/50 glass-card">
                    <div className="flex items-start justify-between gap-4">
                      {/* Report Content */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{report.title}</h3>
                            <Badge variant="outline" className="font-semibold">
                              {t(`category.${report.category}`)}
                            </Badge>
                            <Badge className={
                              report.status === 'pending' ? 'bg-neon/20 text-neon border-neon/50' :
                              report.status === 'in_progress' ? 'bg-electric/20 text-electric border-electric/50' :
                              report.status === 'resolved' ? 'bg-success/20 text-success border-success/50' :
                              'bg-destructive/20 text-destructive border-destructive/50'
                            }>
                              {t(`report.${report.status.replace('_', ' ')}`)}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground line-clamp-2">{report.description}</p>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-cyber" />
                            <span>{report.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-electric" />
                            <span>{report.citizenName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-neon" />
                            <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Images Preview */}
                        {report.images && report.images.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Camera className="w-4 h-4 text-cyber" />
                              <span className="text-sm font-medium">{t('authorityDashboard.evidencePhotos', { count: report.images.length })}</span>
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                              {report.images.map((image, idx) => (
                                <img
                                  key={idx}
                                  src={image}
                                  alt={`Evidence ${idx + 1}`}
                                  className="h-24 w-24 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform border-2 border-primary/20"
                                  onClick={() => openReportDetail(report)}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-4 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openReportDetail(report)}
                            className="gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            {t('authorityDashboard.viewDetails')}
                          </Button>
                          <Button
                            size="sm"
                            variant={report.status === 'in_progress' ? 'default' : 'outline'}
                            onClick={() => updateReportStatus(report.id, 'in_progress')}
                            className="gap-2"
                          >
                            <Zap className="w-4 h-4" />
                            {t('authorityDashboard.startWork')}
                          </Button>
                          <Button
                            size="sm"
                            variant={report.status === 'resolved' ? 'default' : 'outline'}
                            onClick={() => updateReportStatus(report.id, 'resolved')}
                            className={report.status === 'resolved' ? 'bg-success hover:bg-success/90' : ''}
                          >
                            <CheckCircle className="w-4 h-4" />
                            {t('authorityDashboard.resolve')}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateReportStatus(report.id, 'rejected')}
                            className="text-destructive hover:text-destructive"
                          >
                            {t('authorityDashboard.reject')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="analytics">
              <ReportStats reports={reports} />
            </TabsContent>

            <TabsContent value="map">
              <ReportsMap reports={reports} />
            </TabsContent>
          </Tabs>
        </div>
        {/* Right Column: Leaderboard */}
        <div className="lg:col-span-1">
          <AuthorityLeaderboard />
        </div>
      </div>

      {/* Report Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text">{selectedReport.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 flex-wrap mt-2">
                  <Badge>{t(`category.${selectedReport.category}`)}</Badge>
                  <Badge className={
                    selectedReport.status === 'pending' ? 'bg-neon/20 text-neon' :
                    selectedReport.status === 'in_progress' ? 'bg-electric/20 text-electric' :
                    selectedReport.status === 'resolved' ? 'bg-success/20 text-success' :
                    'bg-destructive/20 text-destructive'
                  }>
                    {t(`report.${selectedReport.status.replace('_', ' ')}`)}
                  </Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-2">{t('report.description')}</h4>
                  <p className="text-muted-foreground">{selectedReport.description}</p>
                </div>

                {/* Report Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1 text-cyber" />
                      <div>
                        <p className="text-sm font-medium">{t('report.location')}</p>
                        <p className="text-sm text-muted-foreground">{selectedReport.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 mt-1 text-electric" />
                      <div>
                        <p className="text-sm font-medium">{t('authorityDashboard.reportedBy')}</p>
                        <p className="text-sm text-muted-foreground">{selectedReport.citizenName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 mt-1 text-neon" />
                      <div>
                        <p className="text-sm font-medium">{t('authorityDashboard.submitted')}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedReport.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {selectedReport.assignedToName && (
                      <div className="flex items-start gap-2">
                        <User className="w-4 h-4 mt-1 text-success" />
                        <div>
                          <p className="text-sm font-medium">{t('authorityDashboard.assignedTo')}</p>
                          <p className="text-sm text-muted-foreground">{selectedReport.assignedToName}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Images Gallery */}
                {selectedReport.images && selectedReport.images.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      {t('authorityDashboard.evidencePhotos', { count: selectedReport.images.length })}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedReport.images.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt={`Evidence ${idx + 1}`}
                          className="w-full h-auto rounded-lg border-2 border-primary/20 hover:border-primary/50 transition-all"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Internal Notes */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    {t('authorityDashboard.internalNotes')}
                  </h4>
                  
                  {selectedReport.internalNotes && selectedReport.internalNotes.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {selectedReport.internalNotes.map((note: any) => (
                        <Card key={note.id} className="p-3 bg-muted/50">
                          <p className="text-sm mb-2">{note.text}</p>
                          <p className="text-xs text-muted-foreground">
                            By {note.authorName} • {new Date(note.timestamp).toLocaleString()}
                          </p>
                        </Card>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Textarea
                      placeholder={t('authorityDashboard.internalNotesPlaceholder')}
                      value={internalNote}
                      onChange={(e) => setInternalNote(e.target.value)}
                      rows={3}
                    />
                    <Button onClick={addInternalNote} size="sm" disabled={!internalNote.trim()}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {t('authorityDashboard.addNote')}
                    </Button>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => {
                      updateReportStatus(selectedReport.id, 'in_progress');
                      setShowDetailDialog(false);
                    }}
                    className="flex-1"
                    variant={selectedReport.status === 'in_progress' ? 'default' : 'outline'}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {t('report.inProgress')}
                  </Button>
                  <Button
                    onClick={() => {
                      updateReportStatus(selectedReport.id, 'resolved');
                      setShowDetailDialog(false);
                    }}
                    className="flex-1 bg-success hover:bg-success/90"
                    variant={selectedReport.status === 'resolved' ? 'default' : 'outline'}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {t('report.resolved')}
                  </Button>
                  <Button
                    onClick={() => {
                      updateReportStatus(selectedReport.id, 'rejected');
                      setShowDetailDialog(false);
                    }}
                    variant="destructive"
                  >
                    {t('report.rejected')}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};


