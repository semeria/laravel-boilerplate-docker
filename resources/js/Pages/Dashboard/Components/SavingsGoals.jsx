import { savingsGoals } from '../data/dashboardDemo';
import { formatCurrency } from '../data/formatters';
import Icon from './Icon';

export default function SavingsGoals({ className = '' }) {
    return (
        <section id="goals" data-dashboard-reveal aria-labelledby="goals-title" className={`rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.28)] ${className}`}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 id="goals-title" className="text-sm font-semibold text-slate-900">Metas de ahorro</h2>
                    <p className="mt-1 text-xs text-slate-500">Avance de tus objetivos de muestra</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">3 activas</span>
            </div>
            <ul className="mt-5 space-y-4">
                {savingsGoals.map((goal) => {
                    const progress = Math.round((goal.current / goal.target) * 100);

                    return (
                        <li key={goal.name}>
                            <div className="flex items-center gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600"><Icon name={goal.icon} className="size-4" /></span>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="truncate text-xs font-semibold text-slate-700">{goal.name}</p>
                                        <span className="shrink-0 text-[10px] text-slate-400">{progress}%</span>
                                    </div>
                                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label={`Progreso: ${goal.name}`} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                                        <div data-dashboard-progress data-progress-target={`${progress}%`} className={`h-full rounded-full ${goal.color}`} style={{ width: `${progress}%` }} />
                                    </div>
                                    <p className="mt-1 text-[10px] text-slate-500">{formatCurrency(goal.current)} de {formatCurrency(goal.target)}</p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
