import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import AppBrand from '../../../Components/AppBrand';
import Icon from './Icon';

function initials(name = '') {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'U';
}

export default function DashboardHeader({ user, search, onSearch, onLogout, sidebarCollapsed, onToggleSidebar, mobileSidebarOpen, onToggleMobileSidebar }) {
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const accountMenuRef = useRef(null);
    const accountButtonRef = useRef(null);

    useEffect(() => {
        if (!accountMenuOpen) return undefined;

        const handlePointerDown = (event) => {
            if (!accountMenuRef.current?.contains(event.target)) setAccountMenuOpen(false);
        };
        const handleKeyDown = (event) => {
            if (event.key !== 'Escape') return;

            setAccountMenuOpen(false);
            accountButtonRef.current?.focus();
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [accountMenuOpen]);

    return (
        <header className="sticky top-0 z-10 flex min-h-[76px] flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-xl sm:px-6 xl:px-10">
            <div className="flex items-center gap-2">
                <button
                    id="mobile-sidebar-toggle"
                    type="button"
                    onClick={onToggleMobileSidebar}
                    aria-expanded={mobileSidebarOpen}
                    aria-controls={mobileSidebarOpen ? 'mobile-dashboard-sidebar' : undefined}
                    aria-label={mobileSidebarOpen ? 'Cerrar navegación' : 'Abrir navegación'}
                    className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 lg:hidden"
                >
                    <Icon name={mobileSidebarOpen ? 'close' : 'menu'} className="size-5" />
                </button>
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    aria-expanded={!sidebarCollapsed}
                    aria-controls="dashboard-sidebar"
                    aria-label={sidebarCollapsed ? 'Mostrar barra lateral' : 'Ocultar barra lateral'}
                    title={sidebarCollapsed ? 'Mostrar barra lateral' : 'Ocultar barra lateral'}
                    className="hidden size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 lg:flex"
                >
                    <Icon name={sidebarCollapsed ? 'panelLeftOpen' : 'panelLeftClose'} className="size-5" />
                </button>
                <AppBrand href={onSearch ? '#dashboard' : '/dashboard'} className="lg:hidden" />
            </div>

            {onSearch && <label className="relative order-3 w-full sm:order-none sm:max-w-sm">
                <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                    aria-label="Buscar movimientos demo"
                    type="search"
                    value={search}
                    onChange={(event) => onSearch(event.target.value)}
                    placeholder="Buscar en tus movimientos"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
                />
            </label>}

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <div ref={accountMenuRef} className="relative">
                    <button
                        ref={accountButtonRef}
                        type="button"
                        onClick={() => setAccountMenuOpen((open) => !open)}
                        aria-expanded={accountMenuOpen}
                        aria-controls="account-menu"
                        aria-label={`Opciones de cuenta de ${user?.name || 'usuario demo'}`}
                        className="flex items-center gap-2 rounded-xl border border-transparent p-1.5 text-left transition hover:border-slate-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 sm:gap-2.5 sm:pl-3"
                    >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-900">{initials(user?.name)}</span>
                        <span className="hidden max-w-36 sm:block">
                            <span className="block truncate text-xs font-semibold text-slate-800">{user?.name}</span>
                            <span className="block truncate text-[11px] text-slate-500">{user?.email}</span>
                        </span>
                        <Icon name="chevronDown" className={`size-4 text-slate-500 transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div id="account-menu" hidden={!accountMenuOpen} aria-label="Opciones de cuenta" className="absolute right-0 top-full z-30 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
                        <div className="border-b border-slate-100 px-3 py-2.5">
                            <p className="truncate text-sm font-semibold text-slate-900">{user?.name}</p>
                            <p className="truncate text-xs text-slate-500">{user?.email}</p>
                        </div>
                        <Link
                            href="/profile"
                            onClick={() => setAccountMenuOpen(false)}
                            className="mt-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        >
                            <Icon name="user" className="size-4" />Ver perfil
                        </Link>
                        <button
                            type="button"
                            onClick={() => {
                                setAccountMenuOpen(false);
                                onLogout();
                            }}
                            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-rose-700 transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        >
                            <Icon name="logout" className="size-4" />
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
