import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  reportId: string;
  userId: string;
  userName: string;
  userRole: string;
  text: string;
  createdAt: string;
}

interface CommentsSectionProps {
  reportId: string;
}

const CommentsSection = ({ reportId }: CommentsSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(() => {
    const stored = localStorage.getItem(`opengov_comments_${reportId}`);
    return stored ? JSON.parse(stored) : [];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substring(7),
      reportId,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      text: comment,
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`opengov_comments_${reportId}`, JSON.stringify(updatedComments));
    
    setComment('');
    toast({
      title: 'Comment added',
      description: 'Your comment has been posted',
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5" />
        <h3 className="text-lg font-bold">Comments ({comments.length})</h3>
      </div>

      <div className="space-y-4 mb-4">
        {comments.map((c) => (
          <div key={c.id} className="border-l-2 border-primary pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{c.userName}</span>
              <span className="text-xs px-2 py-0.5 bg-muted rounded">
                {c.userRole}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-muted-foreground">{c.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-20"
        />
        <Button type="submit" disabled={!comment.trim()}>
          <Send className="w-4 h-4 mr-2" />
          Post Comment
        </Button>
      </form>
    </Card>
  );
};

export default CommentsSection;
