import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const pages = import.meta.glob([
    './Pages/**/*.jsx',
    '!./Pages/**/Components/**/*.jsx',
]);

createInertiaApp({
    title: (title) => title ? `${title} · Semeria BP.` : 'Semeria BP.',
    resolve: (name) => {
        const page = pages[`./Pages/${name}.jsx`];
        if (!page) throw new Error(`La página Inertia "${name}" no existe.`);
        return page();
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: { color: '#a03ab3' },
});
