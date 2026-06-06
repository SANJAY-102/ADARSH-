import { create } from 'zustand'

interface GameState {
  gameStarted: boolean
  startGame: () => void
  podcastCounter: number
  isPodcastRunning: boolean
  speedMultiplier: number
  powerLevel: number
  health: number
  currentSpeed: number
  startPodcast: () => void
  incrementPodcast: () => void
  boostSpeed: () => void
  addPower: () => void
  takeDamage: () => void
  setCurrentSpeed: (speed: number) => void
}

export const useStore = create<GameState>((set) => ({
  gameStarted: false,
  startGame: () => set({ gameStarted: true }),
  podcastCounter: 0,
  isPodcastRunning: false,
  speedMultiplier: 1,
  powerLevel: 0,
  health: 100,
  currentSpeed: 0,
  startPodcast: () => set({ isPodcastRunning: true }),
  incrementPodcast: () => set((state) => ({ podcastCounter: state.podcastCounter + 1 })),
  boostSpeed: () => {
    set({ speedMultiplier: 5 })
    set((state) => ({ powerLevel: state.powerLevel + 20 }))
    setTimeout(() => set({ speedMultiplier: 1 }), 5000)
  },
  addPower: () => set((state) => ({ powerLevel: state.powerLevel + 10 })),
  takeDamage: () => set((state) => ({ health: Math.max(0, state.health - 1) })),
  setCurrentSpeed: (speed) => set({ currentSpeed: speed })
}))
