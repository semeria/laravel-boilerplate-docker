import { dashboardSummary } from '../data/dashboardDemo';
import { formatCurrency } from '../data/formatters';

export default function BudgetProgress({ className = '' }) {
    const { budgetSpent: spent, budgetLimit: limit } = dashboardSummary;
    const percentage = Math.round((spent / limit) * 100);

    return (
        <section id="budget" data-dashboard-reveal aria-labelledby="budget-title" className={`rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.28)] ${className}`}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 id="budget-title" className="text-sm font-semibold text-slate-900">Límite de gasto mensual</h2>
                    <p className="mt-1 text-xs text-slate-500">Límite mensual de demostración</p>
                </div>
                <span className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-400">DEMO</span>
            </div>
            <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="Presupuesto utilizado" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
                <div data-dashboard-progress data-progress-target={`${percentage}%`} className="h-full rounded-full bg-brand-500" style={{ width: `${percentage}%` }} />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{formatCurrency(spent)} usados</span>
                <span className="text-slate-500">{percentage}% · {formatCurrency(limit)}</span>
            </div>
        </section>
    );
}
