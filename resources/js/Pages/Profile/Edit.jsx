import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import Icon from '../Dashboard/Components/Icon';

function FieldError({ message }) {
    return message ? <p className="mt-1.5 text-xs font-medium text-rose-600">{message}</p> : null;
}

function CardHeading({ icon, title, description }) {
    return (
        <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-800"><Icon name={icon} className="size-5" /></span>
            <div>
                <h2 className="text-base font-semibold text-slate-950">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
            </div>
        </div>
    );
}

export default function EditProfile({ user, laravelVersion, phpVersion, themePreference = 'system' }) {
    const [profileSaved, setProfileSaved] = useState(false);
    const [passwordSaved, setPasswordSaved] = useState(false);
    const profile = useForm({ name: user?.name ?? '' });
    const password = useForm({ current_password: '', password: '', password_confirmation: '' });
    const appearance = useForm({ theme_preference: themePreference });

    const saveProfile = (event) => {
        event.preventDefault();
        setProfileSaved(false);
        profile.patch('/profile', { onSuccess: () => setProfileSaved(true) });
    };

    const savePassword = (event) => {
        event.preventDefault();
        setPasswordSaved(false);
        password.patch('/profile/password', {
            onSuccess: () => {
                password.reset();
                setPasswordSaved(true);
            },
        });
    };

    const saveAppearance = (event) => {
        event.preventDefault();
        appearance.patch('/profile/appearance');
    };

    const inputClass = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100';
    const buttonClass = 'inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-60';

    return (
        <>
            <Head title="Mi perfil" />
            <DashboardLayout user={user} laravelVersion={laravelVersion} phpVersion={phpVersion} themePreference={themePreference} activePage="profile">
                <div data-dashboard-reveal className="mb-7">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-700">Cuenta</p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Mi perfil</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Administra la información de tu cuenta y mantén segura tu contraseña.</p>
                </div>

                <section data-dashboard-reveal className="mb-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.03] sm:p-7">
                    <CardHeading icon="sparkles" title="Apariencia" description="Elige el aspecto de Semeria BP. El modo automático sigue la preferencia actual de tu dispositivo." />
                    <form onSubmit={saveAppearance} className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="theme-preference" className="text-sm font-medium text-slate-700">Tema de la aplicación</label>
                            <select id="theme-preference" value={appearance.data.theme_preference} onChange={(event) => appearance.setData('theme_preference', event.target.value)} className={inputClass}>
                                <option value="light">Día</option>
                                <option value="dark">Noche</option>
                                <option value="system">Automático (sistema)</option>
                            </select>
                            <FieldError message={appearance.errors.theme_preference} />
                        </div>
                        <button type="submit" disabled={appearance.processing || appearance.data.theme_preference === themePreference} className={buttonClass}>{appearance.processing ? 'Guardando…' : 'Guardar apariencia'}</button>
                        {appearance.recentlySuccessful && <p role="status" className="pb-2 text-sm font-medium text-emerald-700">Preferencia guardada.</p>}
                    </form>
                </section>

                <div className="grid items-start gap-5 xl:grid-cols-2">
                    <section data-dashboard-reveal className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.03] sm:p-7">
                        <CardHeading icon="user" title="Información personal" description="Actualiza tu nombre. El correo asociado a la cuenta no se puede editar." />
                        <form onSubmit={saveProfile} className="mt-7 space-y-5">
                            <div>
                                <label htmlFor="profile-name" className="text-sm font-medium text-slate-700">Nombre</label>
                                <input id="profile-name" name="name" autoComplete="name" maxLength={255} required value={profile.data.name} onChange={(event) => { profile.setData('name', event.target.value); setProfileSaved(false); }} className={inputClass} />
                                <FieldError message={profile.errors.name} />
                            </div>
                            <div>
                                <label htmlFor="profile-email" className="text-sm font-medium text-slate-700">Correo electrónico</label>
                                <input id="profile-email" type="email" value={user?.email ?? ''} readOnly aria-readonly="true" className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-500`} />
                                <p className="mt-1.5 text-xs text-slate-500">El correo se utiliza para iniciar sesión y permanece protegido.</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                <button type="submit" disabled={profile.processing} className={buttonClass}>{profile.processing ? 'Guardando…' : 'Guardar cambios'}</button>
                                {profileSaved && <p role="status" className="text-sm font-medium text-emerald-700">Perfil actualizado.</p>}
                            </div>
                        </form>
                    </section>

                    <section data-dashboard-reveal className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.03] sm:p-7">
                        <CardHeading icon="lock" title="Cambiar contraseña" description="Confirma tu contraseña actual antes de elegir una nueva de al menos 8 caracteres." />
                        <form onSubmit={savePassword} className="mt-7 space-y-5">
                            <div>
                                <label htmlFor="current-password" className="text-sm font-medium text-slate-700">Contraseña actual</label>
                                <input id="current-password" name="current_password" type="password" autoComplete="current-password" required value={password.data.current_password} onChange={(event) => password.setData('current_password', event.target.value)} className={inputClass} />
                                <FieldError message={password.errors.current_password} />
                            </div>
                            <div>
                                <label htmlFor="new-password" className="text-sm font-medium text-slate-700">Nueva contraseña</label>
                                <input id="new-password" name="password" type="password" autoComplete="new-password" minLength={8} required value={password.data.password} onChange={(event) => password.setData('password', event.target.value)} className={inputClass} />
                                <FieldError message={password.errors.password} />
                            </div>
                            <div>
                                <label htmlFor="password-confirmation" className="text-sm font-medium text-slate-700">Confirmar contraseña</label>
                                <input id="password-confirmation" name="password_confirmation" type="password" autoComplete="new-password" minLength={8} required value={password.data.password_confirmation} onChange={(event) => password.setData('password_confirmation', event.target.value)} className={inputClass} />
                            </div>
                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                <button type="submit" disabled={password.processing} className={buttonClass}>{password.processing ? 'Actualizando…' : 'Actualizar contraseña'}</button>
                                {passwordSaved && <p role="status" className="text-sm font-medium text-emerald-700">Contraseña actualizada.</p>}
                            </div>
                        </form>
                    </section>
                </div>
            </DashboardLayout>
        </>
    );
}
