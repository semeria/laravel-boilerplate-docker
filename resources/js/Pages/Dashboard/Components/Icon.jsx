import {
    ArrowDown,
    ArrowLeftRight,
    ArrowUp,
    BookOpen,
    CarFront,
    ChartColumn,
    ChevronDown,
    CircleHelp,
    LayoutDashboard,
    LockKeyhole,
    LogOut,
    Menu,
    PanelLeftClose,
    PanelLeftOpen,
    Plane,
    Search,
    ShieldCheck,
    Sparkles,
    Target,
    UserRound,
    X,
} from 'lucide-react';

const icons = {
    dashboard: LayoutDashboard,
    arrows: ArrowLeftRight,
    chart: ChartColumn,
    target: Target,
    book: BookOpen,
    help: CircleHelp,
    search: Search,
    logout: LogOut,
    arrowUp: ArrowUp,
    arrowDown: ArrowDown,
    chevronDown: ChevronDown,
    user: UserRound,
    lock: LockKeyhole,
    menu: Menu,
    close: X,
    panelLeftClose: PanelLeftClose,
    panelLeftOpen: PanelLeftOpen,
    shieldCheck: ShieldCheck,
    plane: Plane,
    carFront: CarFront,
    sparkles: Sparkles,
};

export default function Icon({ name, className = 'size-5', strokeWidth = 1.7 }) {
    const IconComponent = icons[name] ?? LayoutDashboard;

    return (
        <IconComponent aria-hidden="true" className={className} strokeWidth={strokeWidth} />
    );
}
