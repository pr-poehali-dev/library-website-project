import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Article } from '@/data/mockData';
import { categories } from '@/data/mockData';

interface EncyclopediaPageProps {
  articles: Article[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  allTags: string[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onArticleClick: (article: Article) => void;
}

export default function EncyclopediaPage({
  articles,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onToggleTag,
  allTags,
  favorites,
  onToggleFavorite,
  onArticleClick
}: EncyclopediaPageProps) {
  return (
    <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
      <TabsList className="bg-card/80 border-2 border-primary/40 flex-wrap h-auto mb-6 p-2">
        {categories.map(cat => (
          <TabsTrigger 
            key={cat} 
            value={cat} 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-primary/20 data-[state=active]:border-primary"
          >
            {cat}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={selectedCategory}>
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Icon name="Tag" size={16} />
            Метки
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105 border-primary/40"
                onClick={() => onToggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Card 
              key={article.id} 
              className="bg-card/80 border-2 border-primary/40 hover:border-primary transition-all duration-300 cursor-pointer group animate-fade-in shadow-lg hover:shadow-xl backdrop-blur"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => onArticleClick(article)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs border border-primary/30">
                    {article.category}
                  </Badge>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(article.id);
                    }}
                    className="transition-transform hover:scale-110"
                  >
                    <Icon 
                      name="Star"
                      size={20} 
                      className={favorites.includes(article.id) ? "fill-primary text-primary" : "text-muted-foreground"}
                    />
                  </button>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs border-primary/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={14} />
                    <span>{article.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    <span>{new Date(article.lastUpdated).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">Записи не найдены</p>
            <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
