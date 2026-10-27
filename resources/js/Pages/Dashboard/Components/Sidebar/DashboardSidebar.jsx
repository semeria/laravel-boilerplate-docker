import SidebarBrand from './SidebarBrand';
import SidebarDemoNotice from './SidebarDemoNotice';
import SidebarNav from './SidebarNav';
import { mainLinks, resourceLinks } from './navigation';

export default function DashboardSidebar({ sidebarRef, collapsed = false, activePage = 'dashboard' }) {
    const linksForPage = (links) => links.map((item) => ({
        ...item,
        href: activePage === 'dashboard' ? item.href : `/dashboard${item.href}`,
        active: activePage === 'dashboard' && item.active,
    }));

    return (
        <aside ref={sidebarRef} id="dashboard-sidebar" aria-label="Barra lateral del dashboard" className={`hidden w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white py-7 lg:sticky lg:top-0 lg:flex lg:h-screen ${collapsed ? 'px-3' : 'px-5'}`}>
            <SidebarBrand href={activePage === 'dashboard' ? '#dashboard' : '/dashboard'} collapsed={collapsed} />
            {!collapsed && <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Espacio de trabajo</p>}
            <SidebarNav label="Navegación principal" items={linksForPage(mainLinks)} collapsed={collapsed} />
            <div className="my-6 border-t border-slate-100" />
            {!collapsed && <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Recursos</p>}
            <SidebarNav label="Recursos" items={linksForPage(resourceLinks)} collapsed={collapsed} />
            <SidebarDemoNotice collapsed={collapsed} />
        </aside>
    );
}
