import { Request, Response } from 'express';
import * as leadService from '../services/leadService';

export const getLeads = async (req: Request, res: Response) => {
    try {
        const leads = await leadService.getLeads();
        res.json(leads);
    } catch (error) {
        console.error('Erro ao buscar leads:', error);
        res.status(500).json({
            message: 'Falha ao buscar leads',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};

export const createLead = async (req: Request, res: Response) => {
    try {
        const { name, email, phone } = req.body;

        // Validações
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Nome do lead é obrigatório' });
        }

        if (!email && !phone) {
            return res.status(400).json({ message: 'Email ou telefone é obrigatório' });
        }

        const lead = await leadService.createLead(req.body);
        res.status(201).json(lead);
    } catch (error) {
        console.error('Erro ao criar lead:', error);
        res.status(500).json({
            message: 'Falha ao criar lead',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};

export const updateLead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID do lead é obrigatório' });
        }

        const lead = await leadService.updateLead(id, req.body);

        if (!lead) {
            return res.status(404).json({ message: 'Lead não encontrado' });
        }

        res.json(lead);
    } catch (error) {
        console.error('Erro ao atualizar lead:', error);
        res.status(500).json({
            message: 'Falha ao atualizar lead',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};

export const deleteLead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID do lead é obrigatório' });
        }

        await leadService.deleteLead(id);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir lead:', error);
        res.status(500).json({
            message: 'Falha ao excluir lead',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};
