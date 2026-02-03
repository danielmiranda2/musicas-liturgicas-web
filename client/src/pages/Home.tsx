/**
 * Design Philosophy: Minimalismo Sacro
 * - Inspired by illuminated manuscripts and stained glass
 * - Purple/Gold liturgical palette with subtle gradients
 * - Asymmetric grid with floating cards and smooth transitions
 * - Period indicators with icons, visual timeline, depth effects
 * - Now with full editing capabilities and local persistence
 */

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Music, Sparkles, Cross, Sun, Edit2, Trash2, Plus, RotateCcw } from "lucide-react";
import { useMusicasData, MusicData } from "@/hooks/useMusicasData";
import { EditMusicDialog } from "@/components/EditMusicDialog";
import { AddMusicDialog } from "@/components/AddMusicDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const periodConfig = {
  'Epifania': {
    color: 'from-amber-400 to-yellow-300',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-900',
    icon: Sparkles,
    heroImage: 'https://private-us-east-1.manuscdn.com/sessionFile/ye1bLzTaVayzF1XgikyrkE/sandbox/QGWLTuozyg2sv4c6BGC4v2-img-1_1770086999000_na1fn_ZXBpZmFuaWEtaGVybw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveWUxYkx6VGFWYXl6RjFYZ2lreXJrRS9zYW5kYm94L1FHV0xUdW96eWcyc3Y0YzZCR0M0djItaW1nLTFfMTc3MDA4Njk5OTAwMF9uYTFmbl9aWEJwWm1GdWFXRXRhR1Z5YncucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=lpHS9~EY0pv6693tgql98gQtdP3T0HSUN5dWpWQCwWbxhfF7kf2ZZCm36K26sGq8PBvczD2tVKqUbVyQQGOC12WMt6GHdFCZETvzG30jWCP7NfQ-UxHwzu7CdbNkkaZiX4F9mv-DOkGA7sKcJ9u8DEFvDQ~bbDh49oz1JAXwsjDp6LVUtQ3aS1KtV6MEsSM~RBxsIJCO5I73UqA3l678eExF0VJRO-H1h9N6~3f~9Pdxw-34jNdiv9bzeM2MtVTjAr1gCSo9oIUn8XQLgKDQioVDiN5-LZOW2HLmsTrOmsOVZOSjPiYluO4e-kAHa21bKlE5Rc2Mihz7Y8reREvjxw__',
    description: 'Manifestação de Cristo ao mundo'
  },
  'Quaresma': {
    color: 'from-purple-600 to-violet-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-900',
    icon: Cross,
    heroImage: 'https://private-us-east-1.manuscdn.com/sessionFile/ye1bLzTaVayzF1XgikyrkE/sandbox/QGWLTuozyg2sv4c6BGC4v2-img-2_1770086993000_na1fn_cXVhcmVzbWEtaGVybw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveWUxYkx6VGFWYXl6RjFYZ2lreXJrRS9zYW5kYm94L1FHV0xUdW96eWcyc3Y0YzZCR0M0djItaW1nLTJfMTc3MDA4Njk5MzAwMF9uYTFmbl9jWFZoY21WemJXRXRhR1Z5YncucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Gmlxg0FW--SmYfy9IqsKXEdae9-C1FjoNezpMgwBWuAtV7Nm1F59OjZRA3jvjuWAyfc6unIsvrUJ-DUnhJ5BsoDxYzolPWct5dOgNVzz~T~VW6Vf6BbY-fE2cjvEHNhuO~x633Q~jo1gJhhNuRH52S4Ffq6O6t64-U5W2QLIwofM13W36gKX7teGvZ39RsOA329nLs3vqOszrunMnL4ZdV3Y64oEGv2z5sjiWyefXSjcDgwQ~tKUkSNlQR6yeLEXBPxSDWFz0MsZQimSb4vMTsxPv00H5g1V~OWY1AxT2aS2Byuv0zfX5-ILGJ73fkThdUszWLQfOIuyaxvp9fWQPQ__',
    description: 'Arrependimento, cruz, dependência e graça'
  },
  'Páscoa': {
    color: 'from-yellow-200 to-amber-100',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-900',
    icon: Sun,
    heroImage: 'https://private-us-east-1.manuscdn.com/sessionFile/ye1bLzTaVayzF1XgikyrkE/sandbox/QGWLTuozyg2sv4c6BGC4v2-img-3_1770086997000_na1fn_cGFzY29hLWhlcm8.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveWUxYkx6VGFWYXl6RjFYZ2lreXJrRS9zYW5kYm94L1FHV0xUdW96eWcyc3Y0YzZCR0M0djItaW1nLTNfMTc3MDA4Njk5NzAwMF9uYTFmbl9jR0Z6WTI5aExXaGxjbTgucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=tbEaO9u68aV~ls9XAyLx1cQGv8xik6orvjT~ai012IHZYVYpCdy3uwK6GDR277~MqUiYefUKAVwSa5VLxxS36KTqjJ3IerDLP5EVKo9hFU~Uyswj8h9cyU1QCa6nUP-JEbcHIe5Bst25cQTI0ReGYNyfr65T97hfMjNMSTnd8y6Do0cUrMByTdZxmqgvkbTt5hbxbYq34CFH1pk2X0gBo8vO0NdtWCHW3H1XGlJ1zRMpPyhkA8vDga5pZSeU0fZ8czVkofXiilDl7W2fUdjhuNeGT~8g5tzTIeYV~yU169P8tTJZ~nGPzcOgTgZahdx2w23xmTKQlEfcbGtYMFmttw__',
    description: 'Ressurreição, vitória de Cristo e esperança'
  }
};

