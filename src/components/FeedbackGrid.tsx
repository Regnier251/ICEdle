// import type { GuessMatches } from '../types/iceCream';

// const attributeLabels: Record<keyof GuessMatches, { title: string; hint: string }> = {
//   name: {
//     title: 'Nombre',
//     hint: 'Coincide el sabor exacto.',
//   },
//   base: {
//     title: 'Base',
//     hint: 'Tipo de helado (leche, agua, crema).',
//   },
//   color: {
//     title: 'Color',
//     hint: 'Aproximación al color característico.',
//   },
//   country: {
//     title: 'Origen',
//     hint: 'País en el que surgió el sabor.',
//   },
//   year: {
//     title: 'Época',
//     hint: 'Año o década de creación.',
//   },
// };

// const statusStyles: Record<GuessMatches[keyof GuessMatches], string> = {
//   correct: 'border-ice-correct/30 bg-ice-correct text-white shadow-lg ring-1 ring-inset ring-ice-correct/40',
//   partial: 'border-ice-partial/30 bg-ice-partial text-slate-900 shadow-lg ring-1 ring-inset ring-ice-partial/40',
//   incorrect: 'border-ice-incorrect/30 bg-ice-incorrect text-white shadow-lg ring-1 ring-inset ring-ice-incorrect/40',
// };

// const statusCopy: Record<GuessMatches[keyof GuessMatches], string> = {
//   correct: '¡Exacto!',
//   partial: 'Muy cerca',
//   incorrect: 'Sin coincidencia',
// };

// interface FeedbackGridProps {
//   matches: GuessMatches;
// }

// export const FeedbackGrid: React.FC<FeedbackGridProps> = ({ matches }) => {
//   const entries: Array<[keyof GuessMatches, GuessMatches[keyof GuessMatches]]> = [
//     ['name', matches.name],
//     ['base', matches.base],
//     ['color', matches.color],
//     ['country', matches.country],
//     ['year', matches.year],
//   ];

//   return (
//     <div className="grid gap-3 text-sm sm:grid-cols-5">
//       {entries.map(([key, status]) => {
//         const { title, hint } = attributeLabels[key];
//         return (
//           <div
//             key={key}
//             className={`flex h-full flex-col justify-between rounded-2xl border px-3 py-4 text-center transition ${statusStyles[status]}`}
//           >
//             <div className="space-y-1">
//               <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
//                 {title}
//               </span>
//               <p className="text-lg font-semibold">{statusCopy[status]}</p>
//             </div>
//             <p className="mt-3 text-[11px] font-medium opacity-80">{hint}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
