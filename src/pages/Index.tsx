import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import HomePage from '@/components/HomePage';
import EncyclopediaPage from '@/components/EncyclopediaPage';
import StoriesPage from '@/components/StoriesPage';
import TimelinePage from '@/components/TimelinePage';
import ArticleDialog from '@/components/ArticleDialog';
import StoryDialog from '@/components/StoryDialog';
import FavoritesSection from '@/components/FavoritesSection';
import { mockArticles, mockStories, Article, Story } from '@/data/mockData';

const allTags = Array.from(new Set(mockArticles.flatMap(a => a.tags)));

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'encyclopedia' | 'timeline' | 'stories'>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

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
          <HomePage onNavigate={setActiveTab} />
        )}

        {activeTab === 'encyclopedia' && (
          <>
            <EncyclopediaPage
              articles={filteredArticles}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedTags={selectedTags}
              onToggleTag={toggleTag}
              allTags={allTags}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onArticleClick={setSelectedArticle}
            />
            <FavoritesSection
              articles={mockArticles}
              favorites={favorites}
              onArticleClick={setSelectedArticle}
            />
          </>
        )}

        {activeTab === 'timeline' && <TimelinePage />}

        {activeTab === 'stories' && (
          <StoriesPage stories={filteredStories} onStoryClick={setSelectedStory} />
        )}
      </div>

      <ArticleDialog article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      <StoryDialog story={selectedStory} onClose={() => setSelectedStory(null)} />
    </div>
  );
}
