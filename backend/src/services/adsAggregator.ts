import { getGoogleCampaigns } from './googleAdsService';
import { getMetaCampaigns } from './metaAdsService';

export const getAllCampaigns = async () => {
    const googleCampaigns = await getGoogleCampaigns();
    const metaCampaigns = await getMetaCampaigns();

    return [...googleCampaigns, ...metaCampaigns];
};
