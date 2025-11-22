/**
 * Remove caracteres não numéricos de uma string
 */
export function removeNonNumeric(value: string): string {
    return value.replace(/\D/g, '');
}

/**
 * Valida CPF brasileiro
 * @param cpf - CPF com ou sem formatação
 * @returns true se válido, false caso contrário
 */
export function validateCPF(cpf: string): boolean {
    const cleanCPF = removeNonNumeric(cpf);

    // Verifica se tem 11 dígitos
    if (cleanCPF.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cleanCPF.charAt(9))) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cleanCPF.charAt(10))) return false;

    return true;
}

/**
 * Valida CNPJ brasileiro
 * @param cnpj - CNPJ com ou sem formatação
 * @returns true se válido, false caso contrário
 */
export function validateCNPJ(cnpj: string): boolean {
    const cleanCNPJ = removeNonNumeric(cnpj);

    // Verifica se tem 14 dígitos
    if (cleanCNPJ.length !== 14) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

    // Validação do primeiro dígito verificador
    let length = cleanCNPJ.length - 2;
    let numbers = cleanCNPJ.substring(0, length);
    const digits = cleanCNPJ.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    // Validação do segundo dígito verificador
    length = length + 1;
    numbers = cleanCNPJ.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
}

/**
 * Valida CPF ou CNPJ
 * @param value - CPF ou CNPJ com ou sem formatação
 * @returns true se válido, false caso contrário
 */
export function validateCPForCNPJ(value: string): boolean {
    const clean = removeNonNumeric(value);

    if (clean.length === 11) {
        return validateCPF(clean);
    } else if (clean.length === 14) {
        return validateCNPJ(clean);
    }

    return false;
}

/**
 * Valida email
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida telefone brasileiro (celular ou fixo)
 * Aceita: (11) 98765-4321, (11) 3456-7890, 11987654321, etc.
 */
export function validatePhone(phone: string): boolean {
    const cleanPhone = removeNonNumeric(phone);

    // Celular: 11 dígitos (DDD + 9 + 8 dígitos)
    // Fixo: 10 dígitos (DDD + 8 dígitos)
    if (cleanPhone.length === 11) {
        // Verifica se o terceiro dígito é 9 (celular)
        return cleanPhone.charAt(2) === '9';
    } else if (cleanPhone.length === 10) {
        // Telefone fixo
        return true;
    }

    return false;
}
