import { Card } from '@/components/ui/card';
import { Report } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface ReportStatsProps {
  reports: Report[];
}

const COLORS = {
  pending: '#f59e0b',
  in_progress: '#3b82f6',
  resolved: '#10b981',
  rejected: '#ef4444',
};

const ReportStats = ({ reports }: ReportStatsProps) => {
  const statusData = [
    { name: 'Pending', value: reports.filter(r => r.status === 'pending').length, color: COLORS.pending },
    { name: 'In Progress', value: reports.filter(r => r.status === 'in_progress').length, color: COLORS.in_progress },
    { name: 'Resolved', value: reports.filter(r => r.status === 'resolved').length, color: COLORS.resolved },
    { name: 'Rejected', value: reports.filter(r => r.status === 'rejected').length, color: COLORS.rejected },
  ];

  const categoryData = [
    { name: 'Infrastructure', value: reports.filter(r => r.category === 'infrastructure').length },
    { name: 'Safety', value: reports.filter(r => r.category === 'safety').length },
    { name: 'Environment', value: reports.filter(r => r.category === 'environment').length },
    { name: 'Utilities', value: reports.filter(r => r.category === 'utilities').length },
    { name: 'Other', value: reports.filter(r => r.category === 'other').length },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Reports by Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Reports by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default ReportStats;
