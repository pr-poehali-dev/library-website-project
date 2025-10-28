import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function TimelinePage() {
  return (
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
  );
}
