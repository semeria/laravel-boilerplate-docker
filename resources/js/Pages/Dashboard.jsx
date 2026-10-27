import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import BalanceOverview from './Dashboard/Components/BalanceOverview';
import BudgetProgress from './Dashboard/Components/BudgetProgress';
import InsightCard from './Dashboard/Components/InsightCard';
import SavingsGoals from './Dashboard/Components/SavingsGoals';
import SummaryMetrics from './Dashboard/Components/SummaryMetrics';
import TransactionHistory from './Dashboard/Components/TransactionHistory';
import { transactions } from './Dashboard/data/dashboardDemo';

export default function Dashboard({ user, laravelVersion, phpVersion, themePreference = 'system' }) {
    const [search, setSearch] = useState('');
    const currentDate = new Intl.DateTimeFormat('es-MX', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date());
    const visibleTransactions = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return transactions;

        return transactions.filter((transaction) =>
            `${transaction.name} ${transaction.category} ${transaction.status}`.toLowerCase().includes(query),
        );
    }, [search]);
    const firstName = user?.name?.trim().split(/\s+/)[0] || 'Bienvenido';

    return (
        <>
            <Head title="Resumen financiero" />
            <DashboardLayout user={user} laravelVersion={laravelVersion} phpVersion={phpVersion} themePreference={themePreference} search={search} onSearch={setSearch}>
                <div data-dashboard-reveal className="mb-7 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-medium capitalize text-slate-500">{currentDate}</p>
                        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Hola, {firstName}</h1>
                        <p className="mt-1 text-sm text-slate-600">Aquí tienes el resumen de tus finanzas.</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">
                        <span className="size-2 rounded-full bg-amber-500" />
                        Escenario de muestra · cifras ficticias
                    </span>
                </div>

                <div className="grid gap-4 sm:gap-5 xl:grid-cols-12">
                    <SummaryMetrics className="xl:col-span-12" />
                    <BalanceOverview className="xl:col-span-8" />
                    <BudgetProgress className="xl:col-span-4" />
                    <SavingsGoals className="xl:col-span-5" />
                    <InsightCard className="xl:col-span-7" />

                    <TransactionHistory
                        className="xl:col-span-12"
                        transactions={visibleTransactions}
                        search={search}
                    />
                </div>

            </DashboardLayout>
        </>
    );
}
