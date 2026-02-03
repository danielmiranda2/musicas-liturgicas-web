import { useState, useEffect, useCallback } from 'react';

export interface MusicData {
  id: string;
  data: string;
  periodo: string;
  musica_1: string;
  musica_2: string;
  musica_3: string;
  musica_4: string;
  enfase: string;
}

const STORAGE_KEY = 'musicas-liturgicas-2026';

const defaultMusicas: MusicData[] = [
  { id: '1', data: '08/02/2026', periodo: 'Epifania', musica_1: 'Aclame ao Senhor', musica_2: 'Nas Estrelas', musica_3: 'Louvemos ao Senhor', musica_4: 'Santo, Santo, Santo (Getty)', enfase: 'Glória, santidade e majestade de Deus' },
  { id: '2', data: '15/02/2026', periodo: 'Epifania', musica_1: 'Comunhão / Em Cristo', musica_2: 'Aclame ao Senhor', musica_3: 'Nas Estrelas', musica_4: 'Somente Pela Graça', enfase: 'Cristo revelado como Salvador gracioso' },
  { id: '3', data: '22/02/2026', periodo: 'Quaresma I', musica_1: 'Louvemos ao Senhor', musica_2: 'Comunhão / Em Cristo', musica_3: 'Aclame ao Senhor', musica_4: 'Em Cristo Só', enfase: 'Exclusividade e suficiência de Cristo' },
  { id: '4', data: '01/03/2026', periodo: 'Quaresma II', musica_1: 'Nas Estrelas', musica_2: 'Aclame ao Senhor', musica_3: 'Louvemos ao Senhor', musica_4: 'Graça Excelsa', enfase: 'Salvação imerecida' },
  { id: '5', data: '08/03/2026', periodo: 'Quaresma III', musica_1: 'Aclame ao Senhor', musica_2: 'Comunhão / Em Cristo', musica_3: 'Nas Estrelas', musica_4: 'O Senhor é Meu Pastor (Salmo 23)', enfase: 'Dependência e cuidado divino' },
  { id: '6', data: '15/03/2026', periodo: 'Quaresma IV', musica_1: 'Louvemos ao Senhor', musica_2: 'Nas Estrelas', musica_3: 'Comunhão / Em Cristo', musica_4: 'Ao Único', enfase: 'Glória somente a Deus (Soli Deo Gloria)' },
  { id: '7', data: '22/03/2026', periodo: 'Quaresma V', musica_1: 'Aclame ao Senhor', musica_2: 'Louvemos ao Senhor', musica_3: 'Nas Estrelas', musica_4: 'Cordeiro Santo', enfase: 'Cristo como sacrifício substitutivo' },
  { id: '8', data: '29/03/2026', periodo: 'Pré-Páscoa', musica_1: 'Comunhão / Em Cristo', musica_2: 'Aclame ao Senhor', musica_3: 'Louvemos ao Senhor', musica_4: 'Digno é o Cordeiro', enfase: 'A cruz à luz da glória futura' },
  { id: '9', data: '05/04/2026', periodo: 'Páscoa', musica_1: 'Nas Estrelas', musica_2: 'Comunhão / Em Cristo', musica_3: 'Aclame ao Senhor', musica_4: 'Cristo, Firme Rocha', enfase: 'Vitória, fundamento e segurança' },
  { id: '10', data: '12/04/2026', periodo: 'Páscoa II', musica_1: 'Aclame ao Senhor', musica_2: 'Louvemos ao Senhor', musica_3: 'Nas Estrelas', musica_4: 'Porque Ele Vive', enfase: 'Esperança viva' },
  { id: '11', data: '19/04/2026', periodo: 'Páscoa III', musica_1: 'Comunhão / Em Cristo', musica_2: 'Aclame ao Senhor', musica_3: 'Louvemos ao Senhor', musica_4: 'Vivo Está', enfase: 'Ressurreição proclamada' },
  { id: '12', data: '26/04/2026', periodo: 'Páscoa IV', musica_1: 'Nas Estrelas', musica_2: 'Comunhão / Em Cristo', musica_3: 'Aclame ao Senhor', musica_4: 'A Ele a Glória', enfase: 'Cristo reina, missão da igreja' },
];

export function useMusicasData() {
  const [musicas, setMusicas] = useState<MusicData[]>(defaultMusicas);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setMusicas(parsed);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever musicas changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(musicas));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [musicas, isLoaded]);

  const updateMusica = useCallback((id: string, updates: Partial<MusicData>) => {
    setMusicas(prev =>
      prev.map(m => m.id === id ? { ...m, ...updates } : m)
    );
  }, []);

  const deleteMusica = useCallback((id: string) => {
    setMusicas(prev => prev.filter(m => m.id !== id));
  }, []);

  const addMusica = useCallback((musica: Omit<MusicData, 'id'>) => {
    const newId = Math.max(...musicas.map(m => parseInt(m.id)), 0) + 1;
    setMusicas(prev => [...prev, { ...musica, id: newId.toString() }]);
  }, [musicas]);

  const resetToDefault = useCallback(() => {
    setMusicas(defaultMusicas);
  }, []);

  return {
    musicas,
    updateMusica,
    deleteMusica,
    addMusica,
    resetToDefault,
    isLoaded,
  };
}
