import Link from "next/link";
import { ArrowRight, BarChart3, Megaphone, MessageSquare, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <main className="flex w-full max-w-6xl flex-col items-center justify-center px-8 py-16 text-center">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Antigravity
          </h1>
        </div>

        {/* Hero Section */}
        <h2 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
          Sistema de Gestão de<br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Marketing Digital e Vendas
          </span>
        </h2>

        <p className="max-w-2xl text-xl text-gray-300 mb-12">
          Gerencie suas campanhas, leads e comunicação com WhatsApp em uma única plataforma integrada.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/20"
          >
            Acessar Dashboard
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-gray-700"
          >
            Fazer Login
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 transition-all">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <Megaphone className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Campanhas</h3>
            <p className="text-gray-400 text-sm">
              Gerencie Google Ads, Meta Ads e outras plataformas em um só lugar
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">CRM de Leads</h3>
            <p className="text-gray-400 text-sm">
              Controle completo do funil de vendas e gestão de leads
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-green-500/50 transition-all">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
            <p className="text-gray-400 text-sm">
              Integração com WhatsApp Business para comunicação automatizada
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 transition-all">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Relatórios</h3>
            <p className="text-gray-400 text-sm">
              Análises detalhadas e insights para otimizar suas campanhas
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>© 2025 Antigravity Marketing. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
