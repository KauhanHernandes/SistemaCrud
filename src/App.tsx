import React from 'react';
import ClientsPage from './pages/ClientsPage';
import { Building2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Building2 className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">Sistema de Cadastro de Clientes</h1>
        </div>
      </header>
      <main>
        <ClientsPage />
      </main>
      <footer className="bg-white mt-8 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Sistema de Cadastro de Clientes - Todos os direitos reservados
        </div>
      </footer>
    </div>
  );
}

export default App;