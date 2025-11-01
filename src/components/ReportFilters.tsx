import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ReportCategory, ReportStatus } from '@/types';

interface ReportFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: 'all' | ReportCategory;
  onCategoryChange: (category: 'all' | ReportCategory) => void;
  statusFilter: 'all' | ReportStatus;
  onStatusChange: (status: 'all' | ReportStatus) => void;
  sortBy: 'date' | 'status' | 'category';
  onSortChange: (sort: 'date' | 'status' | 'category') => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderToggle: () => void;
}

const ReportFilters = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderToggle,
}: ReportFiltersProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search reports..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <Select value={categoryFilter} onValueChange={(val) => onCategoryChange(val as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="safety">Safety</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Status</label>
          <Select value={statusFilter} onValueChange={(val) => onStatusChange(val as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Sort By</label>
          <Select value={sortBy} onValueChange={(val) => onSortChange(val as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Order</label>
          <Button
            variant="outline"
            onClick={onSortOrderToggle}
            className="w-full"
          >
            {sortOrder === 'asc' ? (
              <><SortAsc className="w-4 h-4 mr-2" /> Ascending</>
            ) : (
              <><SortDesc className="w-4 h-4 mr-2" /> Descending</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;
