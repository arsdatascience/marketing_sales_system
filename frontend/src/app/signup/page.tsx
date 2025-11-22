import { Metadata } from "next"
import Link from "next/link"

import { SignupForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
    title: "Cadastro - Antigravity Marketing",
    description: "Crie sua conta para começar.",
}

export default function SignupPage() {
    return (
        <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                        <span className="text-primary-foreground font-bold">A</span>
                    </div>
                    Antigravity
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;A melhor decisão que tomamos para escalar nossas vendas.&rdquo;
                        </p>
                        <footer className="text-sm">Marcus Johnson</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Crie sua conta
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Preencha os dados abaixo para começar
                        </p>
                    </div>
                    <SignupForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        <Link
                            href="/login"
                            className="hover:text-brand underline underline-offset-4"
                        >
                            Já tem uma conta? Entrar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
