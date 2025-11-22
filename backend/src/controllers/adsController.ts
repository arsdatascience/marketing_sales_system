import { Request, Response } from 'express';
import * as campaignService from '../services/campaignService';

export const getCampaigns = async (req: Request, res: Response) => {
    try {
        const campaigns = await campaignService.getAllCampaigns();
        res.json(campaigns);
    } catch (error) {
        console.error('Erro ao buscar campanhas:', error);
        res.status(500).json({
            message: 'Falha ao buscar campanhas',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};

export const createCampaign = async (req: Request, res: Response) => {
    try {
        const { name, platform, budget, status } = req.body;

        // Validações
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Nome da campanha é obrigatório' });
        }

        if (!platform) {
            return res.status(400).json({ message: 'Plataforma é obrigatória' });
        }

        const campaign = await campaignService.createCampaign(req.body);
        res.status(201).json(campaign);
    } catch (error) {
        console.error('Erro ao criar campanha:', error);
        res.status(500).json({
            message: 'Falha ao criar campanha',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};

export const updateCampaign = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID da campanha é obrigatório' });
        }

        const campaign = await campaignService.updateCampaign(id, req.body);

        if (!campaign) {
            return res.status(404).json({ message: 'Campanha não encontrada' });
        }

        res.json(campaign);
    } catch (error) {
        console.error('Erro ao atualizar campanha:', error);
        res.status(500).json({
            message: 'Falha ao atualizar campanha',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};

export const deleteCampaign = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID da campanha é obrigatório' });
        }

        await campaignService.deleteCampaign(id);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir campanha:', error);
        res.status(500).json({
            message: 'Falha ao excluir campanha',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};
