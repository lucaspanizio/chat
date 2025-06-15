import { useState } from 'react';
import { Eye, EyeSlash } from 'phosphor-react';
import { useNavigate } from '@tanstack/react-router';
import { useFormLogin } from '@/hooks/use-form-login';
import { useSignIn } from '@/services/api/resources/login';
import { FormInput } from '@/pages/login/form-input';
import { useStorage } from '@/hooks/use-storage';

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { setStorage } = useStorage();

  const { signIn, isPending } = useSignIn();

  const { register, setError, errors, handleSubmit } = useFormLogin();

  const onSubmit = handleSubmit((formData) => {
    signIn(formData, {
      onSuccess: (data) => {
        if (!data.success) return;
        setStorage({ type: 'local', key: 'USER', value: data.user });
        setStorage({ type: 'session', key: 'TOKEN', value: data.token });
        navigate({ to: '/' });
      },
      onError: (error) => {
        setError('_server', error.message || 'Erro desconhecido. Tente novamente.');
      },
    });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b141a] via-[#131c21] to-[#1c262b] flex items-center justify-center px-4 text-white font-sans">
      <div className="w-full max-w-sm bg-[#1f2c34] rounded-xl shadow-2xl border border-[#26343c] overflow-hidden">
        <div className="px-6 pt-8 pb-2">
          <h2 className="text-2xl font-semibold text-emerald-400 text-center mb-6">
            Acesse sua conta
          </h2>

          <form onSubmit={onSubmit} className="space-y-5 text-base" autoComplete="off">
            <div className="relative">
              <label htmlFor="username" className="block text-sm text-gray-300 mb-1">
                Usuário
              </label>
              <div className="relative group">
                <FormInput
                  {...register('username')}
                  id="username"
                  type="text"
                  autoComplete="new-username"
                  placeholder="Digite seu nome de usuário"
                  disabled={isPending}
                  error={errors.username}
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
                Senha
              </label>
              <div className="relative group">
                <FormInput
                  {...register('password')}
                  id="password"
                  type="text"
                  autoComplete="new-password"
                  placeholder="Digite sua senha"
                  disabled={isPending}
                  error={errors.password}
                />

                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                  {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-semibold py-3 rounded-md shadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              {isPending ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <div
          role="alert"
          aria-live="assertive"
          className={`flex items-center justify-center text-sm font-semibold bg-red-900 bg-opacity-20 text-red-500
              px-4 py-2 rounded overflow-hidden h-8 transition-opacity duration-100
              ${!!errors._server ? 'opacity-100' : 'opacity-0'}
            `}>
          {errors._server}
        </div>

        <div className="bg-[#131c21] px-6 py-4 text-center text-sm text-gray-500 border-t border-[#26343c]">
          © {new Date().getFullYear()} Panizio Chat. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
}
