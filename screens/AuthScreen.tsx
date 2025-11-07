import React, { useState } from 'react';

interface AuthScreenProps {
  onLogin: (name: string, password: string) => boolean;
  onRegister: (name: string, password: string) => boolean;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !password) {
      setError('Nombre y contraseña son requeridos.');
      return;
    }

    const success = isLogin ? onLogin(name, password) : onRegister(name, password);
    
    if (!success && isLogin) {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setName('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full filter blur-3xl opacity-40 animate-float1"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full filter blur-3xl opacity-40 animate-float2"></div>
            <div className="absolute bottom-[20%] left-[15%] w-60 h-60 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full filter blur-3xl opacity-40 animate-float3"></div>
        </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Gestor de Tarjeta Prepago</h1>
          <p className="text-slate-400 mt-2">Bienvenido. Inicia sesión o regístrate para continuar.</p>
        </div>
        <div className="w-full max-w-sm bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm border border-slate-700">
          <h2 className="text-2xl font-bold text-center text-white mb-6">{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">Nombre de Usuario</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-slate-400 mt-6">
            {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
            <button onClick={toggleMode} className="font-semibold text-indigo-400 hover:underline ml-2">
              {isLogin ? 'Regístrate' : 'Inicia Sesión'}
            </button>
          </p>
        </div>
      </div>
       <style>{`
        @keyframes float1 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(30px, 40px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes float2 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-40px, -30px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes float3 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(20px, -50px); }
          100% { transform: translate(0, 0); }
        }
        .animate-float1 { animation: float1 20s infinite ease-in-out; }
        .animate-float2 { animation: float2 25s infinite ease-in-out; }
        .animate-float3 { animation: float3 18s infinite ease-in-out; }
      `}</style>
    </div>
  );
};