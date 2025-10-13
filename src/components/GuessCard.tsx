import type { GuessResult } from '../types/iceCream';
import { FeedbackGrid } from './FeedbackGrid';

interface GuessCardProps {
  guess: GuessResult;
  index: number;
}

export const GuessCard: React.FC<GuessCardProps> = ({ guess, index }) => (
  <article className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-5 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ice-primary/10 via-transparent to-ice-primary/10 opacity-0 transition group-hover:opacity-100" />
    <header className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
          Intento {index + 1}
        </p>
        <h3 className="mt-1 text-2xl font-semibold text-slate-900">{guess.flavor.name}</h3>
      </div>
      <span className="inline-flex items-center gap-2 rounded-full bg-ice-primary/15 px-3 py-1 text-xs font-semibold text-ice-primary">
        Base: {guess.flavor.base}
      </span>
    </header>

    <div className="grid gap-3 py-4 text-sm text-slate-600 sm:grid-cols-3">
      <div className="rounded-2xl bg-slate-50/80 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Color</p>
        <p className="text-base font-medium text-slate-900">
          {guess.flavor.color || 'Desconocido'}
        </p>
      </div>
      <div className="rounded-2xl bg-slate-50/80 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Origen</p>
        <p className="text-base font-medium text-slate-900">
          {guess.flavor.original_country || 'Desconocido'}
        </p>
      </div>
      <div className="rounded-2xl bg-slate-50/80 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Creación</p>
        <p className="text-base font-medium text-slate-900">
          {guess.flavor.creation_year || 'Desconocido'}
        </p>
      </div>
    </div>

    <div className="rounded-2xl border border-slate-100 bg-white/70 p-4">
      <FeedbackGrid matches={guess.matches} />
    </div>
  </article>
);
