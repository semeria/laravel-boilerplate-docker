import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Icon from '../Icon';
import SidebarBrand from './SidebarBrand';
import SidebarDemoNotice from './SidebarDemoNotice';
import SidebarNav from './SidebarNav';
import { mainLinks, resourceLinks } from './navigation';

export default function MobileDashboardNav({ open, onClose, activePage = 'dashboard' }) {
    const [mounted, setMounted] = useState(open);
    const overlayRef = useRef(null);
    const backdropRef = useRef(null);
    const panelRef = useRef(null);
    const closeButtonRef = useRef(null);

    const closeAndFocusTrigger = () => {
        onClose();
        document.getElementById('mobile-sidebar-toggle')?.focus();
    };
    const linksForPage = (links) => links.map((item) => ({
        ...item,
        href: activePage === 'dashboard' ? item.href : `/dashboard${item.href}`,
        active: activePage === 'dashboard' && item.active,
    }));

    useEffect(() => {
        if (open) setMounted(true);
    }, [open]);

    useEffect(() => {
        const desktopBreakpoint = window.matchMedia('(min-width: 64rem)');
        const closeOnDesktop = (event) => {
            if (event.matches) onClose();
        };

        desktopBreakpoint.addEventListener('change', closeOnDesktop);

        return () => desktopBreakpoint.removeEventListener('change', closeOnDesktop);
    }, [onClose]);

    useEffect(() => {
        if (!mounted) return undefined;

        const overlay = overlayRef.current;
        const backdrop = backdropRef.current;
        const panel = panelRef.current;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (open) {
            gsap.set(overlay, { visibility: 'visible', autoAlpha: 1 });

            if (prefersReducedMotion) {
                gsap.set([backdrop, panel], { clearProps: 'opacity,transform,visibility' });
            } else {
                gsap.fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'power1.out', overwrite: 'auto' });
                gsap.fromTo(panel, { xPercent: -100 }, { xPercent: 0, duration: 0.28, ease: 'power3.out', overwrite: 'auto' });
            }

            return () => gsap.killTweensOf([overlay, backdrop, panel]);
        }

        const closeAnimation = () => {
            gsap.set(overlay, { autoAlpha: 0, visibility: 'hidden' });
            setMounted(false);
        };

        if (prefersReducedMotion) {
            closeAnimation();
            return undefined;
        }

        const timeline = gsap.timeline({ onComplete: closeAnimation });
        timeline.to(panel, { xPercent: -100, duration: 0.2, ease: 'power2.in', overwrite: 'auto' });
        timeline.to(backdrop, { autoAlpha: 0, duration: 0.16, ease: 'power1.in' }, '<');

        return () => {
            timeline.kill();
            gsap.killTweensOf([overlay, backdrop, panel]);
        };
    }, [mounted, open]);

    useEffect(() => {
        if (!open || !mounted) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeAndFocusTrigger();
                return;
            }

            if (event.key !== 'Tab') return;

            const focusable = panelRef.current?.querySelectorAll('a[href], button:not([disabled])');
            if (!focusable?.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, mounted, onClose]);

    if (!mounted) return null;

    return (
        <div ref={overlayRef} aria-hidden={!open} inert={!open} className="fixed inset-0 z-50 lg:hidden">
            <button
                ref={backdropRef}
                type="button"
                tabIndex={-1}
                aria-label="Cerrar navegación"
                onClick={closeAndFocusTrigger}
                className="absolute inset-0 h-full w-full bg-slate-950/40"
            />
            <aside ref={panelRef} id="mobile-dashboard-sidebar" aria-label="Navegación del dashboard" className="relative flex h-full w-[min(20rem,85vw)] flex-col overflow-y-auto bg-white px-5 py-7 shadow-2xl shadow-slate-950/20">
                <div className="flex items-start justify-between">
                    <SidebarBrand href={activePage === 'dashboard' ? '#dashboard' : '/dashboard'} onNavigate={closeAndFocusTrigger} />
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={closeAndFocusTrigger}
                        aria-label="Cerrar menú de navegación"
                        className="flex size-9 shrink-0 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                        <Icon name="close" className="size-5" />
                    </button>
                </div>
                <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Espacio de trabajo</p>
                <SidebarNav label="Navegación principal móvil" items={linksForPage(mainLinks)} onNavigate={closeAndFocusTrigger} />
                <div className="my-6 border-t border-slate-100" />
                <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Recursos</p>
                <SidebarNav label="Recursos móviles" items={linksForPage(resourceLinks)} onNavigate={closeAndFocusTrigger} />
                <SidebarDemoNotice />
            </aside>
        </div>
    );
}
