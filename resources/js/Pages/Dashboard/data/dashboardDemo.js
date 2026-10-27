export const weeklyBalance = [
    { day: 'Dom', balance: 10800 },
    { day: 'Lun', balance: 11200 },
    { day: 'Mar', balance: 10950 },
    { day: 'Mié', balance: 11600 },
    { day: 'Jue', balance: 11900 },
    { day: 'Vie', balance: 11750 },
    { day: 'Sáb', balance: 12450 },
];

export const dashboardSummary = {
    balance: 12450,
    income: 15000,
    expenses: 6700,
    savings: 8300,
    budgetLimit: 10000,
    budgetSpent: 6700,
};

export const savingsGoals = [
    { name: 'Fondo de emergencia', current: 7200, target: 10000, color: 'bg-brand-500', icon: 'shieldCheck' },
    { name: 'Viaje de verano', current: 1850, target: 3500, color: 'bg-orange-400', icon: 'plane' },
    { name: 'Nuevo automóvil', current: 5600, target: 18000, color: 'bg-sky-400', icon: 'carFront' },
];

export const transactions = [
    { id: 1, name: 'Nómina mensual', category: 'Ingresos', date: '26 oct 2026', amount: 4200, type: 'income', status: 'Completado', initials: 'NM', color: 'bg-lime-100 text-lime-700' },
    { id: 2, name: 'Alquiler apartamento', category: 'Vivienda', date: '24 oct 2026', amount: -1450, type: 'expense', status: 'Completado', initials: 'AL', color: 'bg-amber-100 text-amber-700' },
    { id: 3, name: 'Mercado Central', category: 'Alimentación', date: '23 oct 2026', amount: -126.8, type: 'expense', status: 'Completado', initials: 'MC', color: 'bg-emerald-100 text-emerald-700' },
    { id: 4, name: 'Metro y transporte', category: 'Transporte', date: '22 oct 2026', amount: -42.5, type: 'expense', status: 'Completado', initials: 'MT', color: 'bg-sky-100 text-sky-700' },
    { id: 5, name: 'Devolución compra', category: 'Otros', date: '21 oct 2026', amount: 58.9, type: 'income', status: 'Pendiente', initials: 'DC', color: 'bg-violet-100 text-violet-700' },
];

export const demoMetrics = [
    { label: 'Ingresos del mes', value: 15000, change: '+5.1%', description: 'vs. mes anterior', positive: true, icon: 'arrowUp' },
    { label: 'Gastos del mes', value: 6700, change: '−2.8%', description: 'vs. mes anterior', positive: true, icon: 'arrowDown' },
    { label: 'Ahorro del mes', value: 8300, change: '+7.2%', description: 'vs. mes anterior', positive: true, icon: 'arrowUp' },
];
