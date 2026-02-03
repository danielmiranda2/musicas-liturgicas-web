import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MusicData } from '@/hooks/useMusicasData';

interface EditMusicDialogProps {
  open: boolean;
  musica: MusicData | null;
  onOpenChange: (open: boolean) => void;
  onSave: (musica: MusicData) => void;
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

export function EditMusicDialog({ open, musica, onOpenChange, onSave }: EditMusicDialogProps) {
  const [formData, setFormData] = useState<MusicData | null>(musica);
  
    useEffect(() => {
    if (musica) {
      setFormData({ ...musica });
    }
  }, [musica]);

  const handleChange = (field: keyof MusicData, value: string) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      onOpenChange(false);
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Editar Música</DialogTitle>
          <DialogDescription>
            Modifique as informações da música para {formData.data}
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
            <Label htmlFor="musica_1">Música 1</Label>
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