const getPeriodKey = (periodo: string): keyof typeof periodConfig => {
  if (periodo.includes('Epifania')) return 'Epifania';
  if (periodo.includes('Quaresma') || periodo.includes('Pré-Páscoa')) return 'Quaresma';
  return 'Páscoa';
};

export default function Home() {
  const { musicas, updateMusica, deleteMusica, addMusica, resetToDefault, isLoaded } = useMusicasData();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMusica, setEditingMusica] = useState<MusicData | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    let filtered = musicas;
    
    if (selectedPeriod !== 'todos') {
      filtered = filtered.filter(item => getPeriodKey(item.periodo) === selectedPeriod);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.musica_1.toLowerCase().includes(term) ||
        item.musica_2.toLowerCase().includes(term) ||
        item.musica_3.toLowerCase().includes(term) ||
        item.musica_4.toLowerCase().includes(term) ||
        item.enfase.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [selectedPeriod, searchTerm, musicas]);

  const currentPeriodConfig = selectedPeriod !== 'todos' 
    ? periodConfig[selectedPeriod as keyof typeof periodConfig]
    : null;

  const handleEdit = (musica: MusicData) => {
    setEditingMusica(musica);
    setShowEditDialog(true);
  };

  const handleSaveEdit = (musica: MusicData) => {
    updateMusica(musica.id, musica);
    toast.success('Música atualizada com sucesso!');
  };

  const handleDelete = (id: string) => {
    deleteMusica(id);
    setDeletingId(null);
    toast.success('Música removida com sucesso!');
  };

  const handleAdd = (musica: Omit<MusicData, 'id'>) => {
    addMusica(musica);
    toast.success('Música adicionada com sucesso!');
  };

  const handleReset = () => {
    resetToDefault();
    toast.success('Dados restaurados para o padrão original!');
  };

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Dynamic Background */}
      <div 
        className="relative h-[400px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: currentPeriodConfig 
            ? `url(${currentPeriodConfig.heroImage})`
            : `url(https://private-us-east-1.manuscdn.com/sessionFile/ye1bLzTaVayzF1XgikyrkE/sandbox/QGWLTuozyg2sv4c6BGC4v2-img-4_1770086995000_na1fn_bGl0dXJnaWNhbC1wYXR0ZXJu.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveWUxYkx6VGFWYXl6RjFYZ2lreXJrRS9zYW5kYm94L1FHV0xUdW96eWcyc3Y0YzZCR0M0djItaW1nLTRfMTc3MDA4Njk5NTAwMF9uYTFmbl9iR2wwZFhKbmFXTmhiQzF3WVhSMFpYSnUucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=eUvl-Dpg~5taPPczoJUJdVNxPY8Pc4h4gl710ezHS771De3YZTVVqxkrNjJdHzKclUZt9sDp9qYxakUPw36tV9Ifu-mumuni2r-Dm5e1~gjo0Uy8eQ3dPu8h3jgd9VB49sO9CLhniQbc3VmkWxsS35H7~JzM~7YXkev6DZXX6WLokxMrtk87JR1sPoymF1oyjTcGFYCPs0ZnWLyCxNTtfPeE82uQGIvTHlDkmfrMqbblFqQstT2Unj9d7DRTBHuF4BFfc58frMQNu758MS2uPMGHF0CT~y5Wk~mj6UAC13mtWqHW0uvMcssypO2TtKZ7ubYyxFkkRyEuhDmOdR0G6w__)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-shadow-soft animate-fade-in-up">
            Planejamento Musical Litúrgico
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light animate-fade-in-up animation-delay-200">
            Epifania • Quaresma • Páscoa 2026
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        {/* Period Tabs */}
        <Tabs defaultValue="todos" className="w-full mb-8" onValueChange={setSelectedPeriod}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <TabsList className="grid w-full md:w-auto grid-cols-4 h-auto p-1 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="todos" className="py-3 data-[state=active]:bg-white">
                <Calendar className="w-4 h-4 mr-2" />
                Todos
              </TabsTrigger>
              <TabsTrigger value="Epifania" className="py-3 data-[state=active]:bg-amber-100">
                <Sparkles className="w-4 h-4 mr-2" />
                Epifania
              </TabsTrigger>
              <TabsTrigger value="Quaresma" className="py-3 data-[state=active]:bg-purple-100">
                <Cross className="w-4 h-4 mr-2" />
                Quaresma
              </TabsTrigger>
              <TabsTrigger value="Páscoa" className="py-3 data-[state=active]:bg-yellow-100">
                <Sun className="w-4 h-4 mr-2" />
                Páscoa
              </TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowAddDialog(true)}
                className="bg-primary hover:bg-primary/90 whitespace-nowrap"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
              <Button 
                variant="outline"
                onClick={handleReset}
                className="whitespace-nowrap"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restaurar
              </Button>
            </div>
          </div>

          {/* Period Description */}
          {currentPeriodConfig && (
            <div className={`mb-6 p-6 rounded-xl border-2 ${currentPeriodConfig.borderColor} ${currentPeriodConfig.bgColor} animate-fade-in`}>
              <div className="flex items-center gap-3 mb-2">
                <currentPeriodConfig.icon className={`w-6 h-6 ${currentPeriodConfig.textColor}`} />
                <h2 className={`text-2xl font-bold ${currentPeriodConfig.textColor}`}>
                  {selectedPeriod}
                </h2>
              </div>
              <p className={`text-lg ${currentPeriodConfig.textColor}/80`}>
                {currentPeriodConfig.description}
              </p>
            </div>
          )}

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar música ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-xl border-2 border-border bg-white/80 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-lg"
            />
          </div>

          {/* Music Cards Grid */}
          <TabsContent value={selectedPeriod} className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredData.map((item, index) => {
                const periodKey = getPeriodKey(item.periodo);
                const config = periodConfig[periodKey];
                const Icon = config.icon;

                return (
                  <Card 
                    key={item.id}
                    className={`overflow-hidden border-2 ${config.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up group`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardHeader className={`bg-gradient-to-br ${config.color} text-white pb-4 relative`}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          <Calendar className="w-3 h-3 mr-1" />
                          {item.data}
                        </Badge>
                        <Icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-xl">{item.periodo}</CardTitle>
                      <CardDescription className="text-white/90 text-sm italic">
                        {item.enfase}
                      </CardDescription>
                      
                      {/* Edit/Delete buttons */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 bg-white/20 hover:bg-white/40 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => setDeletingId(item.id)}
                          className="p-2 bg-white/20 hover:bg-red-500/40 rounded-lg transition-colors"
                          title="Deletar"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Music className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm">{item.musica_1}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Music className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm">{item.musica_2}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Music className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm">{item.musica_3}</span>
                        </div>
                        <div className="flex items-start gap-2 pt-2 border-t">
                          <Sparkles className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                          <span className="text-sm font-semibold text-primary">{item.musica_4}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-16">
                <Music className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">
                  Nenhuma música encontrada para os critérios selecionados.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Statistics Section */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card className="text-center p-6 border-2 border-amber-200 bg-amber-50">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-amber-600" />
            <h3 className="text-3xl font-bold text-amber-900 mb-1">
              {musicas.filter(m => m.periodo.includes('Epifania')).length}
            </h3>
            <p className="text-amber-700">Domingos de Epifania</p>
          </Card>
          <Card className="text-center p-6 border-2 border-purple-200 bg-purple-50">
            <Cross className="w-12 h-12 mx-auto mb-3 text-purple-600" />
            <h3 className="text-3xl font-bold text-purple-900 mb-1">
              {musicas.filter(m => m.periodo.includes('Quaresma') || m.periodo.includes('Pré-Páscoa')).length}
            </h3>
            <p className="text-purple-700">Semanas de Quaresma</p>
          </Card>
          <Card className="text-center p-6 border-2 border-yellow-200 bg-yellow-50">
            <Sun className="w-12 h-12 mx-auto mb-3 text-yellow-600" />
            <h3 className="text-3xl font-bold text-yellow-900 mb-1">
              {musicas.filter(m => m.periodo.includes('Páscoa')).length}
            </h3>
            <p className="text-yellow-700">Domingos de Páscoa</p>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-muted-foreground">
          <p className="text-sm">
            🆕 Músicas novas destacadas • Planejamento baseado no calendário litúrgico cristão
          </p>
          <p className="text-xs mt-2">
            Suas alterações são salvas automaticamente
          </p>
        </div>
      </div>

      {/* Dialogs */}
      <EditMusicDialog
        open={showEditDialog}
        musica={editingMusica}
        onOpenChange={setShowEditDialog}
        onSave={handleSaveEdit}
      />

      <AddMusicDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAdd}
      />

      <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Música</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover esta música? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialog>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDelete(deletingId)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialog>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
