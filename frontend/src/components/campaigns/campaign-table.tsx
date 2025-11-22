"use client"

import { useQuery } from "@tanstack/react-query"
import { Loader2, AlertCircle } from "lucide-react"

interface Campaign {
    id: string
    name: string
    status: string
    impressions: number
    clicks: number
    ctr: number
    cost: number
    conversions: number
    platform: 'google' | 'meta'
}

async function fetchCampaigns(): Promise<Campaign[]> {
    const res = await fetch('http://localhost:3001/api/ads/campaigns')
    if (!res.ok) {
        throw new Error('Failed to fetch campaigns')
    }
    return res.json()
}

export function CampaignTable() {
    const { data: campaigns, isLoading, error } = useQuery({
        queryKey: ['campaigns'],
        queryFn: fetchCampaigns,
    })

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex h-64 items-center justify-center text-destructive">
                <AlertCircle className="mr-2 h-6 w-6" />
                <span>Erro ao carregar campanhas. Verifique se o backend está rodando.</span>
            </div>
        )
    }

    return (
        <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nome</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Plataforma</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Impressões</th>
                            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Cliques</th>
                            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">CTR</th>
                            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Custo</th>
                            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Conversões</th>
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {campaigns?.map((campaign) => (
                            <tr
                                key={campaign.id}
                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                                <td className="p-4 align-middle font-medium">{campaign.name}</td>
                                <td className="p-4 align-middle">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${campaign.platform === 'google'
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                                        }`}>
                                        {campaign.platform === 'google' ? 'Google Ads' : 'Meta Ads'}
                                    </span>
                                </td>
                                <td className="p-4 align-middle">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${campaign.status === 'ENABLED' || campaign.status === 'ACTIVE'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                        }`}>
                                        {campaign.status}
                                    </span>
                                </td>
                                <td className="p-4 align-middle text-right">{campaign.impressions.toLocaleString()}</td>
                                <td className="p-4 align-middle text-right">{campaign.clicks.toLocaleString()}</td>
                                <td className="p-4 align-middle text-right">{campaign.ctr}%</td>
                                <td className="p-4 align-middle text-right">R$ {campaign.cost.toFixed(2)}</td>
                                <td className="p-4 align-middle text-right">{campaign.conversions}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
