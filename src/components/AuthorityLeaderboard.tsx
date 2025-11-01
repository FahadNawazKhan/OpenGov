
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Report } from "@/types";

interface AuthorityLeaderboardData {
  rank: number;
  username: string;
  points: number;
  avatar: string;
  resolvedCount: number;
  avgResolutionTime: string;
}

const AuthorityLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<AuthorityLeaderboardData[]>([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("opengov_users") || "[]") as User[];
    const reports = JSON.parse(localStorage.getItem("opengov_reports") || "[]") as Report[];

    const authorities = users.filter(u => u.role === 'authority');

    const authorityStats = authorities.map(auth => {
      const resolvedReports = reports.filter(r => r.assignedTo === auth.id && r.status === 'resolved' && r.resolvedAt);
      
      const totalResolutionTime = resolvedReports.reduce((acc, report) => {
        const createdAt = new Date(report.createdAt).getTime();
        const resolvedAt = new Date(report.resolvedAt!).getTime();
        return acc + (resolvedAt - createdAt);
      }, 0);

      const avgResolutionTimeMs = resolvedReports.length > 0 ? totalResolutionTime / resolvedReports.length : 0;
      const avgResolutionTimeHours = avgResolutionTimeMs / (1000 * 60 * 60);

      // Simple scoring: 10 points per resolved report, minus avg resolution time in hours
      const points = (resolvedReports.length * 10) - avgResolutionTimeHours;

      return {
        ...auth,
        points,
        resolvedCount: resolvedReports.length,
        avgResolutionTime: avgResolutionTimeHours.toFixed(2) + ' hours',
      };
    });

    authorityStats.sort((a, b) => b.points - a.points);

    const rankedData = authorityStats.map((auth, index) => ({
      rank: index + 1,
      username: auth.name,
      points: Math.round(auth.points),
      avatar: "/placeholder.svg", // Replace with real avatar if available
      resolvedCount: auth.resolvedCount,
      avgResolutionTime: auth.avgResolutionTime,
    }));

    setLeaderboardData(rankedData);
  }, []);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="gradient-text">Authority Performance Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Performance is based on the number of resolved reports and the average resolution time.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Authority</TableHead>
              <TableHead>Resolved Reports</TableHead>
              <TableHead>Avg. Resolution Time</TableHead>
              <TableHead className="text-right">Performance Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((data) => (
              <TableRow key={data.rank}>
                <TableCell className="font-medium">{data.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={data.avatar} alt={data.username} />
                      <AvatarFallback>{data.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{data.username}</span>
                  </div>
                </TableCell>
                <TableCell>{data.resolvedCount}</TableCell>
                <TableCell>{data.avgResolutionTime}</TableCell>
                <TableCell className="text-right font-bold">{data.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {leaderboardData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No authority data to display yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthorityLeaderboard;
