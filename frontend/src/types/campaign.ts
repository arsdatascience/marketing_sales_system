export interface Campaign {
    id: string;
    name: string;
    platform: string;
    status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
    budget: number | null;
    startDate: string | null;
    endDate: string | null;
    createdAt: string;
    updatedAt: string;
}
