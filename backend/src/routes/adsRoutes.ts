import { Router } from 'express';
import { getCampaigns, createCampaign, updateCampaign, deleteCampaign } from '../controllers/adsController.js';

const router = Router();

router.get('/campaigns', getCampaigns);
router.post('/campaigns', createCampaign);
router.put('/campaigns/:id', updateCampaign);
router.delete('/campaigns/:id', deleteCampaign);

export default router;
