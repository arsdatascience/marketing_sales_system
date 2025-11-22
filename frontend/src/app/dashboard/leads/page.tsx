import { LeadKanban } from "@/components/leads/lead-kanban"
import { Button } from "@/components/ui/button" // Assuming we might have it, or I'll remove it if lint fails again.
import { Plus } from "lucide-react"

export default function LeadsPage() {
    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Controle de Voo</h1>
                    <p className="text-muted-foreground mt-1">Gerencie seus leads e oportunidades em tempo real.</p>
                </div>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Lead
                </button>
            </div>

            <div className="flex-1 min-h-0">
                <LeadKanban />
            </div>
        </div>
    )
}
