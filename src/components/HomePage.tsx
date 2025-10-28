import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (tab: 'encyclopedia' | 'timeline' | 'stories') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
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
              onClick={() => onNavigate('encyclopedia')}
              className="p-6 bg-background/50 border-2 border-primary/30 rounded-lg hover:border-primary transition-all hover:shadow-lg group"
            >
              <Icon name="Book" size={32} className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg mb-2">Энциклопедия</h3>
              <p className="text-sm text-muted-foreground">Изучите мир, его народы и легенды</p>
            </button>
            <button
              onClick={() => onNavigate('timeline')}
              className="p-6 bg-background/50 border-2 border-primary/30 rounded-lg hover:border-primary transition-all hover:shadow-lg group"
            >
              <Icon name="Clock" size={32} className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg mb-2">История</h3>
              <p className="text-sm text-muted-foreground">Путешествие сквозь века</p>
            </button>
            <button
              onClick={() => onNavigate('stories')}
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
  );
}
