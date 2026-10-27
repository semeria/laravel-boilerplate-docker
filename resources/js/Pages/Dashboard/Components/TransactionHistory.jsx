import { formatTransactionCurrency } from '../data/formatters';

export default function TransactionHistory({ className = '', transactions, search }) {
    return (
        <section id="transactions" data-dashboard-reveal aria-labelledby="transactions-title" className={`rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.28)] sm:p-6 ${className}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 id="transactions-title" className="text-base font-semibold text-slate-900">Movimientos recientes</h2>
                    <p className="mt-1 text-xs text-slate-500">Actividad reciente del escenario de muestra</p>
                </div>
                <span className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600">
                    Últimos 7 días <span aria-hidden="true">⌄</span>
                </span>
            </div>

            <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[580px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            <th className="pb-3 font-medium">Movimiento</th>
                            <th className="pb-3 font-medium">Categoría</th>
                            <th className="pb-3 font-medium">Fecha</th>
                            <th className="pb-3 text-right font-medium">Importe</th>
                            <th className="pb-3 text-right font-medium">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b border-slate-50 last:border-0">
                                <td className="py-3.5">
                                    <div className="flex items-center gap-3">
                                        <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${transaction.color}`}>{transaction.initials}</span>
                                        <span className="text-xs font-semibold text-slate-700">{transaction.name}</span>
                                    </div>
                                </td>
                                <td className="py-3.5 text-xs text-slate-500">{transaction.category}</td>
                                <td className="py-3.5 text-xs text-slate-500">{transaction.date}</td>
                                <td className={`py-3.5 text-right text-xs font-semibold ${transaction.type === 'income' ? 'text-emerald-700' : 'text-slate-700'}`}>{transaction.amount > 0 ? '+' : '−'}{formatTransactionCurrency(Math.abs(transaction.amount))}</td>
                                <td className="py-3.5 text-right">
                                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${transaction.status === 'Completado' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{transaction.status}</span>
                                </td>
                            </tr>
                        ))}
                        {transactions.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-10 text-center text-sm text-slate-500">No hay movimientos que coincidan con “{search}”.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
