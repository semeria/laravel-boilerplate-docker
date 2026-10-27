import AppBrand from '../../../../Components/AppBrand';

export default function SidebarBrand({ href, collapsed = false, onNavigate }) {
    return <AppBrand href={href} onClick={onNavigate} compact={collapsed} className={`mb-9 px-2 ${collapsed ? 'w-full justify-center' : ''}`} />;
}
