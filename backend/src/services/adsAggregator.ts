import { getGoogleCampaigns } from './googleAdsService.js';
import { getMetaCampaigns } from './metaAdsService.js';

export const getAllCampaigns = async () => {
    const googleCampaigns = await getGoogleCampaigns();
    const metaCampaigns = await getMetaCampaigns();

    return [...googleCampaigns, ...metaCampaigns];
};
