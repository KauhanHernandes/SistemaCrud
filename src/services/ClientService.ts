import { Client } from '../types/Client';

const STORAGE_KEY = 'clients';

export const ClientService = {
  getAll: (): Client[] => {
    const clients = localStorage.getItem(STORAGE_KEY);
    return clients ? JSON.parse(clients) : [];
  },

  getById: (id: string): Client | undefined => {
    const clients = ClientService.getAll();
    return clients.find(client => client.id === id);
  },

  create: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Client => {
    const clients = ClientService.getAll();
    
    const newClient: Client = {
      ...client,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...clients, newClient]));
    return newClient;
  },

  update: (id: string, clientData: Partial<Omit<Client, 'id' | 'createdAt' | 'updatedAt'>>): Client | undefined => {
    const clients = ClientService.getAll();
    const clientIndex = clients.findIndex(client => client.id === id);
    
    if (clientIndex === -1) return undefined;
    
    const updatedClient: Client = {
      ...clients[clientIndex],
      ...clientData,
      updatedAt: new Date().toISOString()
    };
    
    clients[clientIndex] = updatedClient;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
    
    return updatedClient;
  },

  delete: (id: string): boolean => {
    const clients = ClientService.getAll();
    const filteredClients = clients.filter(client => client.id !== id);
    
    if (filteredClients.length === clients.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredClients));
    return true;
  },
  
  // Utility method to clear all clients (for testing)
  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  }
};