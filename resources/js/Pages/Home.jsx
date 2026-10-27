import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AppBrand from '../Components/AppBrand';

export default function Home({ laravelVersion, phpVersion }) {
    const [viteConnected, setViteConnected] = useState(import.meta.env.DEV);

    useEffect(() => {
        if (!import.meta.env.DEV || !import.meta.hot) return;

        const handleConnect = () => setViteConnected(true);
        const handleDisconnect = () => setViteConnected(false);
        let mounted = true;

        import.meta.hot.on('vite:ws:connect', handleConnect);
        import.meta.hot.on('vite:ws:disconnect', handleDisconnect);

        fetch(import.meta.url, { cache: 'no-store' })
            .then((response) => {
                if (mounted) setViteConnected(response.ok);
            })
            .catch(() => {
                if (mounted) setViteConnected(false);
            });

        return () => {
            mounted = false;
            import.meta.hot.off('vite:ws:connect', handleConnect);
            import.meta.hot.off('vite:ws:disconnect', handleDisconnect);
        };
    }, []);

    const statusCards = [
        {
            name: 'Laravel',
            detail: `Framework ${laravelVersion} · PHP ${phpVersion}`,
            status: 'Backend respondiendo',
            active: true,
        },
        {
            name: 'Vite',
            detail: import.meta.env.DEV ? 'Servidor de desarrollo y HMR' : 'Assets compilados',
            status: import.meta.env.DEV
                ? viteConnected ? 'Vite conectado' : 'Vite desconectado'
                : 'Frontend cargado',
            active: !import.meta.env.DEV || viteConnected,
        },
    ];

    return (
        <>
            <Head title="Estado del entorno" />
            <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
                <div className="mx-auto flex min-h-[75vh] max-w-5xl flex-col justify-center">
                    <AppBrand inverse className="mb-10" />

                    <span className="mb-5 w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
                        Página servida correctamente
                    </span>
                    <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight sm:text-7xl">
                        Tu entorno está <span className="text-brand-400">respondiendo.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                        Esta página usa props de Laravel y se monta con React a través de Inertia.
                        El estado de Vite refleja la conexión del servidor de desarrollo.
                    </p>

                    <section aria-label="Estado de dependencias" className="mt-12 grid gap-4 sm:grid-cols-2">
                        {statusCards.map(({ name, detail, status, active }) => (
                            <article key={name} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/10">
                                <div className="flex items-center justify-between gap-4">
                                    <h2 className="text-xl font-semibold">{name}</h2>
                                    <span className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${active ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'}`}>
                                        <span className={`size-2 rounded-full ${active ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                                        {status}
                                    </span>
                                </div>
                                <p className="mt-4 text-sm text-slate-400">{detail}</p>
                            </article>
                        ))}
                    </section>

                    <p className="mt-10 text-sm text-slate-500">
                        Interfaz construida con React, Inertia y Tailwind CSS.
                    </p>
                </div>
            </main>
        </>
    );
}
