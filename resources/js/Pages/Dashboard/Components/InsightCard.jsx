import Icon from './Icon';

export default function InsightCard({ className = '' }) {
    return (
        <section id="insight" data-dashboard-reveal aria-labelledby="insight-title" className={`relative flex flex-wrap items-center justify-between gap-5 overflow-hidden rounded-3xl border border-brand-200/70 bg-gradient-to-br from-brand-50 via-white to-white p-5 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.28)] sm:p-6 ${className}`}>
            <div className="relative z-[1] max-w-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-800">Idea para este mes</p>
                <h2 id="insight-title" className="mt-2 text-lg font-semibold tracking-tight text-slate-900">Tu ahorro supera la mitad de tus ingresos</h2>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">En este escenario de muestra, reservar el ahorro al inicio del mes deja más margen para tus gastos planeados.</p>
            </div>
            <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-2xl bg-brand-200/70 text-brand-900"><Icon name="sparkles" className="size-6" /></span>
        </section>
    );
}
