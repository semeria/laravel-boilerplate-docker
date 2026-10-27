import { ArrowDownLeft } from 'lucide-react';

export default function AppBrand({ href, compact = false, inverse = false, className = '', onClick }) {
    const Element = href ? 'a' : 'div';
    const wordmarkColor = inverse ? 'text-white' : 'text-slate-900';
    const accentColor = inverse ? 'text-brand-300' : 'text-brand-700';

    return (
        <Element
            href={href}
            onClick={onClick}
            aria-label={href ? 'Semeria BP, ir al inicio' : undefined}
            className={`inline-flex shrink-0 items-center gap-2 ${className}`}
        >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white shadow-md shadow-brand-900/20">
                <ArrowDownLeft aria-hidden="true" className="size-5" strokeWidth={2.2} />
            </span>
            {!compact && (
                <span className={`text-lg font-extrabold tracking-tight ${wordmarkColor}`}>
                    Semeria <span className={accentColor}>BP.</span>
                </span>
            )}
        </Element>
    );
}
