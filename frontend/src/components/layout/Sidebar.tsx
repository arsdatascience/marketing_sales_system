import Link from "next/link";
import { LayoutDashboard, Megaphone, Users, MessageSquare, BarChart3, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Megaphone, label: "Campanhas", href: "/dashboard/campaigns" },
    { icon: Users, label: "Leads (CRM)", href: "/dashboard/leads" },
    { icon: MessageSquare, label: "WhatsApp", href: "/dashboard/whatsapp" },
    { icon: BarChart3, label: "Relatórios", href: "/dashboard/reports" },
    { icon: Settings, label: "Configurações", href: "/dashboard/settings" },
];

export function Sidebar() {
    return (
        <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border h-screen sticky top-0">
            <div className="p-6 border-b border-border flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">A</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Antigravity
                </span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-primary/10",
                            "text-muted-foreground hover:text-primary"
                        )}
                    >
                        <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-border">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sair</span>
                </button>
            </div>
        </aside>
    );
}
