// src/pages/Auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../firebase";
import Swal from "sweetalert2";
import { getUserDoc } from "../../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTestCredentials, setShowTestCredentials] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const userDoc = await getUserDoc(uid);
      if (!userDoc) throw new Error("No se pudo cargar la información del usuario.");

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: `Hola ${userDoc.nombre} ${userDoc.apellido}`,
        timer: 800,
        showConfirmButton: false,
      });

      if (userDoc.rol === "rrhh") {
        navigate("/rrhh", { replace: true });
      } else if (userDoc.rol === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/scan", { replace: true });
      }

    } catch (error) {
      console.error("Error en login:", error);

      let mensaje = "Error al iniciar sesión.";
      if (error.code === "auth/invalid-email") mensaje = "El formato del correo no es válido.";
      else if (error.code === "auth/user-not-found") mensaje = "No existe una cuenta con ese correo.";
      else if (error.code === "auth/wrong-password") mensaje = "Contraseña incorrecta.";
      else if (error.code === "auth/too-many-requests") mensaje = "Demasiados intentos. Espera unos minutos e inténtalo nuevamente.";
      else if (error.message) mensaje = error.message;

      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: mensaje,
      });
    } finally {
      setLoading(false);
    }
  };

  // Datos de prueba
  const testUsers = [
    { email: "rrhh@gmail.com", rol: "👑 Recursos Humanos", icon: "👥", color: "purple" },
    { email: "ventas@gmail.com", rol: "🏢 Ventas", icon: "📊", color: "blue" },
    { email: "compras@gmail.com", rol: "🏢 Compras", icon: "🛒", color: "green" },
  ];

  // Función para auto-completar credenciales
  const fillTestCredentials = (testEmail) => {
    setEmail(testEmail);
    setPassword("123456");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <span className="text-white text-2xl font-bold">R</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Sistema de Asistencias</h2>
          <p className="mt-2 text-gray-600">Municipio - Ingresa a tu cuenta</p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/60 p-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                placeholder="usuario@municipio.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  Iniciando sesión...
                </div>
              ) : (
                "Iniciar sesión"
              )}
            </button>

            {/* Separador */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-500">O prueba el sistema</span>
              </div>
            </div>

            {/* Botón para mostrar credenciales */}
            <button
              type="button"
              onClick={() => setShowTestCredentials(!showTestCredentials)}
              className="w-full text-sm text-gray-600 hover:text-red-600 flex items-center justify-center space-x-2 py-2"
            >
              <span>🔑</span>
              <span>{showTestCredentials ? 'Ocultar' : 'Mostrar'} credenciales de prueba</span>
              <span className={`transform transition-transform ${showTestCredentials ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Tarjeta de credenciales de prueba */}
            {showTestCredentials && (
              <div className="mt-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 overflow-hidden animate-fade-in">
                <div className="bg-amber-100/50 px-4 py-2 border-b border-amber-200">
                  <h3 className="text-sm font-semibold text-amber-800 flex items-center">
                    <span className="mr-2">🧪</span>
                    Usuarios de prueba (contraseña: 123456)
                  </h3>
                </div>
                <div className="p-3 space-y-2">
                  {testUsers.map((user, index) => (
                    <div
                      key={index}
                      onClick={() => fillTestCredentials(user.email)}
                      className="flex items-center justify-between p-2 bg-white/80 rounded-lg hover:bg-white hover:shadow-sm cursor-pointer transition-all border border-transparent hover:border-amber-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-${user.color}-100 rounded-full flex items-center justify-center text-lg`}>
                          {user.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.email}</div>
                          <div className="text-xs text-gray-500">{user.rol}</div>
                        </div>
                      </div>
                      <div className="text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs">Click para usar</span>
                        <span className="ml-1">→</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-100/30 px-3 py-2 border-t border-amber-200">
                  <p className="text-xs text-amber-700 flex items-center">
                    <span className="mr-1">💡</span>
                    Haz clic en cualquier usuario para auto-completar
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              © 2025 Municipalidad - Versión DEMO para portafolio
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}