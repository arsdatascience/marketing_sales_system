/**
 * Aplica máscara de CPF: 000.000.000-00
 */
export function maskCPF(value: string): string {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;

    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
}

/**
 * Aplica máscara de CNPJ: 00.000.000/0000-00
 */
export function maskCNPJ(value: string): string {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;

    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
}

/**
 * Aplica máscara de telefone brasileiro
 * Celular: (00) 00000-0000
 * Fixo: (00) 0000-0000
 */
export function maskPhone(value: string): string {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) {
        // Telefone fixo
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
    }

    // Celular (11 dígitos)
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}

/**
 * Aplica máscara de CEP: 00000-000
 */
export function maskCEP(value: string): string {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 5) return numbers;

    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
}

/**
 * Aplica máscara de moeda brasileira
 * Exemplo: R$ 1.234,56
 */
export function maskCurrency(value: string): string {
    // Remove tudo que não é número
    let numbers = value.replace(/\D/g, '');

    // Se vazio, retorna vazio
    if (!numbers) return '';

    // Converte para número e divide por 100 para ter centavos
    const amount = parseFloat(numbers) / 100;

    // Formata como moeda brasileira
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(amount);
}

/**
 * Remove máscara e retorna apenas números
 */
export function unmask(value: string): string {
    return value.replace(/\D/g, '');
}

/**
 * Aplica máscara automaticamente baseado no tamanho
 * Detecta se é CPF ou CNPJ
 */
export function maskCPForCNPJ(value: string): string {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 11) {
        return maskCPF(numbers);
    } else {
        return maskCNPJ(numbers);
    }
}

/**
 * Formata número de cartão de crédito
 * 0000 0000 0000 0000
 */
export function maskCreditCard(value: string): string {
    const numbers = value.replace(/\D/g, '');
    const groups = numbers.match(/.{1,4}/g);

    return groups ? groups.join(' ') : numbers;
}

/**
 * Limita o input a apenas números
 */
export function onlyNumbers(value: string): string {
    return value.replace(/\D/g, '');
}

/**
 * Limita o input a apenas letras
 */
export function onlyLetters(value: string): string {
    return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
}
