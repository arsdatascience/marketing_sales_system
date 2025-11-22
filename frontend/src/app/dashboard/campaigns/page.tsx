'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Filter, MoreVertical, Play, Pause, Trash2, Calendar, DollarSign } from 'lucide-react';
import { Campaign } from '@/types/campaign';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, getErrorMessage } from '@/lib/messages';

const API_URL = 'http://localhost:3001/api/ads/campaigns';

const STATUS_LABELS = {
    'DRAFT': 'Rascunho',
    'ACTIVE': 'Ativa',
    'PAUSED': 'Pausada',
    'COMPLETED': 'Concluída'
};

export default function CampaignsPage() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        platform: 'google',
        budget: '',
        status: 'DRAFT'
    });

    const { data: campaigns, isLoading, error: fetchError } = useQuery<Campaign[]>({
        queryKey: ['campaigns'],
        queryFn: async () => {
            const res = await fetch(API_URL);
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || ERROR_MESSAGES.CAMPAIGN.FETCH_FAILED);
            }
            return res.json();
        }
    });

    const createMutation = useMutation({
        mutationFn: async (newCampaign: any) => {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newCampaign,
                    budget: parseFloat(newCampaign.budget) || 0
                }),
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || ERROR_MESSAGES.CAMPAIGN.CREATE_FAILED);
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
            setIsModalOpen(false);
            setFormData({ name: '', platform: 'google', budget: '', status: 'DRAFT' });
            setError(null);
            // Aqui você pode adicionar um toast de sucesso
        },
        onError: (error: Error) => {
            setError(getErrorMessage(error));
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || ERROR_MESSAGES.CAMPAIGN.DELETE_FAILED);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
        },
        onError: (error: Error) => {
            setError(getErrorMessage(error));
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validação local
        if (!formData.name.trim()) {
            setError(ERROR_MESSAGES.CAMPAIGN.NAME_REQUIRED);
            return;
        }

        setError(null);
        createMutation.mutate(formData);
    };

    if (isLoading) return <div className="p-8 text-white">Carregando campanhas...</div>;

    return (
        <div className="p-8 min-h-screen bg-gray-900 text-white font-sans">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Campanhas
                    </h1>
                    <p className="text-gray-400 mt-1">Gerencie suas campanhas de marketing em todas as plataformas</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg shadow-blue-500/20"
                >
                    <Plus size={20} />
                    Nova Campanha
                </button>
            </div>

            {/* Error Alert */}
            {(error || fetchError) && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                        <span className="text-red-500 text-xs">!</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-red-400 font-medium mb-1">Erro</h3>
                        <p className="text-red-300 text-sm">{error || getErrorMessage(fetchError)}</p>
                    </div>
                    <button
                        onClick={() => setError(null)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Filters & Search */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar campanhas..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 text-gray-200 placeholder-gray-500 transition-colors"
                    />
                </div>
                <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <Filter size={20} className="text-gray-400" />
                    <span className="text-gray-300">Filtrar</span>
                </button>
            </div>

            {/* Campaigns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns?.map((campaign) => (
                    <div key={campaign.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${campaign.platform === 'google' ? 'bg-red-500/10 text-red-500' :
                                    campaign.platform === 'meta' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-700 text-gray-400'
                                    }`}>
                                    {campaign.platform === 'google' ? 'G' : campaign.platform === 'meta' ? 'M' : 'O'}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-100">{campaign.name}</h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${campaign.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                                        campaign.status === 'PAUSED' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-gray-600/20 text-gray-400'
                                        }`}>
                                        {STATUS_LABELS[campaign.status as keyof typeof STATUS_LABELS] || campaign.status}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => deleteMutation.mutate(campaign.id)}
                                className="text-gray-500 hover:text-red-400 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-900/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                                    <DollarSign size={14} />
                                    Orçamento
                                </div>
                                <div className="font-medium text-gray-200">{formatCurrency(campaign.budget)}</div>
                            </div>
                            <div className="bg-gray-900/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                                    <Calendar size={14} />
                                    Criada em
                                </div>
                                <div className="font-medium text-gray-200">
                                    {formatDate(campaign.createdAt)}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <button className="flex-1 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 py-2 rounded-lg text-sm font-medium transition-colors">
                                Editar
                            </button>
                            <button className="flex-1 bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 py-2 rounded-lg text-sm font-medium transition-colors">
                                Análises
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all">
                        <h2 className="text-xl font-bold mb-4 text-white">Nova Campanha</h2>

                        {/* Error in Modal */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                                <p className="text-red-300 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Nome da Campanha</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                                    placeholder="Ex: Campanha Black Friday 2025"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Plataforma</label>
                                <select
                                    value={formData.platform}
                                    onChange={e => setFormData({ ...formData, platform: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="google">Google Ads</option>
                                    <option value="meta">Meta Ads</option>
                                    <option value="linkedin">LinkedIn</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Orçamento (R$)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.budget}
                                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                                    placeholder="0,00"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={createMutation.isPending}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                                >
                                    {createMutation.isPending ? 'Criando...' : 'Criar Campanha'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
