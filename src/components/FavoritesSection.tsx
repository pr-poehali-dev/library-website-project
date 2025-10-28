import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Article } from '@/data/mockData';

interface FavoritesSectionProps {
  articles: Article[];
  favorites: number[];
  onArticleClick: (article: Article) => void;
}

export default function FavoritesSection({ articles, favorites, onArticleClick }: FavoritesSectionProps) {
  if (favorites.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t-2 border-primary/40">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Icon name="Star" size={24} className="text-primary fill-primary" />
        Избранное
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.filter(a => favorites.includes(a.id)).map(article => (
          <Card 
            key={article.id} 
            className="bg-card/80 border-2 border-primary/40 cursor-pointer hover:border-primary transition-colors backdrop-blur"
            onClick={() => onArticleClick(article)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{article.title}</CardTitle>
              <CardDescription className="text-sm">{article.category}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
