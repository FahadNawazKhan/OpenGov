import { Card } from '@/components/ui/card';
import { Clock, CheckCircle, XCircle, Loader, AlertCircle } from 'lucide-react';
import { Report } from '@/types';

interface ActivityTimelineProps {
  report: Report;
}

const ActivityTimeline = ({ report }: ActivityTimelineProps) => {
  const activities = [
    {
      status: 'created',
      icon: <AlertCircle className="w-4 h-4" />,
      title: 'Report Created',
      user: report.citizenName,
      time: report.createdAt,
    },
    ...(report.status !== 'pending' ? [{
      status: report.status,
      icon: report.status === 'in_progress' ? <Loader className="w-4 h-4" /> : 
            report.status === 'resolved' ? <CheckCircle className="w-4 h-4" /> : 
            <XCircle className="w-4 h-4" />,
      title: `Marked as ${report.status.replace('_', ' ')}`,
      user: report.assignedToName || 'Authority',
      time: report.updatedAt,
    }] : []),
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'created': return 'bg-accent';
      case 'in_progress': return 'bg-primary';
      case 'resolved': return 'bg-success';
      case 'rejected': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Activity Timeline
      </h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className={`w-8 h-8 rounded-full ${getStatusColor(activity.status)} flex items-center justify-center text-white flex-shrink-0`}>
              {activity.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground">
                by {activity.user}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(activity.time).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityTimeline;
