import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Story } from '@/data/mockData';

interface StoryDialogProps {
  story: Story | null;
  onClose: () => void;
}

export default function StoryDialog({ story, onClose }: StoryDialogProps) {
  return (
    <Dialog open={!!story} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-card/95 border-2 border-primary/40 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">{story?.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground border-b-2 border-primary/20 pb-4">
              <span className="flex items-center gap-1">
                <Icon name="User" size={16} />
                {story?.author}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Clock" size={16} />
                {story?.readTime}
              </span>
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed text-lg" style={{ textAlign: 'justify' }}>
                {story?.content}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-primary/20">
              {story?.tags.map(tag => (
                <Badge key={tag} variant="outline" className="border-primary/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
