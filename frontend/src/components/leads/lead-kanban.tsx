"use client"

import { useQuery } from "@tanstack/react-query"
import { Loader2, MoreHorizontal, Phone, Mail, DollarSign } from "lucide-react"

interface Lead {
    id: string
    name: string
    email: string
    phone: string
    status: 'NEW' | 'IN_PROGRESS' | 'WAITING' | 'WON' | 'LOST'
    value: number
    source: string
}

async function fetchLeads(): Promise<Lead[]> {
    const res = await fetch('http://localhost:3001/api/leads')
    if (!res.ok) {
        throw new Error('Failed to fetch leads')
    }
    return res.json()
}

const columns = [
    { id: 'NEW', title: 'Novos', color: 'bg-blue-500/10 text-blue-500' },
    { id: 'IN_PROGRESS', title: 'Em Andamento', color: 'bg-yellow-500/10 text-yellow-500' },
    { id: 'WAITING', title: 'Aguardando', color: 'bg-orange-500/10 text-orange-500' },
    { id: 'WON', title: 'Fechado', color: 'bg-green-500/10 text-green-500' },
    { id: 'LOST', title: 'Perdido', color: 'bg-red-500/10 text-red-500' },
]

export function LeadKanban() {
    const { data: leads, isLoading, error } = useQuery({
        queryKey: ['leads'],
        queryFn: fetchLeads,
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
            <div className="text-destructive">Erro ao carregar leads.</div>
        )
    }

    return (
        <div className="flex h-full gap-4 overflow-x-auto pb-4">
            {columns.map((column) => {
                const columnLeads = leads?.filter((lead) => lead.status === column.id) || []

                return (
                    <div key={column.id} className="w-80 flex-shrink-0 flex flex-col bg-secondary/30 rounded-xl border border-border/50">
                        <div className="p-4 flex items-center justify-between border-b border-border/50">
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${column.color.split(' ')[1].replace('text-', 'bg-')}`} />
                                <h3 className="font-semibold text-sm">{column.title}</h3>
                                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                                    {columnLeads.length}
                                </span>
                            </div>
                            <button className="text-muted-foreground hover:text-foreground">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-3 flex-1 overflow-y-auto space-y-3">
                            {columnLeads.map((lead) => (
                                <div key={lead.id} className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-medium text-sm">{lead.name}</h4>
                                        <span className="text-xs text-muted-foreground">{lead.source}</span>
                                    </div>

                                    <div className="space-y-1 mb-3">
                                        {lead.email && (
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Mail className="w-3 h-3" />
                                                {lead.email}
                                            </div>
                                        )}
                                        {lead.phone && (
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Phone className="w-3 h-3" />
                                                {lead.phone}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                                        <div className="flex items-center gap-1 text-sm font-semibold text-emerald-500">
                                            <DollarSign className="w-3 h-3" />
                                            {lead.value?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </div>
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                            {lead.name.charAt(0)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
