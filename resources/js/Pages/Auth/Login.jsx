import { Head, useForm } from '@inertiajs/react';
import AppBrand from '../../Components/AppBrand';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(event) {
        event.preventDefault();
        post('/login', { onSuccess: () => setData('password', '') });
    }

    return (
        <>
            <Head title="Iniciar sesión" />
            <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-slate-100">
                <section className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 sm:p-10">
                    <AppBrand inverse className="mb-8" />
                    <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-300">Área privada</p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight">Iniciar sesión</h1>
                    <p className="mt-2 text-sm leading-6 text-slate-400">Ingresa con tu cuenta para acceder al dashboard de prueba.</p>

                    <form className="mt-8 space-y-5" onSubmit={submit}>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="email">Correo electrónico</label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="username"
                                autoFocus
                                required
                                value={data.email}
                                onChange={(event) => setData('email', event.target.value)}
                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
                                placeholder="tu@correo.com"
                            />
                            {errors.email && <p className="mt-2 text-sm text-rose-300" role="alert">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="password">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={data.password}
                                onChange={(event) => setData('password', event.target.value)}
                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
                                placeholder="••••••••••••"
                            />
                            {errors.password && <p className="mt-2 text-sm text-rose-300" role="alert">{errors.password}</p>}
                        </div>

                        <label className="flex items-center gap-3 text-sm text-slate-300">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(event) => setData('remember', event.target.checked)}
                                className="size-4 rounded border-slate-600 bg-slate-950 text-brand-500 focus:ring-brand-400"
                            />
                            Recordarme
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Ingresando…' : 'Ingresar al dashboard'}
                        </button>
                    </form>
                </section>
            </main>
        </>
    );
}
