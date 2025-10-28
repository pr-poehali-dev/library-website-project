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
    title: 'Драконьи Острова',
    description: 'Архипелаг в северных морях, где согласно легендам обитают последние древние драконы',
    category: 'География',
    tags: ['драконы', 'острова', 'география', 'легенды'],
    views: 1247,
    lastUpdated: '2024-10-15',
    content: `# Драконьи Острова\n\nАрхипелаг в северных морях, окутанный туманами и тайнами. Местные жители утверждают, что в глубинах пещер всё ещё живут древние драконы.\n\n## История\n\nВ эпоху Первого Пламени эти острова служили убежищем для драконьих кланов. После Великой Войны большинство драконов покинули эти земли, но старейшины говорят, что некоторые остались.\n\n## География\n\nОстрова состоят из:\n- **Главный остров Файрхейвен** - самый большой, с действующим вулканом\n- **Остров Теней** - покрыт густыми лесами\n- **Скалы Ветра** - цепь маленьких скалистых островков\n\n## Обитатели\n\nНа островах проживает около 5000 человек, в основном рыбаки и искатели приключений.`
  },
  {
    id: 2,
    title: 'Орден Серебряной Луны',
    description: 'Древний магический орден, хранящий знания о забытых заклинаниях',
    category: 'Организации',
    tags: ['магия', 'орден', 'история'],
    views: 892,
    lastUpdated: '2024-10-20',
    content: `# Орден Серебряной Луны\n\nОдна из старейших магических организаций, основанная более 800 лет назад.\n\n## Структура\n\nОрден делится на три круга:\n1. Внешний круг - ученики\n2. Внутренний круг - маги\n3. Совет Старейшин\n\n## Цели\n\nСохранение магических знаний и защита мира от тёмных сил.`
  },
  {
    id: 3,
    title: 'Война Пяти Королевств',
    description: 'Масштабный конфликт, изменивший карту мира',
    category: 'История',
    tags: ['война', 'королевства', 'история'],
    views: 2103,
    lastUpdated: '2024-10-25',
    content: `# Война Пяти Королевств\n\nКонфликт длился 12 лет и затронул все уголки континента.\n\n## Предпосылки\n\nНачалась из-за спора о наследовании престола Центрального Королевства.\n\n## Последствия\n\nМир был заключён лишь после вмешательства Ордена Серебряной Луны.`
  },
  {
    id: 4,
    title: 'Лесные эльфы',
    description: 'Древняя раса, живущая в гармонии с природой',
    category: 'Расы',
    tags: ['эльфы', 'расы', 'культура'],
    views: 634,
    lastUpdated: '2024-10-18',
    content: `# Лесные эльфы\n\nОдна из старейших рас этого мира, обладающая врождённой связью с природой.`
  },
  {
    id: 5,
    title: 'Руническая магия',
    description: 'Древнее искусство создания магических символов',
    category: 'Магия',
    tags: ['магия', 'руны', 'заклинания'],
    views: 3421,
    lastUpdated: '2024-10-27',
    content: `# Руническая магия\n\nИскусство создания и использования магических рун.`
  },
  {
    id: 6,
    title: 'Эпоха Первого Пламени',
    description: 'Золотой век драконов и древних магов',
    category: 'История',
    tags: ['история', 'драконы', 'магия'],
    views: 1156,
    lastUpdated: '2024-10-22',
    content: `# Эпоха Первого Пламени\n\nПериод расцвета магии и драконьих цивилизаций.`
  }
];

const mockStories = [
  {
    id: 1,
    title: 'Последний дракон Файрхейвена',
    description: 'Юный рыбак случайно обнаруживает пещеру с древним драконом',
    author: 'Автор мира',
    readTime: '15 мин',
    published: '2024-10-20',
    tags: ['драконы', 'приключения'],
    content: `Туман клубился над скалами, когда Элрик вытягивал сети. В этот раз улов оказался скудным — всего несколько мелких рыбёшек.\n\n"Проклятье," — пробормотал он, сматывая промокшую верёвку. — "Придётся забраться дальше в бухту."\n\nЛодка качнулась, когда он взялся за вёсла. Солнце уже клонилось к горизонту, окрашивая море в золотистые тона. Впереди маячили тёмные скалы восточного берега — место, которого рыбаки обычно избегали.\n\nСтарики рассказывали легенды о пещерах в этих скалах. О древних драконах, что спят там вечным сном. Но Элрик не верил в сказки.\n\nПока не услышал рёв, от которого содрогнулось само море...`
  },
  {
    id: 2,
    title: 'Тайна Серебряной Башни',
    description: 'Ученица Ордена расследует исчезновение древних артефактов',
    author: 'Автор мира',
    readTime: '20 мин',
    published: '2024-10-15',
    tags: ['магия', 'детектив', 'орден'],
    content: `Лира поднималась по спиральной лестнице, держа в руках светящийся кристалл. Свет танцевал на каменных стенах, отбрасывая причудливые тени.\n\nТретий артефакт исчез за эту неделю. Совет Старейшин был обеспокоен, но не желал поднимать тревогу. "Простая неосторожность," — сказали они.\n\nНо Лира знала лучше. Она видела следы магии в библиотеке. Кто-то проник в запретную секцию...`
  }
];

const categories = ['Все', 'География', 'Организации', 'История', 'Расы', 'Магия'];
const allTags = Array.from(new Set(mockArticles.flatMap(a => a.tags)));

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'encyclopedia' | 'stories'>('encyclopedia');
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">Хроники Забытых Земель</h1>
              <p className="text-sm text-muted-foreground mt-1">Энциклопедия авторского мира</p>
            </div>
            <div className="flex gap-3">
              <button className="p-2 hover:bg-card rounded-lg transition-colors">
                <Icon name="BookOpen" size={24} className="text-primary" />
              </button>
              <button className="p-2 hover:bg-card rounded-lg transition-colors">
                <Icon name="Moon" size={24} className="text-muted-foreground" />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по энциклопедии..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'encyclopedia' | 'stories')} className="mb-8">
          <TabsList className="bg-card border border-border mb-6">
            <TabsTrigger value="encyclopedia" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Book" size={18} className="mr-2" />
              Энциклопедия
            </TabsTrigger>
            <TabsTrigger value="stories" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="FileText" size={18} className="mr-2" />
              Рассказы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="encyclopedia">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="bg-card border border-border flex-wrap h-auto">
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
                      onClick={() => setSelectedArticle(article)}
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
          </TabsContent>

          <TabsContent value="stories">
            <div className="space-y-6">
              {filteredStories.map((story, index) => (
                <Card 
                  key={story.id}
                  className="bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer animate-fade-in"
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
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {favorites.length > 0 && activeTab === 'encyclopedia' && (
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Star" size={24} className="text-primary fill-primary" />
              Избранное
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockArticles.filter(a => favorites.includes(a.id)).map(article => (
                <Card 
                  key={article.id} 
                  className="bg-card border-border cursor-pointer hover:border-primary transition-colors"
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
        <DialogContent className="max-w-4xl max-h-[80vh] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">{selectedArticle?.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-4">
                <Badge variant="secondary">{selectedArticle?.category}</Badge>
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
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {selectedArticle?.content}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                {selectedArticle?.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">{selectedStory?.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-4">
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
                <div className="whitespace-pre-wrap text-foreground leading-relaxed text-lg">
                  {selectedStory?.content}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                {selectedStory?.tags.map(tag => (
                  <Badge key={tag} variant="outline">
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
