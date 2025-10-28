import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Story } from '@/data/mockData';

interface StoriesPageProps {
  stories: Story[];
  onStoryClick: (story: Story) => void;
}

export default function StoriesPage({ stories, onStoryClick }: StoriesPageProps) {
  return (
    <div className="space-y-6">
      {stories.map((story, index) => (
        <Card 
          key={story.id}
          className="bg-card/80 border-2 border-primary/40 hover:border-primary transition-all duration-300 cursor-pointer animate-fade-in shadow-lg hover:shadow-xl backdrop-blur"
          style={{ animationDelay: `${index * 50}ms` }}
          onClick={() => onStoryClick(story)}
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2 hover:text-primary transition-colors">
                  {story.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground mb-3">
                  {story.description}
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="User" size={16} />
                    {story.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={16} />
                    {story.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={16} />
                    {new Date(story.published).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {story.tags.map(tag => (
                <Badge key={tag} variant="outline" className="border-primary/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
