import { Request, Response } from 'express';
import * as whatsappService from '../services/whatsappService.js';

export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await whatsappService.getMessages();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { to, content } = req.body;
        const message = await whatsappService.sendMessage(to, content);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message' });
    }
};

export const webhook = async (req: Request, res: Response) => {
    try {
        await whatsappService.receiveWebhook(req.body);
        res.status(200).send('OK');
    } catch (error) {
        res.status(500).send('Error');
    }
};
