import { useStore } from './store'
import { Play } from 'lucide-react'

export function UI() {
  const { gameStarted, startGame, currentSpeed } = useStore()

  if (!gameStarted) {
    const videoUrl = "/BACKGROUND VIDEO AT START/WhatsApp Video 2026-06-06 at 9.10.03 AM.mp4"
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 select-none">
        {/* Background Video (Bright and fully visible) */}
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none"
        />

        {/* Ambient Subtle Vignette Overlay (Slightly darkens edges for text legibility without blocking the video) */}
        <div className="absolute inset-0 bg-slate-950/30 backdrop-brightness-95 pointer-events-none" />

        {/* Glassmorphism Dialog Box */}
        <div className="relative z-10 max-w-2xl w-full mx-4 p-8 md:p-12 rounded-3xl bg-black/65 border border-cyan-500/35 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,204,0.2)] text-center flex flex-col items-center">
          
          {/* Pulsing Tag */}
          <div className="px-4 py-1.5 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-400 text-xs font-black uppercase tracking-widest mb-6 animate-pulse">
            COMEDY ROLEPLAY PORTFOLIO v2.0
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[0_0_20px_rgba(0,255,255,0.4)] mb-4">
            ANIPAGALU ADARSH GIRI
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-bold text-gray-300 mb-8 max-w-md">
            The Legend of Endless Talking & Cyber Buggy Simulator
          </p>

          {/* Prompt Achievements Teaser */}
          <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-5 mb-8 text-left space-y-2 max-w-lg">
            <p className="text-cyan-400 font-bold text-sm tracking-wider uppercase">✨ Legendary Features Inside:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-400 font-semibold">
              <div className="flex items-center gap-2">🟢 <span className="text-gray-300">TI Matriculation School</span></div>
              <div className="flex items-center gap-2">🟢 <span className="text-gray-300">Father Giridhar Lectures</span></div>
              <div className="flex items-center gap-2">🟢 <span className="text-gray-300">Chikku's Brother Kingdom</span></div>
              <div className="flex items-center gap-2">🟢 <span className="text-gray-300">Food Addiction City</span></div>
              <div className="flex items-center gap-2">🟢 <span className="text-gray-300">First & Second Love Zones</span></div>
              <div className="flex items-center gap-2">🟢 <span className="text-gray-300">24-Hour Podcast Arena</span></div>
            </div>
          </div>

          {/* Play Button */}
          <button
            onClick={startGame}
            className="group relative pointer-events-auto flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xl px-10 py-5 rounded-2xl shadow-[0_0_30px_rgba(0,255,204,0.4)] hover:shadow-[0_0_45px_rgba(0,255,204,0.6)] transition-all duration-300 active:scale-95 cursor-pointer uppercase tracking-wider"
          >
            <Play size={24} fill="currentColor" />
            Start Adventure
            {/* Ambient glowing aura */}
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
          </button>

          {/* Quick instructions */}
          <p className="text-xs text-gray-500 font-medium mt-6">
            Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-gray-400 border border-slate-700 font-mono">WASD</kbd> or <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-gray-400 border border-slate-700 font-mono">Arrows</kbd> to drive the vehicle once loaded.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden font-sans">
      {/* Bottom Left: Achievements Panel */}
      <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/10 w-64 pointer-events-auto">
        <h3 className="font-bold text-white mb-2 uppercase text-xs tracking-widest text-gray-400">Active Achievements</h3>
        <ul className="space-y-2">
          <li className="text-sm text-green-400 flex items-center gap-2"><span>✓</span> Master of Talking</li>
          <li className="text-sm text-green-400 flex items-center gap-2"><span>✓</span> Food Hunter Lvl 99</li>
          <li className="text-sm text-green-400 flex items-center gap-2"><span>✓</span> Avoided College</li>
        </ul>
      </div>

      {/* Bottom Right: Speedometer */}
      <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-cyan-500/20 pointer-events-auto hover:bg-black/80 transition min-w-[160px] flex flex-col items-center justify-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Speedometer</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-[0_0_10px_rgba(0,255,204,0.5)]">
            {Math.round(Math.abs(currentSpeed) * 8)}
          </span>
          <span className="text-xs font-bold text-gray-400 font-mono">km/h</span>
        </div>
        {/* Speed meter bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-100" 
            style={{ width: `${Math.min(100, (Math.round(Math.abs(currentSpeed) * 8) / 80) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
