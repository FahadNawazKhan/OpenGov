
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
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface LeaderboardData {
  rank: number;
  username: string;
  points: number;
  avatar: string;
  isCurrentUser: boolean;
}

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("opengov_users") || "[]") as User[];
    const reports = JSON.parse(localStorage.getItem("opengov_reports") || "[]") as Report[];

    const userPoints = users.map(usr => {
      const userReports = reports.filter(report => report.citizenId === usr.id);
      // For now, 1 point per resolved report, but this can be expanded
      const points = userReports.filter(r => r.status === 'resolved').length * 10 + userReports.length;
      return { ...usr, points };
    });

    userPoints.sort((a, b) => b.points - a.points);

    const rankedData = userPoints.map((usr, index) => ({
      rank: index + 1,
      username: usr.name,
      points: usr.points,
      avatar: "/placeholder.svg", // Replace with real avatar if available
      isCurrentUser: usr.id === user?.id,
    }));

    setLeaderboardData(rankedData);
  }, [user]);

  const currentUserData = leaderboardData.find(d => d.isCurrentUser);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="gradient-text">Impact Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Points are awarded for verified reports that lead to real-world fixes.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Impact Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.slice(0, 5).map((data) => (
              <TableRow key={data.rank} className={data.isCurrentUser ? "bg-primary/10" : ""}>
                <TableCell className="font-medium">{data.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={data.avatar} alt={data.username} />
                      <AvatarFallback>{data.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className={data.isCurrentUser ? "font-bold" : ""}>{data.username}</span>
                  </div>
                </TableCell>
                <TableCell className={`text-right ${data.isCurrentUser ? "font-bold" : ""}`}>{data.points}</TableCell>
              </TableRow>
            ))}
            {currentUserData && !leaderboardData.slice(0, 5).some(d => d.isCurrentUser) && (
               <TableRow className="bg-primary/10">
                <TableCell className="font-medium">{currentUserData.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUserData.avatar} alt={currentUserData.username} />
                      <AvatarFallback>{currentUserData.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-bold">{currentUserData.username}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold">{currentUserData.points}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="text-center mt-4">
          <Badge variant="outline">Updated in real-time</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
