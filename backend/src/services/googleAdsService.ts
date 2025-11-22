export const getGoogleCampaigns = async () => {
    // Mock data for now
    return [
        {
            id: '1',
            name: 'Search - Brand Awareness',
            status: 'ENABLED',
            impressions: 15000,
            clicks: 450,
            ctr: 3.0,
            cost: 1200.50,
            conversions: 15,
            platform: 'google',
        },
        {
            id: '2',
            name: 'Display - Retargeting',
            status: 'PAUSED',
            impressions: 5000,
            clicks: 50,
            ctr: 1.0,
            cost: 300.00,
            conversions: 2,
            platform: 'google',
        },
    ];
};
