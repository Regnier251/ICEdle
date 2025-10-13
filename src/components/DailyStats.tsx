interface DailyStatsProps {
  streak?: number;
  winRate?: number;
  totalGames?: number;
}

export const DailyStats: React.FC<DailyStatsProps> = ({
  streak = 0,
  winRate = 0,
  totalGames = 0,
}) => (
  <section className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-white/70 to-ice-primary/10 p-6 shadow-lg backdrop-blur">
    <header className="flex items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Estadísticas</h2>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
          Rendimiento diario
        </p>
      </div>
      <span className="rounded-full bg-ice-primary/15 px-3 py-1 text-xs font-semibold text-ice-primary">
        Beta
      </span>
    </header>

    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Racha</p>
        <p className="mt-2 text-3xl font-bold text-ice-primary">{streak}</p>
        <p className="text-xs text-slate-500">Días seguidos acertando</p>
      </div>
      <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Victorias</p>
        <p className="mt-2 text-3xl font-bold text-ice-correct">{winRate}%</p>
        <p className="text-xs text-slate-500">Porcentaje de aciertos</p>
      </div>
      <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Jugados</p>
        <p className="mt-2 text-3xl font-bold text-ice-partial">{totalGames}</p>
        <p className="text-xs text-slate-500">Partidas registradas</p>
      </div>
    </div>

    <div className="mt-6 rounded-2xl bg-slate-900/90 p-4 text-sm text-slate-100">
      <p className="font-semibold">Próximamente</p>
      <p className="mt-1 text-xs text-slate-300">
        Aquí podrás ver métricas detalladas de desempeño, compartir resultados y seguir tu progreso
        semanal.
      </p>
    </div>
  </section>
);
