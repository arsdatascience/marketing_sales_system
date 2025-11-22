import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Validação de email
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        // Validações
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Email inválido' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'A senha deve ter pelo menos 8 caracteres' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Este email já está cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '24h',
        });

        res.status(201).json({
            token,
            user: { id: user.id, email: user.email, name: user.name },
            message: 'Cadastro realizado com sucesso'
        });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({
            message: 'Erro ao criar conta',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validações
        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Email inválido' });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Email ou senha incorretos' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Email ou senha incorretos' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '24h',
        });

        res.json({
            token,
            user: { id: user.id, email: user.email, name: user.name },
            message: 'Login realizado com sucesso'
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({
            message: 'Erro ao fazer login',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};
