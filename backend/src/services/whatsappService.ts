interface Message {
    id: string;
    from: string;
    to: string;
    content: string;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
}

let messages: Message[] = [
    {
        id: '1',
        from: '11999999999',
        to: 'me',
        content: 'Olá, gostaria de saber mais sobre o serviço.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        status: 'read',
    },
    {
        id: '2',
        from: 'me',
        to: '11999999999',
        content: 'Claro! Como posso ajudar?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: 'read',
    },
];

export const getMessages = async () => {
    return messages;
};

export const sendMessage = async (to: string, content: string) => {
    const newMessage: Message = {
        id: Date.now().toString(),
        from: 'me',
        to,
        content,
        timestamp: new Date(),
        status: 'sent',
    };
    messages.push(newMessage);
    return newMessage;
};

export const receiveWebhook = async (data: any) => {
    console.log('Received webhook:', data);
    // Process incoming message logic here
    return true;
};
