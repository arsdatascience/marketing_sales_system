'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';
import { maskPhone, maskCPF, maskCNPJ, maskCEP, maskCPForCNPJ } from '@/lib/masks';

export type MaskType = 'phone' | 'cpf' | 'cnpj' | 'cpf-cnpj' | 'cep' | 'none';

interface MaskedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    maskType?: MaskType;
    onValueChange?: (value: string) => void;
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
    ({ maskType = 'none', onValueChange, className = '', ...props }, ref) => {
        const applyMask = (value: string, type: MaskType): string => {
            switch (type) {
                case 'phone':
                    return maskPhone(value);
                case 'cpf':
                    return maskCPF(value);
                case 'cnpj':
                    return maskCNPJ(value);
                case 'cpf-cnpj':
                    return maskCPForCNPJ(value);
                case 'cep':
                    return maskCEP(value);
                default:
                    return value;
            }
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const maskedValue = applyMask(e.target.value, maskType);
            e.target.value = maskedValue;

            if (onValueChange) {
                onValueChange(maskedValue);
            }
        };

        return (
            <input
                ref={ref}
                onChange={handleChange}
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                {...props}
            />
        );
    }
);

MaskedInput.displayName = 'MaskedInput';
