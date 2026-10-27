import Icon from '../Icon';

export default function SidebarDemoNotice({ collapsed = false }) {
    return (
        <div className={`mt-auto rounded-2xl border border-brand-200/80 bg-brand-50/80 ${collapsed ? 'flex justify-center p-2' : 'p-4'}`} title={collapsed ? 'Modo de muestra' : undefined}>
            <div className="flex size-9 items-center justify-center rounded-xl bg-brand-500 text-white">
                <Icon name="chart" className="size-4" />
            </div>
            {!collapsed && (
                <>
                    <p className="mt-4 text-sm font-semibold text-slate-900">Modo de muestra</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">Estas cifras son de ejemplo y no se guardan.</p>
                </>
            )}
        </div>
    );
}
