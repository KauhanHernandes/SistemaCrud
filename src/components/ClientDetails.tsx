import React from 'react';
import { Client } from '../types/Client';
import { X } from 'lucide-react';

interface ClientDetailsProps {
  client: Client;
  onClose: () => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ client, onClose }) => {
  const formatCNPJ = (cnpj: string) => {
    const digits = cnpj.replace(/\D/g, '');
    if (digits.length !== 14) return cnpj;
    
    return digits.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Detalhes do Cliente</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">CNPJ</h3>
              <p className="mt-1 text-sm text-gray-900">{formatCNPJ(client.cnpj)}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nome</h3>
              <p className="mt-1 text-sm text-gray-900">{client.name}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nome Fantasia</h3>
              <p className="mt-1 text-sm text-gray-900">{client.tradeName}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-sm text-gray-900">{client.email}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Telefone</h3>
              <p className="mt-1 text-sm text-gray-900">{client.phone || '-'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Endereço</h3>
              <p className="mt-1 text-sm text-gray-900">{client.address || '-'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Cidade</h3>
              <p className="mt-1 text-sm text-gray-900">{client.city || '-'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Estado</h3>
              <p className="mt-1 text-sm text-gray-900">{client.state || '-'}</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Data de Cadastro</h3>
                <p className="mt-1 text-sm text-gray-900">{formatDate(client.createdAt)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Última Atualização</h3>
                <p className="mt-1 text-sm text-gray-900">{formatDate(client.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;