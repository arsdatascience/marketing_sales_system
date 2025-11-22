import { Router } from 'express';
import { getMessages, sendMessage, webhook } from '../controllers/whatsappController.js';

const router = Router();

router.get('/messages', getMessages);
router.post('/messages', sendMessage);
router.post('/webhook', webhook);

export default router;
