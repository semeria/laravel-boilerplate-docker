export default function DashboardFooter({ laravelVersion, phpVersion }) {
    return (
        <footer data-dashboard-reveal className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/80 pt-4 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} Semeria BP. Todos los derechos reservados.</span>
            <span>Laravel {laravelVersion} · PHP {phpVersion}</span>
        </footer>
    );
}
