import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const mockArticles = [
  {
    id: 1,
    title: 'Основы квантовой механики',
    description: 'Введение в фундаментальные принципы квантовой физики и их практическое применение',
    category: 'Физика',
    tags: ['квантовая механика', 'физика', 'наука'],
    views: 1247,
    lastUpdated: '2024-10-15'
  },
  {
    id: 2,
    title: 'История Древнего Рима',
    description: 'Подробный обзор политической системы и культуры Римской империи',
    category: 'История',
    tags: ['древний рим', 'история', 'империя'],
    views: 892,
    lastUpdated: '2024-10-20'
  },
  {
    id: 3,
    title: 'Алгоритмы сортировки',
    description: 'Сравнительный анализ основных алгоритмов сортировки данных',
    category: 'Информатика',
    tags: ['алгоритмы', 'программирование', 'сортировка'],
    views: 2103,
    lastUpdated: '2024-10-25'
  },
  {
    id: 4,
    title: 'Экосистемы тропических лесов',
    description: 'Биоразнообразие и взаимосвязи организмов в тропических экосистемах',
    category: 'Биология',
    tags: ['экология', 'биология', 'природа'],
    views: 634,
    lastUpdated: '2024-10-18'
  },
  {
    id: 5,
    title: 'Основы машинного обучения',
    description: 'Введение в нейронные сети и основные методы ML',
    category: 'Информатика',
    tags: ['ML', 'AI', 'нейросети', 'алгоритмы'],
    views: 3421,
    lastUpdated: '2024-10-27'
  },
  {
    id: 6,
    title: 'Эпоха Возрождения',
    description: 'Культурное и художественное движение в Европе XIV-XVII веков',
    category: 'История',
    tags: ['возрождение', 'искусство', 'культура'],
    views: 1156,
    lastUpdated: '2024-10-22'
  }
];

const categories = ['Все', 'Физика', 'История', 'Информатика', 'Биология'];
const allTags = Array.from(new Set(mockArticles.flatMap(a => a.tags)));

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || article.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => article.tags.includes(tag));
    return matchesSearch && matchesCategory && matchesTags;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-primary">Библиотека знаний</h1>
            <div className="flex gap-2">
              <Icon name="Moon" size={24} className="text-muted-foreground" />
            </div>
          </div>
          
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по статьям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="bg-card border border-border">
            {categories.map(cat => (
              <TabsTrigger key={cat} value={cat} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Icon name="Tag" size={16} />
                Фильтр по тегам
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <Card 
                  key={article.id} 
                  className="bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(article.id);
                        }}
                        className="transition-transform hover:scale-110"
                      >
                        <Icon 
                          name={favorites.includes(article.id) ? "Star" : "Star"} 
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
                        <Badge key={tag} variant="outline" className="text-xs">
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

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">Статьи не найдены</p>
                <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {favorites.length > 0 && (
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Star" size={24} className="text-primary fill-primary" />
              Избранное
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockArticles.filter(a => favorites.includes(a.id)).map(article => (
                <Card key={article.id} className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
