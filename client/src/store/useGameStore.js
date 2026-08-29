import { create } from 'zustand';

const useGameStore = create((set) => ({
  gameState: {
    _id: "",
    isOpen: false,
    players: [],
    words: []
  },
  setGameState: (newState) => set({ gameState: newState }),
}));

export default useGameStore;
