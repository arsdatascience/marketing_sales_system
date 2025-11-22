/**
 * Mensagens de erro padrão da aplicação em Português do Brasil
 */

export const ERROR_MESSAGES = {
    // Erros de autenticação
    AUTH: {
        INVALID_CREDENTIALS: 'Email ou senha incorretos',
        UNAUTHORIZED: 'Você não tem permissão para acessar este recurso',
        TOKEN_EXPIRED: 'Sua sessão expirou. Por favor, faça login novamente',
        TOKEN_INVALID: 'Token de autenticação inválido',
        USER_NOT_FOUND: 'Usuário não encontrado',
        EMAIL_ALREADY_EXISTS: 'Este email já está cadastrado',
        WEAK_PASSWORD: 'A senha deve ter pelo menos 8 caracteres',
        LOGIN_REQUIRED: 'É necessário fazer login para continuar',
    },

    // Erros de validação
    VALIDATION: {
        REQUIRED_FIELD: 'Este campo é obrigatório',
        INVALID_EMAIL: 'Email inválido',
        INVALID_CPF: 'CPF inválido',
        INVALID_CNPJ: 'CNPJ inválido',
        INVALID_PHONE: 'Telefone inválido',
        INVALID_CEP: 'CEP inválido',
        INVALID_DATE: 'Data inválida',
        MIN_LENGTH: (min: number) => `Deve ter no mínimo ${min} caracteres`,
        MAX_LENGTH: (max: number) => `Deve ter no máximo ${max} caracteres`,
        MIN_VALUE: (min: number) => `O valor mínimo é ${min}`,
        MAX_VALUE: (max: number) => `O valor máximo é ${max}`,
        INVALID_FORMAT: 'Formato inválido',
    },

    // Erros de campanhas
    CAMPAIGN: {
        NOT_FOUND: 'Campanha não encontrada',
        CREATE_FAILED: 'Falha ao criar campanha',
        UPDATE_FAILED: 'Falha ao atualizar campanha',
        DELETE_FAILED: 'Falha ao excluir campanha',
        FETCH_FAILED: 'Falha ao buscar campanhas',
        INVALID_PLATFORM: 'Plataforma inválida',
        INVALID_STATUS: 'Status inválido',
        BUDGET_REQUIRED: 'Orçamento é obrigatório',
        NAME_REQUIRED: 'Nome da campanha é obrigatório',
    },

    // Erros de leads
    LEAD: {
        NOT_FOUND: 'Lead não encontrado',
        CREATE_FAILED: 'Falha ao criar lead',
        UPDATE_FAILED: 'Falha ao atualizar lead',
        DELETE_FAILED: 'Falha ao excluir lead',
        FETCH_FAILED: 'Falha ao buscar leads',
        INVALID_STATUS: 'Status inválido',
        NAME_REQUIRED: 'Nome do lead é obrigatório',
        CONTACT_REQUIRED: 'Email ou telefone é obrigatório',
    },

    // Erros de WhatsApp
    WHATSAPP: {
        CONNECTION_FAILED: 'Falha ao conectar com WhatsApp',
        MESSAGE_SEND_FAILED: 'Falha ao enviar mensagem',
        INVALID_NUMBER: 'Número de telefone inválido',
        NOT_CONNECTED: 'WhatsApp não está conectado',
        QR_CODE_EXPIRED: 'QR Code expirado. Gere um novo',
    },

    // Erros de rede
    NETWORK: {
        CONNECTION_ERROR: 'Erro de conexão. Verifique sua internet',
        TIMEOUT: 'A requisição demorou muito. Tente novamente',
        SERVER_ERROR: 'Erro no servidor. Tente novamente mais tarde',
        NOT_FOUND: 'Recurso não encontrado',
        BAD_REQUEST: 'Requisição inválida',
    },

    // Erros gerais
    GENERAL: {
        UNKNOWN_ERROR: 'Ocorreu um erro inesperado',
        OPERATION_FAILED: 'Falha ao executar operação',
        PERMISSION_DENIED: 'Permissão negada',
        RESOURCE_NOT_FOUND: 'Recurso não encontrado',
        INVALID_INPUT: 'Dados inválidos',
        DATABASE_ERROR: 'Erro no banco de dados',
    },

    // Erros de arquivo
    FILE: {
        UPLOAD_FAILED: 'Falha ao fazer upload do arquivo',
        INVALID_TYPE: 'Tipo de arquivo inválido',
        TOO_LARGE: 'Arquivo muito grande',
        NOT_FOUND: 'Arquivo não encontrado',
    },
};

/**
 * Mensagens de sucesso
 */
export const SUCCESS_MESSAGES = {
    AUTH: {
        LOGIN_SUCCESS: 'Login realizado com sucesso',
        LOGOUT_SUCCESS: 'Logout realizado com sucesso',
        REGISTER_SUCCESS: 'Cadastro realizado com sucesso',
        PASSWORD_RESET: 'Senha redefinida com sucesso',
    },

    CAMPAIGN: {
        CREATED: 'Campanha criada com sucesso',
        UPDATED: 'Campanha atualizada com sucesso',
        DELETED: 'Campanha excluída com sucesso',
        STATUS_CHANGED: 'Status da campanha alterado',
    },

    LEAD: {
        CREATED: 'Lead criado com sucesso',
        UPDATED: 'Lead atualizado com sucesso',
        DELETED: 'Lead excluído com sucesso',
        STATUS_CHANGED: 'Status do lead alterado',
    },

    WHATSAPP: {
        CONNECTED: 'WhatsApp conectado com sucesso',
        MESSAGE_SENT: 'Mensagem enviada com sucesso',
        DISCONNECTED: 'WhatsApp desconectado',
    },

    GENERAL: {
        OPERATION_SUCCESS: 'Operação realizada com sucesso',
        SAVED: 'Salvo com sucesso',
        DELETED: 'Excluído com sucesso',
        UPDATED: 'Atualizado com sucesso',
    },
};

/**
 * Função auxiliar para obter mensagem de erro
 */
export function getErrorMessage(error: any): string {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    if (error?.response?.data?.message) return error.response.data.message;
    return ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR;
}

/**
 * Função para formatar mensagem de erro de validação
 */
export function formatValidationError(field: string, error: string): string {
    return `${field}: ${error}`;
}
