import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const mockArticles = [
  {
    id: 1,
    title: 'Империя Солнечного Трона',
    description: 'Крупнейшее государство континента с тысячелетней историей',
    category: 'Великие государства',
    tags: ['империя', 'политика', 'история'],
    views: 1847,
    lastUpdated: '2024-10-15',
    content: `# Империя Солнечного Трона\n\nКрупнейшее и древнейшее государство континента.\n\n## История\n\nОснована более тысячи лет назад.\n\n## Политика\n\nАбсолютная монархия с советом лордов.`
  },
  {
    id: 2,
    title: 'Гильдия Теневых Клинков',
    description: 'Тайная организация наёмных убийц и шпионов',
    category: 'Гильдии',
    tags: ['гильдия', 'убийцы', 'тайны'],
    views: 2103,
    lastUpdated: '2024-10-20',
    content: `# Гильдия Теневых Клинков\n\nСамая опасная и влиятельная гильдия убийц.`
  },
  {
    id: 3,
    title: 'Дом Железной Розы',
    description: 'Древний аристократический род, владеющий северными землями',
    category: 'Дома/Кланы',
    tags: ['дом', 'аристократия', 'север'],
    views: 1456,
    lastUpdated: '2024-10-18',
    content: `# Дом Железной Розы\n\nОдин из старейших благородных домов континента.`
  },
  {
    id: 4,
    title: 'Пустоши Беспределья',
    description: 'Дикие земли за границами цивилизации, где правит хаос',
    category: 'Беспределье',
    tags: ['беспределье', 'дикие земли', 'опасность'],
    views: 3201,
    lastUpdated: '2024-10-25',
    content: `# Пустоши Беспределья\n\nОгромная территория за пределами известных королевств, где не действуют законы.`
  },
  {
    id: 5,
    title: 'Орден Пяти Клинков',
    description: 'Легендарный рыцарский орден, защищающий мир от древнего зла',
    category: 'Организации',
    tags: ['орден', 'рыцари', 'герои'],
    views: 4521,
    lastUpdated: '2024-10-27',
    content: `# Орден Пяти Клинков\n\nЛегендарный орден, названный в честь пяти легендарных мечей.`
  },
  {
    id: 6,
    title: 'Серый Волк - Изгнанник',
    description: 'Бывший член Ордена, ставший ренегатом',
    category: 'Ренегаты',
    tags: ['ренегат', 'изгнанник', 'антигерой'],
    views: 2876,
    lastUpdated: '2024-10-22',
    content: `# Серый Волк\n\nБывший капитан Ордена, изгнанный за нарушение клятвы.`
  },
  {
    id: 7,
    title: 'Горы Драконьего Хребта',
    description: 'Неприступная горная цепь, разделяющая континент',
    category: 'География',
    tags: ['горы', 'география', 'драконы'],
    views: 1923,
    lastUpdated: '2024-10-19',
    content: `# Горы Драконьего Хребта\n\nГигантская горная система, простирающаяся через весь континент.`
  }
];

const mockStories = [
  {
    id: 1,
    title: 'Клинок Рассвета',
    description: 'Первый из пяти легендарных мечей находит нового владельца',
    author: 'Автор мира',
    readTime: '15 мин',
    published: '2024-10-20',
    tags: ['клинки', 'приключения', 'герои'],
    content: `Меч лежал на алтаре уже триста лет. Пыль веков покрывала его рукоять, но клинок оставался чистым, словно только что вышел из горнила.\n\n"Это он?" — прошептал юноша, поднимаясь по ступеням древнего храма.\n\nСтарый страж кивнул:\n"Клинок Рассвета. Первый из Пяти. Но он сам выбирает своего владельца..."\n\nКогда пальцы юноши коснулись рукояти, меч вспыхнул золотым светом.`
  },
  {
    id: 2,
    title: 'Тени Беспределья',
    description: 'Караван путников сталкивается с опасностями диких земель',
    author: 'Автор мира',
    readTime: '20 мин',
    published: '2024-10-15',
    tags: ['беспределье', 'выживание', 'приключения'],
    content: `За последними холмами цивилизация заканчивалась. Караван остановился на границе — впереди простирались бесконечные пустоши Беспределья.\n\n"Последний шанс повернуть назад," — сказал проводник, глядя на темнеющий горизонт.\n\nНо никто не дрогнул. У каждого были свои причины идти в проклятые земли...`
  }
];

