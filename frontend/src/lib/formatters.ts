/**
 * Formata valores monetários para o padrão brasileiro
 * @param value - Valor numérico a ser formatado
 * @returns String formatada como R$ 00.000,00
 */
export function formatCurrency(value: number | null | undefined): string {
    if (value === null || value === undefined) {
        return 'R$ 0,00';
    }

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

/**
 * Formata datas para o padrão brasileiro
 * @param date - Data a ser formatada
 * @returns String formatada como dd/mm/aaaa
 */
export function formatDate(date: string | Date): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(dateObj);
}

/**
 * Formata datas com hora para o padrão brasileiro
 * @param date - Data a ser formatada
 * @returns String formatada como dd/mm/aaaa às hh:mm
 */
export function formatDateTime(date: string | Date): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(dateObj);
}
