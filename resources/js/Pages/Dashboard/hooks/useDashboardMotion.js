import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function useDashboardMotion(rootRef) {
    useEffect(() => {
        const root = rootRef.current;

        if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

        const context = gsap.context(() => {
            gsap.from('[data-dashboard-reveal]', {
                autoAlpha: 0,
                y: 18,
                duration: 0.55,
                stagger: 0.08,
                ease: 'power2.out',
                clearProps: 'all',
            });

            gsap.fromTo('[data-chart-bar]',
                { attr: { y: (_, element) => element.dataset.chartBaseline, height: 0 } },
                {
                    attr: {
                        y: (_, element) => element.dataset.chartY,
                        height: (_, element) => element.dataset.chartHeight,
                    },
                    duration: 0.8,
                    stagger: 0.07,
                    delay: 0.25,
                    ease: 'power3.out',
                },
            );

            gsap.fromTo('[data-dashboard-progress]',
                { width: '0%' },
                {
                    width: (_, element) => element.dataset.progressTarget,
                    duration: 0.85,
                    stagger: 0.12,
                    delay: 0.35,
                    ease: 'power2.out',
                },
            );
        }, root);

        return () => context.revert();
    }, [rootRef]);
}