const categories = [
  'Все', 
  'Великие государства', 
  'Беспределье', 
  'Гильдии', 
  'Дома/Кланы', 
  'Организации', 
  'Ренегаты', 
  'География'
];
const allTags = Array.from(new Set(mockArticles.flatMap(a => a.tags)));

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'encyclopedia' | 'timeline' | 'stories'>('home');
  const [selectedArticle, setSelectedArticle] = useState<typeof mockArticles[0] | null>(null);
  const [selectedStory, setSelectedStory] = useState<typeof mockStories[0] | null>(null);

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

  const filteredStories = mockStories.filter(story => 
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none"></div>
      
      <header className="border-b-2 border-primary/40 sticky top-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-primary mb-2" style={{ letterSpacing: '0.05em' }}>
                Пять Клинков и Беспределье
              </h1>
              <p className="text-sm text-muted-foreground italic">Хроники забытых земель</p>
            </div>
            
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab('home')}
                className={`relative px-4 py-3 rounded-t-lg border-2 border-b-0 border-primary/40 transition-all ${
                  activeTab === 'home' 
                    ? 'bg-background text-primary -mb-[2px] z-10' 
                    : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card'
                }`}
                style={{ 
                  clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                  paddingTop: '12px'
                }}
              >
                <Icon name="Home" size={20} />
              </button>
              <button
                onClick={() => setActiveTab('encyclopedia')}
                className={`relative px-4 py-3 rounded-t-lg border-2 border-b-0 border-primary/40 transition-all ${
                  activeTab === 'encyclopedia' 
                    ? 'bg-background text-primary -mb-[2px] z-10' 
                    : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card'
                }`}
                style={{ 
                  clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                  paddingTop: '12px'
                }}
              >
                <Icon name="Book" size={20} />
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`relative px-4 py-3 rounded-t-lg border-2 border-b-0 border-primary/40 transition-all ${
                  activeTab === 'timeline' 
                    ? 'bg-background text-primary -mb-[2px] z-10' 
                    : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card'
                }`}
                style={{ 
                  clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                  paddingTop: '12px'
                }}
              >
                <Icon name="Clock" size={20} />
              </button>
              <button
                onClick={() => setActiveTab('stories')}
                className={`relative px-4 py-3 rounded-t-lg border-2 border-b-0 border-primary/40 transition-all ${
                  activeTab === 'stories' 
                    ? 'bg-background text-primary -mb-[2px] z-10' 
                    : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card'
                }`}
                style={{ 
                  clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                  paddingTop: '12px'
                }}
              >
                <Icon name="FileText" size={20} />
              </button>
            </div>
          </div>
          
          {(activeTab === 'encyclopedia' || activeTab === 'stories') && (
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по хроникам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-primary/40 focus:border-primary"
              />
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {activeTab === 'home' && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/80 border-2 border-primary/40 shadow-xl backdrop-blur">
              <CardHeader className="text-center border-b-2 border-primary/20">
                <CardTitle className="text-3xl mb-4">Добро пожаловать в хроники</CardTitle>
                <CardDescription className="text-lg">
                  Откройте для себя мир, где легенды оживают, а судьбы переплетаются с древними пророчествами
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <button
                    onClick={() => setActiveTab('encyclopedia')}
                    className="p-6 bg-background/50 border-2 border-primary/30 rounded-lg hover:border-primary transition-all hover:shadow-lg group"
                  >
                    <Icon name="Book" size={32} className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-lg mb-2">Энциклопедия</h3>
                    <p className="text-sm text-muted-foreground">Изучите мир, его народы и легенды</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('timeline')}
                    className="p-6 bg-background/50 border-2 border-primary/30 rounded-lg hover:border-primary transition-all hover:shadow-lg group"
                  >
                    <Icon name="Clock" size={32} className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-lg mb-2">История</h3>
                    <p className="text-sm text-muted-foreground">Путешествие сквозь века</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('stories')}
                    className="p-6 bg-background/50 border-2 border-primary/30 rounded-lg hover:border-primary transition-all hover:shadow-lg group"
                  >
                    <Icon name="FileText" size={32} className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-lg mb-2">Рассказы</h3>
                    <p className="text-sm text-muted-foreground">Истории из мира хроник</p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'encyclopedia' && (
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
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
                    className="bg-card/80 border-2 border-primary/40 hover:border-primary transition-all duration-300 cursor-pointer group animate-fade-in shadow-lg hover:shadow-xl backdrop-blur"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setSelectedArticle(article)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="text-xs border border-primary/30">
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

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">Записи не найдены</p>
                  <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить параметры поиска</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {activeTab === 'timeline' && (
          <Card className="bg-card/80 border-2 border-primary/40 shadow-xl backdrop-blur">
            <CardHeader className="border-b-2 border-primary/20">
              <CardTitle className="text-2xl">Хронология событий</CardTitle>
              <CardDescription>Временная линия истории мира</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Icon name="Clock" size={64} className="mx-auto text-primary mb-4" />
                <p className="text-muted-foreground text-lg">Хронология в разработке</p>
                <p className="text-sm text-muted-foreground mt-2">Скоро здесь появится подробная временная шкала событий</p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'stories' && (
          <div className="space-y-6">
            {filteredStories.map((story, index) => (
              <Card 
                key={story.id}
                className="bg-card/80 border-2 border-primary/40 hover:border-primary transition-all duration-300 cursor-pointer animate-fade-in shadow-lg hover:shadow-xl backdrop-blur"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedStory(story)}
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
        )}

        {favorites.length > 0 && activeTab === 'encyclopedia' && (
          <div className="mt-12 pt-8 border-t-2 border-primary/40">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Star" size={24} className="text-primary fill-primary" />
              Избранное
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockArticles.filter(a => favorites.includes(a.id)).map(article => (
                <Card 
                  key={article.id} 
                  className="bg-card/80 border-2 border-primary/40 cursor-pointer hover:border-primary transition-colors backdrop-blur"
                  onClick={() => setSelectedArticle(article)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <CardDescription className="text-sm">{article.category}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] bg-card/95 border-2 border-primary/40 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">{selectedArticle?.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground border-b-2 border-primary/20 pb-4">
                <Badge variant="secondary" className="border border-primary/30">{selectedArticle?.category}</Badge>
                <span className="flex items-center gap-1">
                  <Icon name="Eye" size={16} />
                  {selectedArticle?.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={16} />
                  {selectedArticle && new Date(selectedArticle.lastUpdated).toLocaleDateString('ru-RU')}
                </span>
              </div>
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed text-lg">
                  {selectedArticle?.content}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-primary/20">
                {selectedArticle?.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="border-primary/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] bg-card/95 border-2 border-primary/40 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">{selectedStory?.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground border-b-2 border-primary/20 pb-4">
                <span className="flex items-center gap-1">
                  <Icon name="User" size={16} />
                  {selectedStory?.author}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={16} />
                  {selectedStory?.readTime}
                </span>
              </div>
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed text-lg" style={{ textAlign: 'justify' }}>
                  {selectedStory?.content}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-primary/20">
                {selectedStory?.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="border-primary/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
