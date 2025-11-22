import { ArrowUpRight, DollarSign, Users, MousePointerClick, Activity } from "lucide-react";

const stats = [
    {
        label: "Receita Total",
        value: "R$ 45.231,89",
        change: "+20.1%",
        trend: "up",
        icon: DollarSign,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        label: "Leads Ativos",
        value: "2.350",
        change: "+180.1%",
        trend: "up",
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        label: "Taxa de Conversão",
        value: "12.5%",
        change: "+19%",
        trend: "up",
        icon: Activity,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        label: "Custo por Lead",
        value: "R$ 4,50",
        change: "-4%",
        trend: "down",
        icon: MousePointerClick,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Visão geral da sua operação de marketing e vendas.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <div key={index} className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {stat.change}
                            </span>
                            <span className="text-xs text-muted-foreground">vs mês anterior</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 p-6 rounded-2xl bg-card border border-border">
                    <h3 className="font-semibold mb-4">Visão Geral de Receita</h3>
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-secondary/20 rounded-xl border border-dashed border-border">
                        Gráfico de Receita (Placeholder)
                    </div>
                </div>
                <div className="col-span-3 p-6 rounded-2xl bg-card border border-border">
                    <h3 className="font-semibold mb-4">Últimos Leads</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        JD
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">John Doe</p>
                                        <p className="text-xs text-muted-foreground">Interesse em Consultoria</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">R$ 5.000</p>
                                    <p className="text-xs text-emerald-500">Novo</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
