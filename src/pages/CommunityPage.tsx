
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAuth } from '@/contexts/AuthContext';
import { Report } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, MapPin, Camera, ArrowUp, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import CommentsSection from '@/components/CommentsSection';

const CommunityPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [reports, setReports] = useState<Report[]>([]);
  const [visibleComments, setVisibleComments] = useState<string[]>([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    const allReports = JSON.parse(localStorage.getItem('opengov_reports') || '[]') as Report[];
    const publicReports = allReports.filter((r: Report) => r.isPublic);
    setReports(publicReports);
  };

  const toggleComments = (reportId: string) => {
    setVisibleComments(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId) 
        : [...prev, reportId]
    );
  };

  const handleVote = (reportId: string, voteType: 'upvote' | 'downvote') => {
    if (!user) return;

    const allReports = JSON.parse(localStorage.getItem('opengov_reports') || '[]') as Report[];
    const report = allReports.find(r => r.id === reportId);

    if (!report) return;

    let upvotes = report.upvotes || 0;
    let downvotes = report.downvotes || 0;
    let upvotedBy = report.upvotedBy || [];
    let downvotedBy = report.downvotedBy || [];

    const hasUpvoted = upvotedBy.includes(user.id);
    const hasDownvoted = downvotedBy.includes(user.id);

    if (voteType === 'upvote') {
      if (hasUpvoted) {
        upvotes -= 1;
        upvotedBy = upvotedBy.filter(id => id !== user.id);
      } else {
        upvotes += 1;
        upvotedBy.push(user.id);
        if (hasDownvoted) {
          downvotes -= 1;
          downvotedBy = downvotedBy.filter(id => id !== user.id);
        }
      }
    } else { // downvote
      if (hasDownvoted) {
        downvotes -= 1;
        downvotedBy = downvotedBy.filter(id => id !== user.id);
      } else {
        downvotes += 1;
        downvotedBy.push(user.id);
        if (hasUpvoted) {
          upvotes -= 1;
          upvotedBy = upvotedBy.filter(id => id !== user.id);
        }
      }
    }

    const updatedReports = allReports.map(r => 
      r.id === reportId 
        ? { ...r, upvotes, downvotes, upvotedBy, downvotedBy } 
        : r
    );

    localStorage.setItem('opengov_reports', JSON.stringify(updatedReports));
    loadReports();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 gradient-text">Community Reports</h1>
      <div className="space-y-4">
        {reports.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0)).map(report => (
          <Card key={report.id} className="p-6 glass-card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{report.title}</h3>
                <p className="text-muted-foreground mb-3">{report.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {report.location}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleVote(report.id, 'upvote')} className={`flex items-center gap-1 ${report.upvotedBy?.includes(user?.id || '') ? 'text-primary' : 'text-muted-foreground'}`}>
                  <ArrowUp className="w-4 h-4" />
                  <span>{report.upvotes || 0}</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleVote(report.id, 'downvote')} className={`flex items-center gap-1 ${report.downvotedBy?.includes(user?.id || '') ? 'text-destructive' : 'text-muted-foreground'}`}>
                  <ArrowDown className="w-4 h-4" />
                  <span>{report.downvotes || 0}</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{report.category}</Badge>
                <Button variant="ghost" size="sm" onClick={() => toggleComments(report.id)} className="flex items-center gap-1 text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span>{report.comments?.length || 0}</span>
                </Button>
              </div>
              <span className="text-muted-foreground">
                Reported by {report.citizenName} on {new Date(report.createdAt).toLocaleDateString()}
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
                      className="w-full h-20 object-cover rounded-lg border"
                    />
                  ))}
                  {report.images.length > 3 && (
                    <div className="w-full h-20 bg-muted rounded-lg flex items-center justify-center border">
                      <span className="text-sm font-medium">+{report.images.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {visibleComments.includes(report.id) && (
              <CommentsSection report={report} onCommentAdded={loadReports} />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
