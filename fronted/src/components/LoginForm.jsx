import React, { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import Navbar from './Home/Navbar';
import Footer from './Home/Footer';

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, isLoading } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    const result = await login(email, password);
    if (result.success) navigate('/dashboard', { replace: true });
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-green-900 dark:bg-neutral-900 text-white">
      {/* Navbar arriba */}
      <Navbar />

      {/* Form centrado */}
      <div className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full sm:w-1/3 sm:h-1/4 flex flex-col justify-center px-8 md:px-32 bg-green-900 dark:bg-neutral-900"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Iniciar Sesión</h2>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 bg-white dark:bg-neutral-700 text-gray-800 dark:text-neutral-100 text-lg"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-purple-500 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-gray-100 text-lg"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-black/80 hover:bg-black/70 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
      </div>

      <Footer/>
    </div>
  );
};

export default LoginForm;
