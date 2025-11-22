"use client";

import { Bell, Search, User } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
    return (
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4 w-1/3">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar campanhas, leads..."
                        className="w-full bg-secondary/50 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-card"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-border">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-muted-foreground">Gestor de Marketing</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                            <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
