import { GameBoard } from './components/GameBoard';

const App: React.FC = () => (
  <main className="relative min-h-screen overflow-hidden">
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.15),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(148,163,184,0.2),_transparent_45%)]" />
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-white/90 via-white/40 to-transparent" />
    <div className="relative z-10">
      <GameBoard />
    </div>
  </main>
);

export default App;
