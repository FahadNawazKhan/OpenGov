import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Report } from '@/types';
import { Send } from 'lucide-react';

interface CommentsSectionProps {
  report: Report;
  onCommentAdded: () => void;
}

const CommentsSection = ({ report, onCommentAdded }: CommentsSectionProps) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitComment = () => {
    if (!newComment.trim() || !user) return;

    setLoading(true);

    const comment = {
      id: Math.random().toString(36).substring(7),
      text: newComment,
      authorId: user.id,
      authorName: user.name,
      createdAt: new Date().toISOString(),
    };

    const allReports = JSON.parse(localStorage.getItem('opengov_reports') || '[]') as Report[];
    const updatedReports = allReports.map(r => 
      r.id === report.id 
        ? { ...r, comments: [...(r.comments || []), comment] } 
        : r
    );

    localStorage.setItem('opengov_reports', JSON.stringify(updatedReports));
    setNewComment('');
    onCommentAdded();
    setLoading(false);
  };

  return (
    <div className="pt-4 mt-4 border-t">
      <h4 className="text-lg font-semibold mb-4">Comments ({report.comments?.length || 0})</h4>
      
      <div className="space-y-4 mb-6">
        {report.comments?.map(comment => (
          <div key={comment.id} className="flex items-start gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg" alt={comment.authorName} />
              <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{comment.authorName}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm bg-muted/50 p-3 rounded-lg">{comment.text}</p>
            </div>
          </div>
        ))}
        {(!report.comments || report.comments.length === 0) && (
          <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
        )}
      </div>

      {user && (
        <div className="flex items-start gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add a public comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={2}
            />
            <Button onClick={handleSubmitComment} size="sm" disabled={loading || !newComment.trim()}>
              <Send className="w-4 h-4 mr-2" />
              {loading ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;