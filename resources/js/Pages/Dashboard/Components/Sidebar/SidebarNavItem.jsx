import Icon from '../Icon';

export default function SidebarNavItem({ label, icon, href, active = false, disabled = false, collapsed = false, onNavigate }) {
    const className = `flex items-center rounded-xl py-2.5 text-sm font-medium transition ${collapsed ? 'justify-center px-2' : 'gap-3 px-3'} ${active ? 'bg-slate-100 text-slate-950' : 'text-slate-500'} ${disabled ? '' : 'hover:bg-slate-50 hover:text-slate-900'}`;

    if (disabled) {
        return (
            <span className={className} aria-disabled="true" aria-label={collapsed ? label : undefined} title={collapsed ? label : undefined}>
                <Icon name={icon} className="size-[18px]" />
                {!collapsed && label}
            </span>
        );
    }

    return (
        <a href={href} onClick={onNavigate} aria-current={active ? 'page' : undefined} aria-label={collapsed ? label : undefined} title={collapsed ? label : undefined} className={className}>
            <Icon name={icon} className="size-[18px]" />
            {!collapsed && label}
        </a>
    );
}
