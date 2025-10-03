import { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from './Home/Navbar';
import Footer from './Home/Footer';
import api from '../utils/api'; 
import useAuthStore from '../store/useAuthStore';

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useAuthStore(state => state.setUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post('/user/login', { correo: form.correo, password: form.password });
      const backendMsg = res.data?.msg || "Login exitoso";
      setUser(res.data.user);
      toast.success(backendMsg);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const errorMsg = err.response?.data?.msg || err.message || "Error de conexión";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-green-900 dark:bg-neutral-900 text-white">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-2/5 md:w-10/12 sm:h-1/4 h-full flex flex-col justify-center px-8 md:px-32 bg-green-900 dark:bg-neutral-900"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Iniciar Sesión</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-neutral-500 bg-white dark:bg-neutral-700 text-gray-800 dark:text-neutral-100 text-lg"
              />
            </div>
          </div>

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
                className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-neutral-500 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-gray-100 text-lg"
              />
            </div>
          </div>

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
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
  );
};

export default LoginForm;
