import { v4 as uuidv4 } from 'uuid';

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'NEW' | 'IN_PROGRESS' | 'WAITING' | 'WON' | 'LOST';
    value: number;
    source: string;
}

let leads: Lead[] = [
    {
        id: '1',
        name: 'Carlos Oliveira',
        email: 'carlos@example.com',
        phone: '11999999999',
        status: 'NEW',
        value: 5000,
        source: 'Google Ads',
    },
    {
        id: '2',
        name: 'Ana Santos',
        email: 'ana@example.com',
        phone: '11988888888',
        status: 'IN_PROGRESS',
        value: 12000,
        source: 'Meta Ads',
    },
    {
        id: '3',
        name: 'Roberto Souza',
        email: 'roberto@example.com',
        phone: '11977777777',
        status: 'WON',
        value: 3500,
        source: 'Indicação',
    },
];

export const getLeads = async () => {
    return leads;
};

export const createLead = async (data: Omit<Lead, 'id'>) => {
    const newLead = { id: uuidv4(), ...data };
    leads.push(newLead);
    return newLead;
};

export const updateLead = async (id: string, data: Partial<Lead>) => {
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return null;

    leads[index] = { ...leads[index], ...data };
    return leads[index];
};

export const deleteLead = async (id: string) => {
    leads = leads.filter((l) => l.id !== id);
    return true;
};
