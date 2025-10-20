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
  <section className="to-ice-primary/10 rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-white/70 p-6 shadow-lg backdrop-blur">
    <header className="flex items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Estadísticas</h2>
        <p className="text-xs font-medium tracking-[0.25em] text-slate-400 uppercase">
          Rendimiento diario
        </p>
      </div>
      <span className="bg-ice-primary/15 text-ice-primary rounded-full px-3 py-1 text-xs font-semibold">
        Beta
      </span>
    </header>

    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Racha
        </p>
        <p className="text-ice-primary mt-2 text-3xl font-bold">{streak}</p>
        <p className="text-xs text-slate-500">Días seguidos acertando</p>
      </div>
      <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Victorias
        </p>
        <p className="text-ice-correct mt-2 text-3xl font-bold">{winRate}%</p>
        <p className="text-xs text-slate-500">Porcentaje de aciertos</p>
      </div>
      <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Jugados
        </p>
        <p className="text-ice-partial mt-2 text-3xl font-bold">{totalGames}</p>
        <p className="text-xs text-slate-500">Partidas registradas</p>
      </div>
    </div>

    <div className="mt-6 rounded-2xl bg-slate-900/90 p-4 text-sm text-slate-100">
      <p className="font-semibold">Próximamente</p>
      <p className="mt-1 text-xs text-slate-300">
        Aquí podrás ver métricas detalladas de desempeño, compartir resultados y
        seguir tu progreso semanal.
      </p>
    </div>
  </section>
);
