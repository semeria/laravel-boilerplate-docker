import { router } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import DashboardFooter from '../Pages/Dashboard/Components/DashboardFooter';
import DashboardHeader from '../Pages/Dashboard/Components/DashboardHeader';
import DashboardSidebar from '../Pages/Dashboard/Components/Sidebar/DashboardSidebar';
import MobileDashboardNav from '../Pages/Dashboard/Components/Sidebar/MobileDashboardNav';
import useDashboardMotion from '../Pages/Dashboard/hooks/useDashboardMotion';
import useSidebarMotion from '../Pages/Dashboard/hooks/useSidebarMotion';

export default function DashboardLayout({
    user,
    laravelVersion,
    phpVersion,
    themePreference = 'system',
    activePage = 'dashboard',
    search,
    onSearch,
    children,
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const dashboardRef = useRef(null);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const root = document.documentElement;
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const applyTheme = () => {
            root.dataset.themePreference = themePreference;
            root.classList.toggle('dark', themePreference === 'dark' || (themePreference === 'system' && media.matches));
        };

        applyTheme();
        media.addEventListener('change', applyTheme);

        return () => media.removeEventListener('change', applyTheme);
    }, [themePreference]);

    useDashboardMotion(dashboardRef);
    useSidebarMotion(sidebarRef, sidebarCollapsed);

    const toggleSidebar = useCallback(() => setSidebarCollapsed((collapsed) => !collapsed), []);
    const toggleMobileSidebar = useCallback(() => setMobileSidebarOpen((open) => !open), []);
    const closeMobileSidebar = useCallback(() => setMobileSidebarOpen(false), []);

    return (
        <div ref={dashboardRef} id="dashboard" className="min-h-screen bg-[#f6f7f4] text-slate-900">
            <div className="mx-auto flex min-h-screen max-w-[1720px]">
                <DashboardSidebar sidebarRef={sidebarRef} collapsed={sidebarCollapsed} activePage={activePage} />

                <div className="flex min-w-0 flex-1 flex-col">
                    <DashboardHeader
                        user={user}
                        search={search}
                        onSearch={onSearch}
                        onLogout={() => router.post('/logout')}
                        sidebarCollapsed={sidebarCollapsed}
                        onToggleSidebar={toggleSidebar}
                        mobileSidebarOpen={mobileSidebarOpen}
                        onToggleMobileSidebar={toggleMobileSidebar}
                    />
                    <MobileDashboardNav open={mobileSidebarOpen} onClose={closeMobileSidebar} activePage={activePage} />

                    <main className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
                        <div className="mx-auto max-w-[1400px]">
                            {children}
                            <DashboardFooter laravelVersion={laravelVersion} phpVersion={phpVersion} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
