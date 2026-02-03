import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MusicData } from '@/hooks/useMusicasData';

interface AddMusicDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (musica: Omit<MusicData, 'id'>) => void;
}

const periodos = [
  'Epifania',
  'Quaresma I',
  'Quaresma II',
  'Quaresma III',
  'Quaresma IV',
  'Quaresma V',
  'Pré-Páscoa',
  'Páscoa',
  'Páscoa II',
  'Páscoa III',
  'Páscoa IV',
];

const emptyForm: Omit<MusicData, 'id'> = {
  data: new Date().toISOString().split('T')[0],
  periodo: 'Epifania',
  musica_1: '',
  musica_2: '',
  musica_3: '',
  musica_4: '',
  enfase: '',
};

export function AddMusicDialog({ open, onOpenChange, onAdd }: AddMusicDialogProps) {
  const [formData, setFormData] = useState<Omit<MusicData, 'id'>>(emptyForm);

  const handleChange = (field: keyof Omit<MusicData, 'id'>, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAdd = () => {
    if (formData.data && formData.periodo && formData.musica_1) {
      onAdd(formData);
      setFormData(emptyForm);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Adicionar Nova Música</DialogTitle>
          <DialogDescription>
            Preencha os dados da nova música para adicionar ao planejamento
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data">Data</Label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => handleChange('data', e.target.value)}
                className="border-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="periodo">Período Litúrgico</Label>
              <Select value={formData.periodo} onValueChange={(value) => handleChange('periodo', value)}>
                <SelectTrigger className="border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periodos.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="musica_1">Música 1 *</Label>
            <Input
              id="musica_1"
              value={formData.musica_1}
              onChange={(e) => handleChange('musica_1', e.target.value)}
              placeholder="Nome da primeira música"
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="musica_2">Música 2</Label>
            <Input
              id="musica_2"
              value={formData.musica_2}
              onChange={(e) => handleChange('musica_2', e.target.value)}
              placeholder="Nome da segunda música"
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="musica_3">Música 3</Label>
            <Input
              id="musica_3"
              value={formData.musica_3}
              onChange={(e) => handleChange('musica_3', e.target.value)}
              placeholder="Nome da terceira música"
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="musica_4">Música Nova</Label>
            <Input
              id="musica_4"
              value={formData.musica_4}
              onChange={(e) => handleChange('musica_4', e.target.value)}
              placeholder="Nome da música nova"
              className="border-2 border-primary"
            />
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="enfase">Ênfase Teológica</Label>
            <Textarea
              id="enfase"
              value={formData.enfase}
              onChange={(e) => handleChange('enfase', e.target.value)}
              placeholder="Descrição da ênfase teológica"
              className="border-2 resize-none"
              rows={3}
            />
          </div> */}

          <p className="text-sm text-muted-foreground">* Campo obrigatório</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleAdd}
            disabled={!formData.data || !formData.musica_1}
            className="bg-primary hover:bg-primary/90"
          >
            Adicionar Música
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
