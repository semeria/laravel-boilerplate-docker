import { dashboardSummary, weeklyBalance } from '../data/dashboardDemo';
import { formatCurrency } from '../data/formatters';

export default function BalanceOverview({ className = '' }) {
    const chart = { top: 18, baseline: 150, left: 46, width: 610, barWidth: 34 };
    const min = Math.min(...weeklyBalance.map((item) => item.balance)) - 300;
    const max = Math.max(...weeklyBalance.map((item) => item.balance)) + 250;
    const plotHeight = chart.baseline - chart.top;
    const step = chart.width / weeklyBalance.length;

    return (
        <section data-dashboard-reveal aria-labelledby="balance-title" className={`rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.28)] sm:p-7 ${className}`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">Balance disponible</p>
                    <h2 id="balance-title" className="mt-1 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{formatCurrency(dashboardSummary.balance)}</h2>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500"><span className="rounded-full bg-lime-100 px-2 py-1 font-semibold text-lime-800">+4.8%</span> crecimiento esta semana</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">Últimos 7 días</span>
            </div>
            <div className="mt-7 overflow-x-auto">
                <svg className="h-48 w-full min-w-[480px]" viewBox="0 0 700 180" role="img" aria-label="Evolución ilustrativa del balance durante los últimos siete días">
                    {[0, 1, 2].map((line) => {
                        const y = chart.top + (plotHeight / 2) * line;
                        return <line key={line} x1="34" y1={y} x2="686" y2={y} stroke="#e8edf0" strokeDasharray="3 6" />;
                    })}
                    {weeklyBalance.map((item, index) => {
                        const height = ((item.balance - min) / (max - min)) * plotHeight;
                        const x = chart.left + step * index + (step - chart.barWidth) / 2;
                        const y = chart.baseline - height;

                        return (
                            <g key={item.day}>
                                <rect data-chart-bar data-chart-baseline={chart.baseline} data-chart-y={y} data-chart-height={height} x={x} y={y} width={chart.barWidth} height={height} rx="8" fill={index === weeklyBalance.length - 1 ? '#892f9f' : '#dcaee3'} />
                                <text x={x + chart.barWidth / 2} y="174" textAnchor="middle" fill="#64748b" fontSize="11">{item.day}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </section>
    );
}
