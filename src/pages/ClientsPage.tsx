import React, { useState, useEffect } from 'react';
import { ClientService } from '../services/ClientService';
import { Client } from '../types/Client';
import ClientList from '../components/ClientList';
import ClientForm from '../components/ClientForm';
import ClientDetails from '../components/ClientDetails';
import ConfirmDialog from '../components/ConfirmDialog';
import Notification, { NotificationType } from '../components/Notification';
import { Plus, Search } from 'lucide-react';

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: NotificationType; message: string; isVisible: boolean }>({
    type: 'success',
    message: '',
    isVisible: false
  });

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredClients(clients);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredClients(
        clients.filter(
          client =>
            client.name.toLowerCase().includes(term) ||
            client.tradeName.toLowerCase().includes(term) ||
            client.cnpj.includes(term)
        )
      );
    }
  }, [searchTerm, clients]);

  const loadClients = () => {
    const loadedClients = ClientService.getAll();
    setClients(loadedClients);
    setFilteredClients(loadedClients);
  };

  const handleCreateClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    ClientService.create(clientData);
    loadClients();
    setIsFormOpen(false);
    showNotification('success', 'Cliente cadastrado com sucesso!');
  };

  const handleUpdateClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedClient) {
      ClientService.update(selectedClient.id, clientData);
      loadClients();
      setIsFormOpen(false);
      setSelectedClient(undefined);
      showNotification('success', 'Cliente atualizado com sucesso!');
    }
  };

  const handleDeleteClient = () => {
    if (clientToDelete) {
      const success = ClientService.delete(clientToDelete);
      if (success) {
        loadClients();
        showNotification('success', 'Cliente excluído com sucesso!');
      } else {
        showNotification('error', 'Erro ao excluir cliente.');
      }
      setIsDeleteDialogOpen(false);
      setClientToDelete(null);
    }
  };

  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
    setIsFormOpen(true);
  };

  const handleViewClick = (client: Client) => {
    setSelectedClient(client);
    setIsViewOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setClientToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedClient(undefined);
  };

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({
      type,
      message,
      isVisible: true
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cadastro de Clientes</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Novo Cliente
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nome, nome fantasia ou CNPJ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <ClientList
          clients={filteredClients}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onView={handleViewClick}
        />
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <ClientForm
              client={selectedClient}
              onSubmit={selectedClient ? handleUpdateClient : handleCreateClient}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}

      {isViewOpen && selectedClient && (
        <ClientDetails
          client={selectedClient}
          onClose={() => {
            setIsViewOpen(false);
            setSelectedClient(undefined);
          }}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={handleDeleteClient}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
};

export default ClientsPage;