import { demoMetrics } from '../data/dashboardDemo';
import { formatCurrency } from '../data/formatters';
import Icon from './Icon';

export default function SummaryMetrics({ className = '' }) {
    return (
        <section aria-label="Indicadores del mes" className={`grid gap-3 sm:grid-cols-3 ${className}`}>
            {demoMetrics.map((metric) => (
                <article data-dashboard-reveal key={metric.label} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_32px_-28px_rgba(15,23,42,0.35)]">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium text-slate-500">{metric.label}</p>
                        <span className="flex size-8 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Icon name={metric.icon} className="size-4" /></span>
                    </div>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{formatCurrency(metric.value)}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="font-semibold text-emerald-700">{metric.change}</span>
                        <span className="text-slate-400">{metric.description}</span>
                    </div>
                </article>
            ))}
        </section>
    );
}
