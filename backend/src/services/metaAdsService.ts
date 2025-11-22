export const getMetaCampaigns = async () => {
    // Mock data for now
    return [
        {
            id: '101',
            name: 'Instagram - Stories Promo',
            status: 'ACTIVE',
            impressions: 25000,
            clicks: 800,
            ctr: 3.2,
            cost: 850.00,
            conversions: 40,
            platform: 'meta',
        },
        {
            id: '102',
            name: 'Facebook - Feed Leads',
            status: 'ACTIVE',
            impressions: 12000,
            clicks: 300,
            ctr: 2.5,
            cost: 600.00,
            conversions: 25,
            platform: 'meta',
        },
    ];
};
