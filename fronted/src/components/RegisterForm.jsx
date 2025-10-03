import React, { useState } from 'react';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from './Home/Navbar';
import Footer from './Home/Footer';
import api from '../utils/api';

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await api.post('/user/register', {
        nombre: form.name,
        correo: form.email,
        password: form.password
      });

      const backendMsg = res.data?.msg || "Registro exitoso";
      toast.success(backendMsg);
      setTimeout(() => navigate('/login', { replace: true }), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.msg || err.message || "Error al registrar";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-green-900 dark:bg-neutral-900 text-white flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-2/5 md:w-2/3 h-auto sm:h-1/4 bg-green-900 dark:bg-neutral-900 flex flex-col justify-center px-8 md:px-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Registrarse</h2>

          {/* Nombre */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
                className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-100 text-lg"
              />
            </div>
          </div>

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
                className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-100 text-lg"
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
                className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-100 text-lg"
              />
            </div>
          </div>

          {/* Confirmar Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Confirmar Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-100 text-lg"
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
                Registrando...
              </>
            ) : (
              'Registrarse'
            )}
          </button>
        </form>
      </div>

      <Footer />
      {/* Toastify container */}
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
  );
};

export default RegisterForm;
