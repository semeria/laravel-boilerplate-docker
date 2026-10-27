import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function useSidebarMotion(sidebarRef, collapsed) {
    useEffect(() => {
        const sidebar = sidebarRef.current;

        if (!sidebar) return undefined;

        const width = collapsed ? 76 : 256;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.set(sidebar, { width });
            return undefined;
        }

        const tween = gsap.to(sidebar, {
            width,
            duration: 0.28,
            ease: 'power2.inOut',
            overwrite: 'auto',
        });

        return () => tween.kill();
    }, [sidebarRef, collapsed]);
}
