import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <p className="mb-6">Bienvenido a tu área privada 🚀</p>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
