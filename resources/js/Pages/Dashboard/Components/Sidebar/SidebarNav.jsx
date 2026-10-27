import SidebarNavItem from './SidebarNavItem';

export default function SidebarNav({ label, items, collapsed = false, onNavigate }) {
    return (
        <nav aria-label={label} className="space-y-1">
            {items.map((item) => (
                <SidebarNavItem key={item.label} {...item} collapsed={collapsed} onNavigate={onNavigate} />
            ))}
        </nav>
    );
}
