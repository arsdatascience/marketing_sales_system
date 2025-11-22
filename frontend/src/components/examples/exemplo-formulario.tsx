'use client';

import { useState } from 'react';
import { MaskedInput } from '@/components/ui/masked-input';
import { validateCPF, validateEmail, validatePhone } from '@/lib/validators';
import { ERROR_MESSAGES } from '@/lib/messages';

/**
 * Exemplo de formulário com validações e máscaras brasileiras
 */
export default function ExemploFormulario() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        // Validação de nome
        if (!formData.nome.trim()) {
            newErrors.nome = ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD;
        }

        // Validação de email
        if (!formData.email) {
            newErrors.email = ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = ERROR_MESSAGES.VALIDATION.INVALID_EMAIL;
        }

        // Validação de CPF
        if (!formData.cpf) {
            newErrors.cpf = ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD;
        } else if (!validateCPF(formData.cpf)) {
            newErrors.cpf = ERROR_MESSAGES.VALIDATION.INVALID_CPF;
        }

        // Validação de telefone
        if (!formData.telefone) {
            newErrors.telefone = ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD;
        } else if (!validatePhone(formData.telefone)) {
            newErrors.telefone = ERROR_MESSAGES.VALIDATION.INVALID_PHONE;
        }

        setErrors(newErrors);

        // Se não houver erros, enviar
        if (Object.keys(newErrors).length === 0) {
            console.log('Formulário válido:', formData);
            // Aqui você enviaria para a API
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Cadastro de Cliente</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nome */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Nome Completo
                    </label>
                    <input
                        type="text"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        placeholder="João da Silva"
                    />
                    {errors.nome && (
                        <p className="text-red-400 text-sm mt-1">{errors.nome}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        placeholder="joao@exemplo.com"
                    />
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                {/* CPF com máscara */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        CPF
                    </label>
                    <MaskedInput
                        maskType="cpf"
                        value={formData.cpf}
                        onValueChange={(value) => setFormData({ ...formData, cpf: value })}
                        placeholder="000.000.000-00"
                    />
                    {errors.cpf && (
                        <p className="text-red-400 text-sm mt-1">{errors.cpf}</p>
                    )}
                </div>

                {/* Telefone com máscara */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Telefone
                    </label>
                    <MaskedInput
                        maskType="phone"
                        value={formData.telefone}
                        onValueChange={(value) => setFormData({ ...formData, telefone: value })}
                        placeholder="(11) 98765-4321"
                    />
                    {errors.telefone && (
                        <p className="text-red-400 text-sm mt-1">{errors.telefone}</p>
                    )}
                </div>

                {/* Botão de envio */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
